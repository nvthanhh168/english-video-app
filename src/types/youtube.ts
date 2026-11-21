export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface YoutubeKeyWord {
  word: string;
  meaningVi?: string;
  highlightColor?: string; // Mặc định #22C55E hoặc #38BDF8
}

export interface YoutubeSubtitleSegment {
  id: string;
  start: number; // Thời gian bắt đầu (giây)
  end: number;   // Thời gian kết thúc (giây)
  textEn: string;
  textVi: string;
  keyWords?: YoutubeKeyWord[];
}

export interface YoutubeVideoItem {
  id: string; // YouTube Video ID (ví dụ: "dQw4w9WgXcQ")
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string; // e.g. "3:45"
  durationSec: number;
  level: CefrLevel;
  views: string;
  subtitles: YoutubeSubtitleSegment[];
  isCustomImported?: boolean; // Đánh dấu video do người dùng tự nhập và đã lưu bền vững
  savedAt?: string;
}

export type ExtractionStatus = 'idle' | 'extracting' | 'translating' | 'ready' | 'error';
