export interface WordBlock {
  id: string; // ID duy nhất để Reanimated track layout
  word: string;
  status: 'idle' | 'error' | 'success';
}

export interface BuildSentenceData {
  exerciseId: string;
  instruction: string;
  videoUrl: string;
  givenText: string; // Ví dụ: "I want to ask you to"
  correctOrder: string[]; // ['take', 'part', 'in', 'an', 'experiment']
  shuffledPool: WordBlock[];
}
