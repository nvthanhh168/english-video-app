const INNERTUBE_API_URL = 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false';
const INNERTUBE_CLIENT_VERSION = '20.10.38';
const INNERTUBE_CONTEXT = {
  client: {
    clientName: 'ANDROID',
    clientVersion: INNERTUBE_CLIENT_VERSION,
    hl: 'en',
    gl: 'US',
    utcOffsetMinutes: 0,
  },
};
const INNERTUBE_USER_AGENT = `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`;

function extractVideoId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|[?&]v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[1] && match[1].length === 11) return match[1];
  return null;
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function translateChunk(texts) {
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
    const full = data[0].map((item) => item[0]).join('');
    const lines = full.split('\n');
    if (lines.length === texts.length) {
      return lines.map((l, i) => l.trim() || texts[i]);
    }
    return texts.map((t, i) => (lines[i] && lines[i].trim().length > 0 ? lines[i].trim() : t));
  } catch (e) {
    return texts;
  }
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Chỉ chấp nhận phương thức POST' });
  }

  const { url } = req.body || {};
  const videoId = extractVideoId(url);

  if (!videoId) {
    return res.status(400).json({
      success: false,
      error: 'Vui lòng cung cấp URL hoặc Video ID YouTube hợp lệ.',
    });
  }

  try {
    // 1. Lấy metadata qua oEmbed
    let title = `YouTube Video (${videoId})`;
    let author = 'YouTube Creator';
    let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      if (oembedRes.ok) {
        const meta = await oembedRes.json();
        if (meta.title) title = meta.title;
        if (meta.author_name) author = meta.author_name;
        if (meta.thumbnail_url) thumbnail = meta.thumbnail_url;
      }
    } catch {}

    // 2. Lấy phụ đề gốc bằng InnerTube API
    const ytRes = await fetch(INNERTUBE_API_URL, {
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

    const ytData = await ytRes.json();
    const tracks = ytData.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Video này không có phụ đề tiếng Anh có sẵn trên YouTube.',
      });
    }

    const enTrack =
      tracks.find((t) => t.languageCode === 'en' && !t.vssId?.startsWith('a.')) ||
      tracks.find((t) => t.languageCode?.startsWith('en')) ||
      tracks.find((t) => t.vssId && t.vssId.includes('en')) ||
      tracks[0];

    const xmlRes = await fetch(enTrack.baseUrl, {
      headers: {
        'User-Agent': INNERTUBE_USER_AGENT,
      },
    });
    const xml = await xmlRes.text();

    const rawCaptions = [];
    const textRegex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([\s\S]*?)<\/text>|<p t="(\d+)" d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
    let match;

    while ((match = textRegex.exec(xml)) !== null) {
      let start;
      let dur;
      let rawText;

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
        rawCaptions.push({
          start,
          dur: dur > 0 ? dur : 3.5,
          text: clean,
        });
      }
    }

    if (rawCaptions.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Không thể trích xuất nội dung phụ đề từ video này.',
      });
    }

    // 3. Chunking dịch sang tiếng Việt (35 câu/chunk)
    const chunks = chunkArray(rawCaptions, 35);
    const translatedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const texts = chunks[i].map((c) => c.text);
      const translated = await translateChunk(texts);
      translatedChunks.push(translated);
      if (chunks.length > 1 && i < chunks.length - 1) {
        await new Promise((r) => setTimeout(r, 60));
      }
    }

    const flatTranslations = translatedChunks.flat();

    const formattedSubtitles = rawCaptions.map((cap, idx) => {
      const end = parseFloat((cap.start + cap.dur).toFixed(3));
      const textVi = flatTranslations[idx] || cap.text;
      return {
        id: `sub_${idx + 1}`,
        start: cap.start,
        end: end,
        startTime: Math.round(cap.start * 1000),
        duration: Math.round(cap.dur * 1000),
        textEn: cap.text,
        textVi: textVi,
        english: cap.text,
        vietnamese: textVi,
        keyWords: [],
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        videoId,
        title,
        channelTitle: author,
        thumbnail,
        subtitles: formattedSubtitles,
      },
    });
  } catch (error) {
    console.error('Error handling /api/youtube/import:', error);
    return res.status(500).json({
      success: false,
      error: `Lỗi máy chủ khi xử lý video: ${error.message}`,
    });
  }
};
