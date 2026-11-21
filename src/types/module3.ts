export interface ChunkToken {
  text: string;
  bgColor: string; // Ví dụ: Màu xám xanh (#4B5563) và Xám nâu (#5C544F) xen kẽ
}

export interface VocabularyItem {
  word: string;
  definition: string;
}

export interface SentenceBreakdownData {
  id: string;
  meaningfulChunking: {
    chunks: ChunkToken[];
    translation: string;
  };
  keyVocabulary: VocabularyItem[];
  difficultyAnalysis: string[]; // Mảng các đoạn văn giải thích
}
