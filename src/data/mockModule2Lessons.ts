import { GuidedLessonItem } from '../types/module2';

export const MOCK_GUIDED_LESSONS: GuidedLessonItem[] = [
  {
    id: 'lesson_002',
    aiMascot: {
      avatarUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=200&auto=format&fit=crop&q=80',
      name: 'Penguin Tutor',
      message: 'Can you understand the following clip? 🤔'
    },
    video: {
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      durationMs: 7000
    },
    content: {
      englishSentence: 'What is the best way to improve your spoken English and overall fluency?',
      vietnameseTranslation: 'Cách tốt nhất để cải thiện tiếng Anh nói và độ trôi chảy tổng thể là gì?',
      keyWords: [
        {
          word: 'fluency',
          vietnameseMeaning: 'độ trôi chảy',
          highlightColor: '#A7F3D0' // Xanh mint
        },
        {
          word: 'spoken English',
          vietnameseMeaning: 'tiếng Anh nói',
          highlightColor: '#BAE6FD' // Xanh da trời pastel
        }
      ]
    }
  },
  {
    id: 'lesson_001',
    aiMascot: {
      avatarUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=200&auto=format&fit=crop&q=80',
      name: 'Penguin Tutor',
      message: 'Great job! 🥳 Ready for a more challenging one?'
    },
    video: {
      thumbnailUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      durationMs: 8500
    },
    content: {
      englishSentence: 'So we are at the garden center looking for the perfect plant and pot.',
      vietnameseTranslation: 'Vậy là chúng tôi đang ở trung tâm cây cảnh để tìm cây và chậu hoàn hảo.',
      keyWords: [
        {
          word: 'plant',
          vietnameseMeaning: 'cây trồng',
          highlightColor: '#A7F3D0' // Mint
        },
        {
          word: 'pot',
          vietnameseMeaning: 'chậu cây',
          highlightColor: '#FDE68A' // Vàng pastel
        },
        {
          word: 'garden center',
          vietnameseMeaning: 'trung tâm cây cảnh',
          highlightColor: '#DDD6FE' // Tím nhạt
        }
      ]
    }
  }
];
