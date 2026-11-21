import { BuildSentenceData } from '../types/module5';

export const MOCK_MODULE5_EXERCISES: BuildSentenceData[] = [
  {
    exerciseId: 'gamify_001',
    instruction: 'Build the Sentence',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    givenText: 'I want to ask you to',
    correctOrder: ['take', 'part', 'in', 'an', 'experiment'],
    shuffledPool: [
      { id: 'w1_take', word: 'take', status: 'idle' },
      { id: 'w2_an', word: 'an', status: 'idle' },
      { id: 'w3_experiment', word: 'experiment', status: 'idle' },
      { id: 'w4_part', word: 'part', status: 'idle' },
      { id: 'w5_in', word: 'in', status: 'idle' }
    ]
  },
  {
    exerciseId: 'gamify_002',
    instruction: 'Build the Sentence',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    givenText: 'You cannot connect the dots',
    correctOrder: ['looking', 'forward', 'only', 'backward'],
    shuffledPool: [
      { id: 'w2_backward', word: 'backward', status: 'idle' },
      { id: 'w2_forward', word: 'forward', status: 'idle' },
      { id: 'w2_only', word: 'only', status: 'idle' },
      { id: 'w2_looking', word: 'looking', status: 'idle' }
    ]
  },
  {
    exerciseId: 'gamify_003',
    instruction: 'Build the Sentence',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    givenText: 'I really need to catch up on',
    correctOrder: ['my', 'sleep', 'this', 'weekend'],
    shuffledPool: [
      { id: 'w3_weekend', word: 'weekend', status: 'idle' },
      { id: 'w3_sleep', word: 'sleep', status: 'idle' },
      { id: 'w3_my', word: 'my', status: 'idle' },
      { id: 'w3_this', word: 'this', status: 'idle' }
    ]
  }
];
