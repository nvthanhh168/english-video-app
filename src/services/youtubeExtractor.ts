import { YoutubeSubtitleSegment, YoutubeVideoItem } from '../types/youtube';

/**
 * Cấu hình địa chỉ Backend API:
 * - Đối với máy thật chạy Expo Go trong cùng mạng Wi-Fi: Thay 'localhost' bằng IP máy tính của bạn (VD: '192.168.1.100').
 * - Đối với Android Emulator: Thường là '10.0.2.2'.
 * - Đối với iOS Simulator: Sử dụng 'localhost'.
 */
export const BACKEND_API_BASE = 'http://localhost:5001';

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
 * Gọi Backend API (POST /api/youtube/import) để cào phụ đề gốc và dịch song ngữ
 * Nếu Backend chưa bật hoặc không thể kết nối, tự động chuyển về Fallback cục bộ
 */
export async function extractAndTranslateYoutubeSubtitles(
  videoId: string
): Promise<YoutubeSubtitleSegment[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout

    const response = await fetch(`${BACKEND_API_BASE}/api/youtube/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://www.youtube.com/watch?v=${videoId}`,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.success && Array.isArray(result.data?.subtitles) && result.data.subtitles.length > 0) {
        console.log(`[youtubeExtractor] Nhận ${result.data.subtitles.length} câu phụ đề từ Backend.`);
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
  } catch (err: any) {
    console.warn(`[youtubeExtractor] Backend chưa chạy (${err.message}). Tự động kích hoạt cơ chế Fallback an toàn.`);
  }

  // Fallback mẫu khi chưa khởi động server Node.js backend
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      id: `sub_${videoId}_1`,
      start: 0,
      end: 4.5,
      textEn: "Welcome back! Today we are exploring an incredible idea that will change your mind.",
      textVi: "Chào mừng các bạn đã quay trở lại! Hôm nay chúng ta sẽ khám phá một ý tưởng tuyệt vời có thể thay đổi suy nghĩ của bạn.",
      keyWords: [
        { word: "incredible", meaningVi: "tuyệt vời, khó tin", highlightColor: "#22C55E" },
        { word: "change your mind", meaningVi: "thay đổi suy nghĩ", highlightColor: "#38BDF8" }
      ]
    },
    {
      id: `sub_${videoId}_2`,
      start: 4.5,
      end: 9.0,
      textEn: "Most people believe that success comes from pure talent, but the truth is quite different.",
      textVi: "Hầu hết mọi người đều tin rằng thành công đến từ tài năng bẩm sinh, nhưng sự thật thì hoàn toàn khác.",
      keyWords: [
        { word: "pure talent", meaningVi: "tài năng thuần túy", highlightColor: "#22C55E" },
        { word: "quite different", meaningVi: "hoàn toàn khác biệt", highlightColor: "#F59E0B" }
      ]
    },
    {
      id: `sub_${videoId}_3`,
      start: 9.0,
      end: 14.2,
      textEn: "It is about continuous daily immersion and taking small, consistent steps every single day.",
      textVi: "Đó là về sự ngấm ngôn ngữ liên tục mỗi ngày và thực hiện những bước đi nhỏ, đều đặn từng ngày.",
      keyWords: [
        { word: "immersion", meaningVi: "sự đắm chìm/ngấm", highlightColor: "#22C55E" },
        { word: "consistent", meaningVi: "kiên trì, đều đặn", highlightColor: "#38BDF8" }
      ]
    },
    {
      id: `sub_${videoId}_4`,
      start: 14.2,
      end: 20.0,
      textEn: "When you listen carefully to native speakers, your subconscious begins to absorb natural sentence patterns.",
      textVi: "Khi bạn lắng nghe cẩn thận người bản xứ, tiềm thức của bạn sẽ bắt đầu tiếp thu những mẫu câu tự nhiên.",
      keyWords: [
        { word: "subconscious", meaningVi: "tiềm thức", highlightColor: "#22C55E" },
        { word: "absorb", meaningVi: "tiếp thu, hấp thụ", highlightColor: "#F59E0B" }
      ]
    }
  ];
}
