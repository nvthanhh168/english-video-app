// @ts-ignore
import translate from 'google-translate-api-x';
import { RawYoutubeCaption } from './youtubeScraper';

export interface KeyWordHighlight {
  word: string;
  meaningVi: string;
  highlightColor?: string;
}

export interface FormattedSubtitle {
  id: string;
  start: number;       // Giây (dành cho Module 7)
  end: number;         // Giây (dành cho Module 7)
  startTime: number;   // Milliseconds (dành cho Module 1)
  duration: number;    // Milliseconds (dành cho Module 1)
  textEn: string;      // Tiếng Anh
  textVi: string;      // Tiếng Việt
  english: string;     // Tương thích ngược với Module 1
  vietnamese: string;  // Tương thích ngược với Module 1
  keyWords: KeyWordHighlight[];
}

/**
 * Làm sạch chuỗi phụ đề: Xóa thẻ HTML, giải mã ký tự đặc biệt, gộp khoảng trắng
 */
export const cleanSubtitleText = (text: string): string => {
  if (!text) return '';

  return text
    .replace(/<[^>]*>/g, '')              // Xóa các thẻ HTML (như <font color="...">)
    .replace(/&#39;/g, "'")               // Dấu nháy đơn
    .replace(/&quot;/g, '"')              // Dấu nháy kép
    .replace(/&amp;/g, '&')               // Ký tự &
    .replace(/&lt;/g, '<')                // Ký tự <
    .replace(/&gt;/g, '>')                // Ký tự >
    .replace(/&nbsp;/g, ' ')              // Khoảng trắng không ngắt dòng
    .replace(/\n+/g, ' ')                 // Gộp dòng mới thành dấu cách
    .replace(/\s+/g, ' ')                 // Gộp nhiều dấu cách liên tiếp
    .trim();
};

/**
 * Trích xuất từ khóa tiêu biểu để Frontend hiển thị chip tra cứu nhanh
 */
const extractSampleKeywords = (textEn: string): KeyWordHighlight[] => {
  const dictionary: { [key: string]: string } = {
    'incredible': 'tuyệt vời, không thể tin được',
    'change your mind': 'thay đổi quyết định/suy nghĩ',
    'success': 'thành công',
    'pure talent': 'tài năng thuần túy',
    'quite different': 'hoàn toàn khác biệt',
    'immersion': 'sự đắm chìm/ngấm ngôn ngữ',
    'consistent': 'kiên trì, bền bỉ',
    'subconscious': 'tiềm thức',
    'absorb': 'hấp thu, tiếp thu',
    'natural': 'tự nhiên',
    'comfortable': 'thoải mái',
    'remarkable': 'đáng chú ý, xuất sắc',
    'nevertheless': 'dẫu vậy, tuy nhiên',
    'fatal': 'chí mạng, chết người',
    'limited': 'hữu hạn',
    'waste': 'lãng phí',
    'drown out': 'lấn át, át đi',
    'inner voice': 'tiếng nói nội tâm',
  };

  const lower = textEn.toLowerCase();
  const matchedKeywords: KeyWordHighlight[] = [];

  for (const [key, meaning] of Object.entries(dictionary)) {
    if (lower.includes(key)) {
      matchedKeywords.push({
        word: key,
        meaningVi: meaning,
        highlightColor: '#22C55E',
      });
    }
  }

  return matchedKeywords;
};

/**
 * Xử lý & Dịch thuật mảng phụ đề theo từng Chunk (Batching) để tránh Rate Limit
 */
export const processAndTranslateCaptions = async (
  captions: RawYoutubeCaption[]
): Promise<FormattedSubtitle[]> => {
  // 1. Làm sạch văn bản phụ đề
  const cleanedList = captions.map((cap) => ({
    start: parseFloat(cap.start) || 0,
    dur: parseFloat(cap.dur) || 0,
    text: cleanSubtitleText(cap.text),
  })).filter((cap) => cap.text.length > 0);

  if (cleanedList.length === 0) {
    return [];
  }

  const englishTexts = cleanedList.map((c) => c.text);
  const CHUNK_SIZE = 35; // Chia lô 35 câu/request để giữ an toàn tuyệt đối trước rate limit
  const translatedTexts: string[] = [];

  for (let i = 0; i < englishTexts.length; i += CHUNK_SIZE) {
    const chunk = englishTexts.slice(i, i + CHUNK_SIZE);

    try {
      // Gọi thư viện Google Translate
      const res = await translate(chunk, { to: 'vi' });
      const chunkTranslations = Array.isArray(res)
        ? res.map((r: any) => r.text)
        : [res.text];

      translatedTexts.push(...chunkTranslations);
    } catch (err) {
      console.warn(`[translatorService] Warning: Không thể dịch batch từ ${i} đến ${i + CHUNK_SIZE}. Dùng fallback.`);
      // Nếu API dịch bị nghẽn mạng, gán bản dịch tạm thời để luồng không bị gãy
      chunk.forEach((t) => translatedTexts.push(`[Dịch tự động]: ${t}`));
    }
  }

  // 2. Định dạng lại theo chuẩn dữ liệu song ngữ cho Frontend
  const formattedSubtitles: FormattedSubtitle[] = cleanedList.map((cap, index) => {
    const startSec = Math.round(cap.start * 100) / 100;
    const endSec = Math.round((cap.start + cap.dur) * 100) / 100;
    const translated = translatedTexts[index] || '';

    return {
      id: `sub_${index + 1}`,
      start: startSec,
      end: endSec,
      startTime: Math.round(startSec * 1000),
      duration: Math.round(cap.dur * 1000),
      textEn: cap.text,
      textVi: translated,
      english: cap.text,
      vietnamese: translated,
      keyWords: extractSampleKeywords(cap.text),
    };
  });

  return formattedSubtitles;
};
