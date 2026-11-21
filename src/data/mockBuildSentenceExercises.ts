import { BuildSentenceExercise } from '../types/module5';

export const MOCK_BUILD_SENTENCE_EXERCISES: BuildSentenceExercise[] = [
  {
    exercise_id: 'gamify_001',
    instruction: 'Build the Sentence',
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      autoPlay: true,
      loop: true
    },
    sentence_data: {
      given_text: 'I want to ask you to',
      correct_order: ['take', 'part', 'in', 'an', 'experiment'],
      shuffled_pool: ['take', 'an', 'experiment', 'part', 'in']
    }
  },
  {
    exercise_id: 'gamify_002',
    instruction: 'Build the Sentence',
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      autoPlay: true,
      loop: true
    },
    sentence_data: {
      given_text: 'You cannot connect the dots',
      correct_order: ['looking', 'forward', 'only', 'backward'],
      shuffled_pool: ['backward', 'forward', 'only', 'looking']
    }
  },
  {
    exercise_id: 'gamify_003',
    instruction: 'Build the Sentence',
    video: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      autoPlay: true,
      loop: true
    },
    sentence_data: {
      given_text: "I really need to catch up on",
      correct_order: ['my', 'sleep', 'this', 'weekend'],
      shuffled_pool: ['weekend', 'sleep', 'my', 'this']
    }
  }
];
