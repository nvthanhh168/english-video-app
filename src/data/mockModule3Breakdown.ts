import { SentenceBreakdownData } from '../types/module3';

export const MOCK_MODULE3_BREAKDOWN: SentenceBreakdownData = {
  id: 'breakdown_001',
  meaningfulChunking: {
    chunks: [
      { text: 'I want ', bgColor: '#4B5563' },
      { text: 'to ask you ', bgColor: '#5C544F' },
      { text: 'to take part ', bgColor: '#4B5563' },
      { text: 'in an experiment.', bgColor: '#5C544F' }
    ],
    translation: 'Tôi muốn mời bạn tham gia một thí nghiệm.'
  },
  keyVocabulary: [
    {
      word: 'want',
      definition: 'động từ muốn hoặc mong muốn làm điều gì đó'
    },
    {
      word: 'ask',
      definition: 'động từ đề nghị hoặc yêu cầu ai đó làm điều gì'
    },
    {
      word: 'take part in',
      definition: 'cụm động từ tham gia vào một hoạt động hoặc sự kiện'
    },
    {
      word: 'experiment',
      definition: 'danh từ thí nghiệm được thực hiện để kiểm tra hoặc tìm hiểu điều gì đó'
    }
  ],
  difficultyAnalysis: [
    'Câu dùng cấu trúc want cộng với tân ngữ you và động từ nguyên mẫu có to để diễn đạt mong muốn ai đó làm gì.',
    'Ask you to take part in an experiment nghĩa là mời hoặc yêu cầu bạn tham gia một thí nghiệm.'
  ]
};
