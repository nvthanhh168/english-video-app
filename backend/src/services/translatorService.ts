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
 * Thuật toán Chunking Array: Cắt mảng lớn thành các mảng nhỏ (tối đa 30 - 50 câu/chunk)
 * @param array Mảng ban đầu
 * @param size Số lượng phần tử tối đa cho mỗi chunk (mặc định 35 câu)
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  if (!array || array.length === 0) return [];
  const chunkSize = Math.max(1, size);
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

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
    'business leader': 'nhà lãnh đạo doanh nghiệp',
    'frustrated': 'thất vọng, bực bội',
    'pitching ideas': 'đưa ra ý tưởng',
    'detectives': 'thám tử điều tra',
    'solve the puzzle': 'giải quyết câu đố',
    'barriers': 'rào cản',
    'frictions': 'trở ngại, ma sát',
    'incentives': 'động lực thúc đẩy',
    'wake up': 'thức dậy',
    'get up': 'rời giường, thức dậy',
    'have breakfast': 'ăn sáng',
    'brush my teeth': 'đánh răng',
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
      if (matchedKeywords.length >= 2) break;
    }
  }

  return matchedKeywords;
};

/**
 * Dịch từng chunk văn bản tiếng Anh sang tiếng Việt bằng Google Translate API (gtx)
 * Đảm bảo 100% khớp chính xác số câu đầu vào và đầu ra
 */
async function translateChunkWithRetry(
  texts: string[],
  retries = 2
): Promise<string[]> {
  if (texts.length === 0) return [];

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const joined = texts.join('\n');
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
        joined
      )}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Google Translate HTTP ${res.status}`);

      const data = await res.json();
      if (!data || !Array.isArray(data[0])) throw new Error('Cấu trúc trả về không đúng');

      const fullTranslatedText = data[0].map((item: any) => item[0]).join('');
      const translatedLines = fullTranslatedText.split('\n');

      if (translatedLines.length === texts.length) {
        return translatedLines.map((line, idx) => line.trim() || texts[idx]);
      }

      // Nếu số dòng bị chênh lệch do xuống dòng tự nhiên, map 1-1
      return texts.map((orig, idx) => {
        return translatedLines[idx] && translatedLines[idx].trim().length > 0
          ? translatedLines[idx].trim()
          : orig;
      });
    } catch (err: any) {
      console.warn(`[translatorService] Thử lại chunk dịch (lần ${attempt}/${retries}): ${err.message}`);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    }
  }

  // Fallback an toàn: giữ nguyên văn bản gốc nếu API lỗi
  return texts;
}

/**
 * Xử lý & Dịch thuật toàn bộ mảng phụ đề bằng thuật toán Chunking Array (Batching)
 * Đảm bảo 100%: Mảng trả về có số lượng phần tử bằng chính xác số lượng câu gốc lấy từ YouTube!
 */
export const processAndTranslateCaptions = async (
  captions: RawYoutubeCaption[]
): Promise<FormattedSubtitle[]> => {
  if (!captions || captions.length === 0) {
    return [];
  }

  // 1. Làm sạch văn bản từng câu nhưng giữ NGUYÊN VẸN toàn bộ số lượng câu (không filter bỏ phần tử)
  const cleanedCaptions = captions.map((cap, index) => {
    const rawText = cleanSubtitleText(cap.text);
    return {
      index,
      start: parseFloat(cap.start) || 0,
      dur: parseFloat(cap.dur) || 0,
      text: rawText.length > 0 ? rawText : '[Music]', // Giữ nguyên phần tử dù là nhạc hoặc tiếng vỗ tay
    };
  });

  const TOTAL_COUNT = cleanedCaptions.length;
  const CHUNK_SIZE = 35; // Tối ưu: 35 câu/chunk (an toàn tuyệt đối dưới ngưỡng giới hạn ký tự / rate limit)

  console.log(`[translatorService] Bắt đầu dịch ${TOTAL_COUNT} câu phụ đề (chia thành các chunk ${CHUNK_SIZE} câu)...`);

  // 2. Cắt mảng cleanedCaptions thành các mảng con (Chunks)
  const captionChunks = chunkArray(cleanedCaptions, CHUNK_SIZE);
  const translatedChunks: string[][] = [];

  // 3. Sử dụng vòng lặp for...of tuần tự kèm delay nhẹ để tránh kích hoạt Rate Limit của API
  for (let i = 0; i < captionChunks.length; i++) {
    const currentChunk = captionChunks[i];
    const englishTexts = currentChunk.map((item) => item.text);

    const chunkTranslated = await translateChunkWithRetry(englishTexts);
    translatedChunks.push(chunkTranslated);

    // Delay nhẹ 80ms giữa các chunk nếu có nhiều hơn 1 chunk
    if (captionChunks.length > 1 && i < captionChunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
  }

  // 4. Gộp (Flatten) tất cả các chunk thành một mảng duy nhất
  const flattenedTranslations: string[] = translatedChunks.flat();

  // 5. Map vào định dạng startTime và duration chuẩn đồng bộ của Frontend
  const finalSubtitles: FormattedSubtitle[] = cleanedCaptions.map((cap, index) => {
    const startSec = cap.start;
    const durSec = cap.dur > 0 ? cap.dur : 3.5;
    const endSec = parseFloat((startSec + durSec).toFixed(3));

    const textEn = cap.text;
    const textVi = flattenedTranslations[index] || textEn;

    return {
      id: `sub_${index + 1}`,
      start: startSec,
      end: endSec,
      startTime: Math.round(startSec * 1000),
      duration: Math.round(durSec * 1000),
      textEn,
      textVi,
      english: textEn,
      vietnamese: textVi,
      keyWords: extractSampleKeywords(textEn),
    };
  });

  console.log(
    `[translatorService] Hoàn tất xử lý ${finalSubtitles.length}/${TOTAL_COUNT} câu phụ đề song ngữ.`
  );

  return finalSubtitles;
};
