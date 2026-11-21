import { Router } from 'express';
import {
  importYoutubeVideo,
  pingYoutubeService,
} from '../controllers/youtubeController';

const router = Router();

// Route kiểm tra trạng thái hoạt động của server
router.get('/ping', pingYoutubeService);

// Route chính: Trích xuất và dịch phụ đề từ đường link YouTube
router.post('/import', importYoutubeVideo);

export default router;
