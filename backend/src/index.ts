import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import youtubeRoutes from './routes/youtubeRoutes';

// Nạp cấu hình từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Cấu hình Middlewares
app.use(cors({
  origin: '*', // Cho phép mọi kết nối từ Mobile App hoặc Emulator
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 2. Middleware Logger ghi nhật ký request
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 3. Khai báo Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'YouTube Captions & Translation API',
    version: '1.0.0',
    description: 'Backend dịch vụ trích xuất phụ đề song ngữ cho App Học Tiếng Anh (Module 7)',
    endpoints: {
      healthCheck: 'GET /api/youtube/ping',
      importVideo: 'POST /api/youtube/import',
    },
  });
});

app.use('/api/youtube', youtubeRoutes);

// 4. Bắt lỗi Route không tồn tại (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint '${req.originalUrl}' không tồn tại trên server.`,
  });
});

// 5. Bắt lỗi toàn cục (Global Error Handler)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error Handler]:', err);
  res.status(500).json({
    success: false,
    error: 'Đã xảy ra lỗi nội bộ phía máy chủ.',
  });
});

// 6. Khởi động Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 YouTube Importer Backend đang chạy tại Port: ${PORT}`);
  console.log(`📡 URL API: http://localhost:${PORT}/api/youtube/import`);
  console.log(`🔍 Ping test: http://localhost:${PORT}/api/youtube/ping`);
  console.log('====================================================');
});
