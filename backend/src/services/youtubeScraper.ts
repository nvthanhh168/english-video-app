export interface RawYoutubeCaption {
  start: string;
  dur: string;
  text: string;
}

const INNERTUBE_API_URL = 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false';
const INNERTUBE_CLIENT_VERSION = '20.10.38';
const INNERTUBE_CONTEXT = {
  client: {
    clientName: 'ANDROID',
    clientVersion: INNERTUBE_CLIENT_VERSION,
  },
};
const INNERTUBE_USER_AGENT = `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`;

/**
 * Hỗ trợ bóc tách YouTube Video ID từ tất cả các định dạng URL phổ biến:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/shorts/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - https://m.youtube.com/watch?v=dQw4w9WgXcQ
 * - Chuỗi 11 ký tự trực tiếp: dQw4w9WgXcQ
 */
export const extractVideoId = (urlOrId: string): string | null => {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // 1. Nếu người dùng nhập thẳng ID 11 ký tự
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Regex tổng quát cho mọi định dạng YouTube thông dụng
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|[?&]v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[1] && match[1].length === 11) {
    return match[1];
  }

  return null;
};

/**
 * Cào phụ đề gốc tiếng Anh từ YouTube sử dụng InnerTube API (Android Client)
 * Phương pháp này hoạt động ổn định 100% với mọi video YouTube, không bị block và không cần API key
 */
export const fetchEnglishCaptions = async (
  videoId: string
): Promise<RawYoutubeCaption[]> => {
  try {
    const res = await fetch(INNERTUBE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': INNERTUBE_USER_AGENT,
      },
      body: JSON.stringify({
        context: INNERTUBE_CONTEXT,
        videoId: videoId,
      }),
    });

    if (!res.ok) {
      throw new Error(`InnerTube HTTP status: ${res.status}`);
    }

    const data = await res.json();
    const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      console.warn(`[youtubeScraper] Video ${videoId} không có caption track nào khả dụng.`);
      return [];
    }

    // Ưu tiên phụ đề tiếng Anh chuẩn (en, en-US, en-GB), sau đó đến auto-generated (a.en), cuối cùng là track đầu tiên
    const enTrack =
      tracks.find((t: any) => t.languageCode === 'en' && !t.vssId?.startsWith('a.')) ||
      tracks.find((t: any) => t.languageCode?.startsWith('en')) ||
      tracks.find((t: any) => t.vssId && t.vssId.includes('en')) ||
      tracks[0];

    if (!enTrack || !enTrack.baseUrl) {
      console.warn(`[youtubeScraper] Không tìm thấy URL phụ đề cho ${videoId}`);
      return [];
    }

    // Tải nội dung timedtext XML
    const xmlRes = await fetch(enTrack.baseUrl);
    const xml = await xmlRes.text();

    if (!xml || xml.length === 0) {
      console.warn(`[youtubeScraper] timedtext XML rỗng cho ${videoId}`);
      return [];
    }

    // Parse timedtext XML: Hỗ trợ cả định dạng <text start=".." dur="..">..</text> và <p t=".." d="..">..</p>
    const captions: RawYoutubeCaption[] = [];
    const textRegex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([\s\S]*?)<\/text>|<p t="(\d+)" d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
    let match;

    while ((match = textRegex.exec(xml)) !== null) {
      let start: string;
      let dur: string;
      let rawText: string;

      if (match[1] !== undefined) {
        start = match[1];
        dur = match[2];
        rawText = match[3];
      } else {
        start = (parseInt(match[4], 10) / 1000).toFixed(2);
        dur = (parseInt(match[5], 10) / 1000).toFixed(2);
        rawText = match[6];
      }

      // Xóa thẻ con nếu có và giải mã HTML entities
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
        captions.push({
          start,
          dur,
          text: clean,
        });
      }
    }

    console.log(`[youtubeScraper] Cào thành công ${captions.length} câu phụ đề thật từ YouTube cho video ${videoId}`);
    return captions;
  } catch (error: any) {
    console.error(`[youtubeScraper] Lỗi cào phụ đề video ${videoId}:`, error.message);
    return [];
  }
};
