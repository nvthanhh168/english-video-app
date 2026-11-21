export interface TopicInfo {
  en: string;
  vi: string;
}

export interface KeyWordItem {
  word: string;
  highlightColor?: string; // Mặc định là '#32CD32' (Lime green / Mint)
}

export interface SubtitlesData {
  en: string;
  vi: string;
  wordTimestamps?: { word: string; startMs: number; endMs: number }[]; // Tùy chọn Karaoke sync
}

export interface UserStates {
  isBookmarked: boolean;
  isStarred: boolean;
}

export interface VideoLessonItem {
  id: string;
  videoUrl: string;
  topic: TopicInfo;
  subtitles: SubtitlesData;
  keyWords: KeyWordItem[];
  isBlindListeningEnabled: boolean;
  userStates: UserStates;
}

export type PlaybackRate = 1.0 | 0.75 | 0.5;
export type SubtitleSize = 'normal' | 'large' | 'extra-large';
