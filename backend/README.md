# YouTube Importer Backend (Node.js & TypeScript)

Dịch vụ Backend dành riêng cho **Module 7: Tích hợp YouTube Cá nhân hóa** của Ứng dụng Học Tiếng Anh qua Video.

---

## 1. Tính năng cốt lõi
- **Nhận dạng Video ID:** Hỗ trợ mọi định dạng URL (`watch?v=`, `youtu.be`, `shorts/`, `embed/`, chuỗi 11 ký tự).
- **Cào phụ đề tiếng Anh (CC):** Tự động tải track phụ đề gốc từ YouTube qua `youtube-captions-scraper`.
- **Dịch song ngữ Anh - Việt:** Tự động dịch theo từng lô (Batching 35 câu/lần) qua `google-translate-api-x` nhằm loại bỏ rate-limit.
- **Làm sạch văn bản:** Xóa thẻ HTML, giải mã thực thể ký tự (`&#39;` -> `'`, `&quot;` -> `"`), chuẩn hóa dấu cách.
- **Cấu trúc JSON song ngữ:** Tương thích đồng thời 100% với cả **Module 1** (`startTime`, `duration`, `english`, `vietnamese`) và **Module 7** (`start`, `end`, `textEn`, `textVi`, `keyWords`).

---

## 2. Hướng dẫn cài đặt & Chạy Server

### Bước 1: Di chuyển vào thư mục backend
```bash
cd backend
```

### Bước 2: Cài đặt Dependencies
```bash
npm install
```

### Bước 3: Chạy ở chế độ Development (Auto-reload)
```bash
npm run dev
```

Server sẽ khởi chạy tại: `http://localhost:5001`.

### Bước 4: Build và chạy Production
```bash
npm run build
npm start
```

---

## 3. Danh sách API Endpoints

### 3.1. Kiểm tra trạng thái máy chủ (Health Check)
- **Method:** `GET`
- **URL:** `http://localhost:5001/api/youtube/ping`
- **Response:**
```json
{
  "status": "online",
  "timestamp": "2026-11-21T12:00:00.000Z",
  "service": "YouTube Captions & Translation Backend"
}
```

---

### 3.2. Trích xuất & Dịch phụ đề Video
- **Method:** `POST`
- **URL:** `http://localhost:5001/api/youtube/import`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=h6fcK_fRYaI"
}
```

- **Mẫu dữ liệu trả về (Response 200 OK):**
```json
{
  "success": true,
  "data": {
    "videoId": "h6fcK_fRYaI",
    "platform": "youtube",
    "title": "YouTube Video (h6fcK_fRYaI)",
    "thumbnail": "https://img.youtube.com/vi/h6fcK_fRYaI/hqdefault.jpg",
    "subtitlesCount": 35,
    "subtitles": [
      {
        "id": "sub_1",
        "start": 0.0,
        "end": 4.5,
        "startTime": 0,
        "duration": 4500,
        "textEn": "You were on your way home when you died.",
        "textVi": "Bạn đang trên đường về nhà thì qua đời.",
        "english": "You were on your way home when you died.",
        "vietnamese": "Bạn đang trên đường về nhà thì qua đời.",
        "keyWords": [
          {
            "word": "on your way home",
            "meaningVi": "trên đường về nhà",
            "highlightColor": "#22C55E"
          }
        ]
      }
    ]
  }
}
```

---

## 4. Kiểm thử nhanh bằng lệnh cURL

```bash
curl -X POST http://localhost:5001/api/youtube/import \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"https://www.youtube.com/watch?v=h6fcK_fRYaI\"}"
```
