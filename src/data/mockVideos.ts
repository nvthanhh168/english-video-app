import { VideoLessonItem } from '../types/video';

export const SAMPLE_LESSONS: VideoLessonItem[] = [
  {
    id: 'vid_001',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    topic: {
      en: 'take part in',
      vi: 'tham gia'
    },
    subtitles: {
      en: "I didn't know I would be able to take part in this awards show.",
      vi: "Tôi không nghĩ là mình lại có cơ hội tham gia lễ trao giải này."
    },
    keyWords: [
      { word: 'take part in', highlightColor: '#32CD32' },
      { word: 'awards show', highlightColor: '#32CD32' }
    ],
    isBlindListeningEnabled: false,
    userStates: {
      isBookmarked: false,
      isStarred: true
    }
  },
  {
    id: 'vid_002',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    topic: {
      en: 'connect the dots',
      vi: 'xâu chuỗi các sự kiện'
    },
    subtitles: {
      en: "You cannot connect the dots looking forward, you can only connect them looking backward.",
      vi: "Bạn không thể kết nối các điểm khi nhìn về tương lai, bạn chỉ có thể kết nối chúng khi nhìn lại quá khứ."
    },
    keyWords: [
      { word: 'connect the dots', highlightColor: '#32CD32' },
      { word: 'backward', highlightColor: '#32CD32' }
    ],
    isBlindListeningEnabled: true, // Thử nghiệm bật sẵn Nghe mù
    userStates: {
      isBookmarked: true,
      isStarred: false
    }
  },
  {
    id: 'vid_003',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    topic: {
      en: 'catch up on',
      vi: 'bắt kịp, cập nhật'
    },
    subtitles: {
      en: "I really need to catch up on my sleep this weekend after a tough week.",
      vi: "Tôi thực sự cần ngủ bù vào cuối tuần này sau một tuần làm việc vất vả."
    },
    keyWords: [
      { word: 'catch up on', highlightColor: '#32CD32' }
    ],
    isBlindListeningEnabled: false,
    userStates: {
      isBookmarked: false,
      isStarred: false
    }
  }
];
