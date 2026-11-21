export interface KeyWordHighlight {
  word: string;
  vietnameseMeaning: string;
  highlightColor?: string; // Mặc định là '#A7F3D0' (Mint green pastel)
}

export interface GuidedLesson {
  id: string;
  aiMascot: {
    avatarUrl?: any;
    name?: string;
    message: string;
  };
  video: {
    videoUrl: string;
    thumbnailUrl?: string;
  };
  content: {
    englishSentence: string;
    vietnameseTranslation: string;
    keyWords: KeyWordHighlight[];
  };
}

export interface SentenceChunk {
  type: 'text' | 'keyword';
  content: string;
  keywordData?: KeyWordHighlight;
}
