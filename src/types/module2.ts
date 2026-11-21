export interface AiMascotData {
  avatarUrl?: string;
  name?: string;
  message: string;
}

export interface VideoCardData {
  videoUrl: string;
  thumbnailUrl: string;
  durationMs?: number;
}

export interface KeyWordExtraction {
  word: string;
  vietnameseMeaning: string;
  highlightColor?: string; // Mặc định: '#A7F3D0' (Xanh mint pastel)
}

export interface LessonContent {
  englishSentence: string;
  vietnameseTranslation: string;
  keyWords: KeyWordExtraction[];
}

export interface GuidedLessonItem {
  id: string;
  aiMascot: AiMascotData;
  video: VideoCardData;
  content: LessonContent;
}

export interface ParsedWordToken {
  id: string;
  text: string;
  isKeyWord: boolean;
  vietnameseMeaning?: string;
  highlightColor?: string;
}
