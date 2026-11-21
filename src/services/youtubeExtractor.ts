import { YoutubeSubtitleSegment, YoutubeVideoItem } from '../types/youtube';
import { MOCK_YOUTUBE_LIBRARY } from '../data/mockYoutubeLibrary';
import { MOCK_LEVEL_LIBRARY } from '../data/mockLevelLibrary';

/**
 * Cấu hình địa chỉ Backend API:
 * - Khi chạy Web trên Vercel: Dùng chính origin hiện tại (`window.location.origin`) để gọi Serverless API `/api/youtube/import`.
 * - Khi chạy Web cục bộ: Dùng `http://localhost:5001`.
 * - Khi chạy mobile: Mặc định `http://localhost:5001` hoặc URL production.
 */
export const BACKEND_API_BASE =
  typeof window !== 'undefined' && window.location && window.location.origin
    ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5001'
        : window.location.origin)
    : 'https://english-video-app-beta.vercel.app';

export interface YoutubeVideoMeta {
  title: string;
  author: string;
  thumbnailUrl: string;
}

/**
 * Lấy tiêu đề, kênh phát và ảnh đại diện thật từ YouTube qua dịch vụ công khai oEmbed
 */
export async function fetchYoutubeVideoMeta(videoId: string): Promise<YoutubeVideoMeta> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title || `YouTube Video (${videoId})`,
        author: data.author_name || 'YouTube Creator',
        thumbnailUrl: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    }
  } catch (err) {
    console.warn('[youtubeExtractor] Không thể lấy oEmbed meta:', err);
  }

  return {
    title: `YouTube Video (${videoId})`,
    author: 'YouTube Creator',
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };
}

/**
 * Trích xuất YouTube Video ID từ bất kỳ định dạng link YouTube nào
 */
export function extractVideoId(urlOrId: string): string | null {
  if (!urlOrId) return null;

  const trimmed = urlOrId.trim();

  // 1. Nếu người dùng nhập trực tiếp ID 11 ký tự (VD: dQw4w9WgXcQ)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Link dạng chuẩn: youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // 3. Link rút gọn: youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // 4. Link YouTube Shorts: youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // 5. Link Embed: youtube.com/embed/ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

/**
 * Dịch từng mảng câu tiếng Anh sang tiếng Việt bằng Google Translate gtx (hỗ trợ CORS '*')
 */
async function translateChunkClient(texts: string[]): Promise<string[]> {
  if (!texts || texts.length === 0) return [];
  try {
    const joined = texts.join('\n');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
      joined
    )}`;
    const res = await fetch(url);
    if (!res.ok) return texts;
    const data = await res.json();
    if (!data || !Array.isArray(data[0])) return texts;
    const full = data[0].map((item: any) => item[0]).join('');
    const lines = full.split('\n');
    if (lines.length === texts.length) {
      return lines.map((l: string, i: number) => l.trim() || texts[i]);
    }
    return texts.map((t, i) => (lines[i] && lines[i].trim().length > 0 ? lines[i].trim() : t));
  } catch {
    return texts;
  }
}

/**
 * Trích xuất phụ đề thật bằng InnerTube API
 */
async function fetchInnerTubeDirect(videoId: string): Promise<YoutubeSubtitleSegment[] | null> {
  try {
    const INNERTUBE_API_URL = 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false';
    const INNERTUBE_CLIENT_VERSION = '20.10.38';
    const res = await fetch(INNERTUBE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`,
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'ANDROID',
            clientVersion: INNERTUBE_CLIENT_VERSION,
          },
        },
        videoId: videoId,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) return null;

    const enTrack =
      tracks.find((t: any) => t.languageCode === 'en' && !t.vssId?.startsWith('a.')) ||
      tracks.find((t: any) => t.languageCode?.startsWith('en')) ||
      tracks.find((t: any) => t.vssId && t.vssId.includes('en')) ||
      tracks[0];

    if (!enTrack || !enTrack.baseUrl) return null;

    const xmlRes = await fetch(enTrack.baseUrl);
    const xml = await xmlRes.text();
    if (!xml || xml.length === 0) return null;

    const rawCaptions: { start: number; dur: number; text: string }[] = [];
    const textRegex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([\s\S]*?)<\/text>|<p t="(\d+)" d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
    let match;

    while ((match = textRegex.exec(xml)) !== null) {
      let start: number;
      let dur: number;
      let rawText: string;

      if (match[1] !== undefined) {
        start = parseFloat(match[1]);
        dur = parseFloat(match[2]);
        rawText = match[3];
      } else {
        start = parseInt(match[4], 10) / 1000;
        dur = parseInt(match[5], 10) / 1000;
        rawText = match[6];
      }

      const clean = rawText
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\n+/g, ' ')
        .trim();

      if (clean.length > 0) {
        rawCaptions.push({ start, dur: dur > 0 ? dur : 3.5, text: clean });
      }
    }

    if (rawCaptions.length === 0) return null;

    // Dịch chunk
    const chunks: typeof rawCaptions[] = [];
    for (let i = 0; i < rawCaptions.length; i += 35) {
      chunks.push(rawCaptions.slice(i, i + 35));
    }

    const translatedChunks: string[][] = [];
    for (const chunk of chunks) {
      const texts = chunk.map((c) => c.text);
      const translated = await translateChunkClient(texts);
      translatedChunks.push(translated);
    }

    const flatTranslations = translatedChunks.flat();

    return rawCaptions.map((cap, idx) => ({
      id: `sub_${idx + 1}`,
      start: cap.start,
      end: parseFloat((cap.start + cap.dur).toFixed(3)),
      textEn: cap.text,
      textVi: flatTranslations[idx] || cap.text,
      keyWords: [],
    }));
  } catch {
    return null;
  }
}

/**
 * Gọi Backend API (POST /api/youtube/import) để cào phụ đề gốc và dịch song ngữ
 */
export async function extractAndTranslateYoutubeSubtitles(
  videoId: string,
  videoTitle?: string
): Promise<YoutubeSubtitleSegment[]> {
  // 1. Kiểm tra ưu tiên trong thư viện 60 video mặc định chuẩn CEFR
  const existingLevel = MOCK_LEVEL_LIBRARY.find((v) => v.id === videoId || v.videoId === videoId);
  if (existingLevel && existingLevel.subtitles && existingLevel.subtitles.length > 0) {
    return existingLevel.subtitles;
  }

  const existingMock = MOCK_YOUTUBE_LIBRARY.find((v) => v.id === videoId);
  if (existingMock && existingMock.subtitles && existingMock.subtitles.length > 0) {
    return existingMock.subtitles;
  }

  // 2. Thử gọi API endpoint `/api/youtube/import` (trên Vercel hoặc Backend local)
  const apiEndpoints = [
    `${BACKEND_API_BASE}/api/youtube/import`,
    `https://english-video-app-beta.vercel.app/api/youtube/import`,
    `http://localhost:5001/api/youtube/import`,
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `https://www.youtube.com/watch?v=${videoId}` }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data?.subtitles) && result.data.subtitles.length > 0) {
          console.log(`[youtubeExtractor] Nhận ${result.data.subtitles.length} câu phụ đề thật từ ${endpoint}`);
          return result.data.subtitles.map((s: any, idx: number) => ({
            id: s.id || `sub_${idx + 1}`,
            start: s.start ?? (s.startTime ? s.startTime / 1000 : 0),
            end: s.end ?? (s.startTime && s.duration ? (s.startTime + s.duration) / 1000 : 0),
            textEn: s.textEn || s.english || '',
            textVi: s.textVi || s.vietnamese || '',
            keyWords: s.keyWords || [],
          }));
        }
      }
    } catch {
      // Thử endpoint tiếp theo
    }
  }

  // 3. Nếu các endpoint đều không kết nối được, thử gọi InnerTube trực tiếp từ client
  const directSubs = await fetchInnerTubeDirect(videoId);
  if (directSubs && directSubs.length > 0) {
    console.log(`[youtubeExtractor] Nhận ${directSubs.length} câu từ InnerTube client.`);
    return directSubs;
  }

  // 4. Nếu video hoàn toàn không có phụ đề trên YouTube, trả về thông báo rõ ràng cho người dùng
  const displayTitle = videoTitle || 'Video YouTube';
  return [
    {
      id: `sub_${videoId}_1`,
      start: 0,
      end: 6.0,
      textEn: `This video (${displayTitle}) does not have an official English subtitle track on YouTube.`,
      textVi: `Video này (${displayTitle}) chưa có file phụ đề tiếng Anh chính thức trên YouTube.`,
      keyWords: [{ word: 'subtitle', meaningVi: 'phụ đề' }]
    },
    {
      id: `sub_${videoId}_2`,
      start: 6.0,
      end: 12.0,
      textEn: 'You can still watch the video, or use the "Edit Subtitles" button above to paste your own script.',
      textVi: 'Bạn vẫn có thể xem video, hoặc nhấn nút "✏️ Sửa phụ đề" ở trên để dán lời thoại tùy ý.',
      keyWords: [{ word: 'edit subtitles', meaningVi: 'chỉnh sửa phụ đề' }]
    }
  ];
}
