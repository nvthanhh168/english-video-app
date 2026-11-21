import { Request, Response } from 'express';
import { extractVideoId, fetchEnglishCaptions } from '../services/youtubeScraper';
import { processAndTranslateCaptions } from '../services/translatorService';

/**
 * Controller xử lý việc trích xuất và dịch phụ đề từ đường link YouTube
 * POST /api/youtube/import
 * Body: { "url": "https://www.youtube.com/watch?v=..." }
 */
export const importYoutubeVideo = async (req: Request, res: Response): Promise<any> => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Vui lòng cung cấp đường link YouTube hợp lệ trong body request.',
    });
  }

  // Bước 1: Trích xuất Video ID 11 ký tự
  const videoId = extractVideoId(url);
  if (!videoId) {
    return res.status(400).json({
      success: false,
      error: 'Đường link YouTube không đúng định dạng hoặc không tìm thấy Video ID.',
    });
  }

  try {
    console.log(`[YouTube Import] Đang xử lý video ID: ${videoId}...`);

    // Bước 2: Cào mảng phụ đề gốc tiếng Anh
    const rawCaptions = await fetchEnglishCaptions(videoId);

    if (!rawCaptions || rawCaptions.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Video này không có phụ đề tiếng Anh (Closed Captions).',
      });
    }

    // Bước 3: Làm sạch và dịch song ngữ Anh - Việt theo từng lô (Batching)
    const formattedSubtitles = await processAndTranslateCaptions(rawCaptions);

    console.log(`[YouTube Import] Xử lý thành công ${formattedSubtitles.length} câu phụ đề cho video ${videoId}.`);

    // Bước 4: Trả về chuẩn JSON cấu trúc sẵn cho Mobile App React Native
    return res.status(200).json({
      success: true,
      data: {
        videoId,
        platform: 'youtube',
        title: `YouTube Video (${videoId})`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        subtitlesCount: formattedSubtitles.length,
        subtitles: formattedSubtitles,
      },
    });
  } catch (error: any) {
    console.error(`[YouTube Import Error]`, error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Lỗi không xác định trong quá trình xử lý video YouTube.',
    });
  }
};

/**
 * Controller kiểm tra trạng thái hoạt động (Health check)
 * GET /api/youtube/ping
 */
export const pingYoutubeService = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'YouTube Captions & Translation Backend',
  });
};
