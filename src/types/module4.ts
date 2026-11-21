export type VideoType = 'single_speaker' | 'zoom_call_grid' | 'animation' | 'interview';

export interface TargetPhrase {
  english: string;
  vietnamese: string;
  colorCode: string; // ví dụ: "#A7F3D0"
}

export interface ClipSubtitles {
  en: string;
  vi: string;
}

export interface ContextualClip {
  clip_index: number;
  video_url: string;
  video_type: VideoType;
  subtitles: ClipSubtitles;
  speakerAccent?: 'US' | 'UK' | 'AU';
}

export interface ContextualPlaylistSession {
  learning_session_id: string;
  target_phrase: TargetPhrase;
  total_clips: number;
  playlist: ContextualClip[];
}
