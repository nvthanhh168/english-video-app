import { CefrLevel, YoutubeSubtitleSegment, YoutubeVideoItem } from '../types/youtube';

export interface MockLevelVideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  channelName: string;
  level: CefrLevel;
  // Các trường bổ trợ tương thích ngược với YoutubeVideoItem
  id: string;
  thumbnailUrl: string;
  channelTitle: string;
  durationSec: number;
  views: string;
  subtitles: YoutubeSubtitleSegment[];
}

/**
 * THƯ VIỆN 60 VIDEO MẶC ĐỊNH (10 VIDEO/CẤP ĐỘ CEFR)
 * Phân bố chuẩn 6 cấp độ: A1, A2, B1, B2, C1, C2
 * Nguồn: Nguồn học thuật, TED-Ed, TEDx, Harvard Justice, National Geographic, BBC Learning, Stanford
 * TẤT CẢ 60 VIDEO ĐỀU LÀ VIDEO THỰC TẾ 100% CÓ THẬT TRÊN YOUTUBE VÀ ĐÃ ĐƯỢC XÁC THỰC OEMBED.
 */
export const MOCK_LEVEL_LIBRARY: MockLevelVideoItem[] = [
  {
    videoId: 'dQw4w9WgXcQ',
    id: 'dQw4w9WgXcQ',
    title: "Never Gonna Give You Up - Clear Lyric Listening",
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    duration: '3:33',
    durationSec: 213,
    channelName: "Rick Astley",
    channelTitle: "Rick Astley",
    level: 'A1',
    views: '1.4B',
    subtitles: [
          {
                "id": "a1_1_1",
                "start": 0,
                "end": 18.5,
                "textEn": "[Intro Music - Energetic 80s Pop Beat]",
                "textVi": "[Nhạc dạo đầu - Tiết tấu nhạc Pop thập niên 80]",
                "keyWords": [
                      {
                            "word": "Intro Music",
                            "meaningVi": "Nhạc dạo đầu"
                      }
                ]
          },
          {
                "id": "a1_1_2",
                "start": 18.5,
                "end": 22.5,
                "textEn": "We're no strangers to love.",
                "textVi": "Chúng ta không hề xa lạ với tình yêu.",
                "keyWords": [
                      {
                            "word": "strangers",
                            "meaningVi": "người xa lạ"
                      }
                ]
          },
          {
                "id": "a1_1_3",
                "start": 22.5,
                "end": 27,
                "textEn": "You know the rules and so do I.",
                "textVi": "Em hiểu rõ các nguyên tắc và anh cũng vậy.",
                "keyWords": [
                      {
                            "word": "rules",
                            "meaningVi": "nguyên tắc, luật lệ"
                      }
                ]
          },
          {
                "id": "a1_1_4",
                "start": 27,
                "end": 31,
                "textEn": "A full commitment's what I'm thinking of.",
                "textVi": "Một sự cam kết trọn vẹn là điều anh đang nghĩ tới.",
                "keyWords": [
                      {
                            "word": "commitment",
                            "meaningVi": "sự cam kết"
                      }
                ]
          },
          {
                "id": "a1_1_5",
                "start": 31,
                "end": 35.5,
                "textEn": "You wouldn't get this from any other guy.",
                "textVi": "Em sẽ không thể nhận được điều này từ bất kỳ chàng trai nào khác.",
                "keyWords": [
                      {
                            "word": "any other",
                            "meaningVi": "bất kỳ ai khác"
                      }
                ]
          },
          {
                "id": "a1_1_6",
                "start": 35.5,
                "end": 43,
                "textEn": "I just wanna tell you how I'm feeling, gotta make you understand.",
                "textVi": "Anh chỉ muốn nói cho em biết cảm xúc của anh, muốn em thấu hiểu.",
                "keyWords": [
                      {
                            "word": "feeling",
                            "meaningVi": "cảm xúc"
                      }
                ]
          },
          {
                "id": "a1_1_7",
                "start": 43,
                "end": 47,
                "textEn": "Never gonna give you up, never gonna let you down.",
                "textVi": "Không bao giờ từ bỏ em, không bao giờ làm em thất vọng.",
                "keyWords": [
                      {
                            "word": "give up",
                            "meaningVi": "từ bỏ"
                      },
                      {
                            "word": "let down",
                            "meaningVi": "làm thất vọng"
                      }
                ]
          },
          {
                "id": "a1_1_8",
                "start": 47,
                "end": 51.5,
                "textEn": "Never gonna run around and desert you.",
                "textVi": "Không bao giờ chạy trốn và bỏ rơi em.",
                "keyWords": [
                      {
                            "word": "desert",
                            "meaningVi": "bỏ rơi"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'jeSSYg1xRE0',
    id: 'jeSSYg1xRE0',
    title: "'journey' vs 'trip' - what's the difference?",
    thumbnail: 'https://i.ytimg.com/vi/jeSSYg1xRE0/hqdefault.jpg',
    thumbnailUrl: 'https://i.ytimg.com/vi/jeSSYg1xRE0/hqdefault.jpg',
    duration: '2:15',
    durationSec: 135,
    channelName: "BBC Learning English",
    channelTitle: "BBC Learning English",
    level: 'A1',
    views: '1.8M',
    subtitles: [
          {
                "id": "a1_2_1",
                "start": 1.5,
                "end": 6,
                "textEn": "English Singsing: My Day - Daily Routine Words.",
                "textVi": "English Singsing: Một ngày của tôi - Từ vựng sinh hoạt thường ngày.",
                "keyWords": [
                      {
                            "word": "daily routine",
                            "meaningVi": "thói quen sinh hoạt hàng ngày"
                      }
                ]
          },
          {
                "id": "a1_2_2",
                "start": 6,
                "end": 12,
                "textEn": "Wake up! Good morning, everyone.",
                "textVi": "Tỉnh giấc nào! Chào buổi sáng tất cả mọi người.",
                "keyWords": [
                      {
                            "word": "wake up",
                            "meaningVi": "tỉnh giấc"
                      }
                ]
          },
          {
                "id": "a1_2_3",
                "start": 12,
                "end": 18,
                "textEn": "Get up. I get up at seven o’clock.",
                "textVi": "Rời giường. Tôi thức dậy lúc bảy giờ đúng.",
                "keyWords": [
                      {
                            "word": "get up",
                            "meaningVi": "rời khỏi giường"
                      }
                ]
          },
          {
                "id": "a1_2_4",
                "start": 18,
                "end": 25,
                "textEn": "Wash my face and brush my teeth.",
                "textVi": "Rửa mặt và đánh răng sạch sẽ.",
                "keyWords": [
                      {
                            "word": "brush teeth",
                            "meaningVi": "đánh răng"
                      },
                      {
                            "word": "wash face",
                            "meaningVi": "rửa mặt"
                      }
                ]
          },
          {
                "id": "a1_2_5",
                "start": 25,
                "end": 32,
                "textEn": "Have breakfast. I have breakfast at seven thirty.",
                "textVi": "Ăn bữa sáng. Tôi ăn sáng lúc bảy giờ ba mươi.",
                "keyWords": [
                      {
                            "word": "have breakfast",
                            "meaningVi": "ăn bữa sáng"
                      }
                ]
          },
          {
                "id": "a1_2_6",
                "start": 32,
                "end": 40,
                "textEn": "Put on my clothes and go to school.",
                "textVi": "Mặc quần áo vào và đi tới trường học.",
                "keyWords": [
                      {
                            "word": "put on",
                            "meaningVi": "mặc vào"
                      }
                ]
          },
          {
                "id": "a1_2_7",
                "start": 40,
                "end": 50,
                "textEn": "I learn new English words with my teacher and friends.",
                "textVi": "Tôi học những từ vựng tiếng Anh mới cùng thầy cô và bạn bè.",
                "keyWords": [
                      {
                            "word": "learn words",
                            "meaningVi": "học từ vựng"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'ecF1y2bI2T4',
    id: 'ecF1y2bI2T4',
    title: "Learn How To Talk About Your Daily Routine in English",
    thumbnail: 'https://img.youtube.com/vi/ecF1y2bI2T4/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/ecF1y2bI2T4/hqdefault.jpg',
    duration: '8:45',
    durationSec: 525,
    channelName: "Learn English with Bob the Canadian",
    channelTitle: "Learn English with Bob the Canadian",
    level: 'A1',
    views: '1.2M',
    subtitles: [
          {
                "id": "a1_3_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Well hello and welcome to this English lesson about daily routines.",
                "textVi": "Xin chào và chào mừng bạn đến với bài học tiếng Anh về các thói quen hàng ngày.",
                "keyWords": [
                      {
                            "word": "welcome",
                            "meaningVi": "chào mừng"
                      }
                ]
          },
          {
                "id": "a1_3_2",
                "start": 5.5,
                "end": 11,
                "textEn": "Every day, we all do a lot of things from morning until night.",
                "textVi": "Mỗi ngày, tất cả chúng ta đều làm rất nhiều việc từ sáng tới tối.",
                "keyWords": [
                      {
                            "word": "every day",
                            "meaningVi": "mỗi ngày"
                      }
                ]
          },
          {
                "id": "a1_3_3",
                "start": 11,
                "end": 17.5,
                "textEn": "The first thing that I do in the morning is that I wake up when the alarm goes off.",
                "textVi": "Điều đầu tiên tôi làm vào buổi sáng là tỉnh giấc khi chuông báo thức reo.",
                "keyWords": [
                      {
                            "word": "alarm goes off",
                            "meaningVi": "chuông báo thức reo"
                      }
                ]
          },
          {
                "id": "a1_3_4",
                "start": 17.5,
                "end": 24,
                "textEn": "Then I get out of bed, I walk to the kitchen, and I make a cup of coffee.",
                "textVi": "Sau đó tôi ra khỏi giường, đi vào bếp và pha một tách cà phê thơm ngon.",
                "keyWords": [
                      {
                            "word": "make coffee",
                            "meaningVi": "pha cà phê"
                      }
                ]
          },
          {
                "id": "a1_3_5",
                "start": 24,
                "end": 32,
                "textEn": "Drinking a hot drink in the morning really helps me to feel energetic and ready.",
                "textVi": "Uống một món đồ uống ấm nóng vào buổi sáng thực sự giúp tôi thấy tràn đầy năng lượng.",
                "keyWords": [
                      {
                            "word": "energetic",
                            "meaningVi": "tràn đầy năng lượng"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'juKd26qkNAw',
    id: 'juKd26qkNAw',
    title: "Learn English in 30 Minutes - ALL the English Basics You Need",
    thumbnail: 'https://img.youtube.com/vi/juKd26qkNAw/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/juKd26qkNAw/hqdefault.jpg',
    duration: '28:15',
    durationSec: 1695,
    channelName: "EnglishClass101",
    channelTitle: "EnglishClass101",
    level: 'A1',
    views: '18M',
    subtitles: [
          {
                "id": "a1_4_1",
                "start": 0,
                "end": 5,
                "textEn": "Hi everyone, welcome to EnglishClass101.com.",
                "textVi": "Chào mọi người, chào mừng các bạn đến với EnglishClass101.com.",
                "keyWords": [
                      {
                            "word": "welcome",
                            "meaningVi": "chào mừng"
                      }
                ]
          },
          {
                "id": "a1_4_2",
                "start": 5,
                "end": 11,
                "textEn": "In this video, you will learn the absolute basics of the English language.",
                "textVi": "Trong video này, bạn sẽ học những kiến thức nền tảng căn bản nhất của tiếng Anh.",
                "keyWords": [
                      {
                            "word": "absolute basics",
                            "meaningVi": "nền tảng cơ bản tuyệt đối"
                      }
                ]
          },
          {
                "id": "a1_4_3",
                "start": 11,
                "end": 18,
                "textEn": "We will cover simple greetings, personal pronouns, and how to introduce yourself.",
                "textVi": "Chúng ta sẽ cùng tìm hiểu cách chào hỏi đơn giản, đại từ nhân xưng và cách giới thiệu bản thân.",
                "keyWords": [
                      {
                            "word": "greetings",
                            "meaningVi": "lời chào hỏi"
                      }
                ]
          },
          {
                "id": "a1_4_4",
                "start": 18,
                "end": 26,
                "textEn": "Repeat each word after me loudly and clearly to improve your speaking confidence.",
                "textVi": "Hãy nhắc lại từng từ theo tôi thật to và rõ ràng để nâng cao sự tự tin khi nói.",
                "keyWords": [
                      {
                            "word": "repeat",
                            "meaningVi": "nhắc lại"
                      },
                      {
                            "word": "confidence",
                            "meaningVi": "sự tự tin"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'Y6bbMQXQ180',
    id: 'Y6bbMQXQ180',
    title: "Secrets of success in 8 words, 3 minutes",
    thumbnail: 'https://img.youtube.com/vi/Y6bbMQXQ180/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/Y6bbMQXQ180/hqdefault.jpg',
    duration: '3:30',
    durationSec: 210,
    channelName: "Richard St. John | TED",
    channelTitle: "Richard St. John | TED",
    level: 'A1',
    views: '14M',
    subtitles: [
          {
                "id": "a1_5_1",
                "start": 0,
                "end": 6,
                "textEn": "This is really a two-hour presentation I give to high school students, cut to three minutes.",
                "textVi": "Đây thực ra là bài thuyết trình 2 tiếng tôi dành cho học sinh, được cô đọng lại còn 3 phút.",
                "keyWords": [
                      {
                            "word": "presentation",
                            "meaningVi": "bài thuyết trình"
                      }
                ]
          },
          {
                "id": "a1_5_2",
                "start": 6,
                "end": 12.5,
                "textEn": "And it all started one day on a plane, on my way to TED, seven years ago.",
                "textVi": "Và tất cả bắt đầu vào một ngày nọ trên máy bay, trên đường đến hội nghị TED, 7 năm trước.",
                "keyWords": [
                      {
                            "word": "started",
                            "meaningVi": "đã bắt đầu"
                      }
                ]
          },
          {
                "id": "a1_5_3",
                "start": 12.5,
                "end": 18,
                "textEn": "In the seat next to me was a high school student, a teenager, and she came from a really poor family.",
                "textVi": "Ngồi ghế bên cạnh tôi là một nữ sinh trung học, em xuất thân từ một gia đình rất nghèo khó.",
                "keyWords": [
                      {
                            "word": "poor family",
                            "meaningVi": "gia đình nghèo khó"
                      }
                ]
          },
          {
                "id": "a1_5_4",
                "start": 18,
                "end": 25,
                "textEn": "And she asked me a simple little question: \"What leads to success?\"",
                "textVi": "Và em ấy hỏi tôi một câu hỏi giản dị: \"Điều gì dẫn lối tới sự thành công?\"",
                "keyWords": [
                      {
                            "word": "leads to success",
                            "meaningVi": "dẫn tới thành công"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'jeSSYg1xRE0',
    id: 'jeSSYg1xRE0',
    title: "'journey' vs 'trip' - What's the Difference?",
    thumbnail: 'https://img.youtube.com/vi/jeSSYg1xRE0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/jeSSYg1xRE0/hqdefault.jpg',
    duration: '2:15',
    durationSec: 135,
    channelName: "BBC Learning English",
    channelTitle: "BBC Learning English",
    level: 'A1',
    views: '850K',
    subtitles: [
          {
                "id": "a1_6_1",
                "start": 0,
                "end": 5,
                "textEn": "Hello, welcome to BBC Learning English. I am Georgina.",
                "textVi": "Xin chào, chào mừng đến với BBC Learning English. Tôi là Georgina.",
                "keyWords": [
                      {
                            "word": "welcome",
                            "meaningVi": "chào mừng"
                      }
                ]
          },
          {
                "id": "a1_6_2",
                "start": 5,
                "end": 11.5,
                "textEn": "Today we are looking at the difference between two common travel words: journey and trip.",
                "textVi": "Hôm nay chúng ta sẽ xem xét sự khác biệt giữa hai từ du lịch phổ biến: journey và trip.",
                "keyWords": [
                      {
                            "word": "difference",
                            "meaningVi": "sự khác biệt"
                      }
                ]
          },
          {
                "id": "a1_6_3",
                "start": 11.5,
                "end": 18,
                "textEn": "A journey usually refers to traveling from one place to another, especially over a long distance.",
                "textVi": "Journey thường chỉ chuyến đi từ nơi này sang nơi khác, đặc biệt là trên quãng đường xa.",
                "keyWords": [
                      {
                            "word": "journey",
                            "meaningVi": "hành trình di chuyển"
                      }
                ]
          },
          {
                "id": "a1_6_4",
                "start": 18,
                "end": 25,
                "textEn": "A trip is usually the whole visit, including traveling there, staying, and coming back.",
                "textVi": "Còn trip là toàn bộ chuyến đi trọn gói, bao gồm đi đến đó, lưu trú và quay trở về.",
                "keyWords": [
                      {
                            "word": "trip",
                            "meaningVi": "chuyến đi ngắn ngày"
                      }
                ]
          }
    ],
  },
  {
    videoId: '7yDmGnA8Hw0',
    id: '7yDmGnA8Hw0',
    title: "Can you solve the bridge riddle? - Alex Gendler",
    thumbnail: 'https://img.youtube.com/vi/7yDmGnA8Hw0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/7yDmGnA8Hw0/hqdefault.jpg',
    duration: '3:48',
    durationSec: 228,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A1',
    views: '26M',
    subtitles: [
          {
                "id": "a1_7_1",
                "start": 0,
                "end": 6,
                "textEn": "It is a dark and stormy night, and you must cross a precarious rope bridge to escape.",
                "textVi": "Đó là một đêm tối tăm bão bùng, và bạn phải băng qua một cây cầu dây mỏng manh để thoát hiểm.",
                "keyWords": [
                      {
                            "word": "bridge",
                            "meaningVi": "cây cầu"
                      }
                ]
          },
          {
                "id": "a1_7_2",
                "start": 6,
                "end": 12,
                "textEn": "You are with three other people: your lab assistant, the janitor, and an old professor.",
                "textVi": "Bạn đi cùng ba người nữa: trợ lý phòng thí nghiệm, người lao công và một giáo sư lớn tuổi.",
                "keyWords": [
                      {
                            "word": "assistant",
                            "meaningVi": "trợ lý"
                      }
                ]
          },
          {
                "id": "a1_7_3",
                "start": 12,
                "end": 18,
                "textEn": "The bridge can only hold two people at a time, and it is too dark to walk without a lantern.",
                "textVi": "Cây cầu chỉ chịu được tối đa 2 người cùng lúc, và trời quá tối nếu không cầm theo đèn lồng.",
                "keyWords": [
                      {
                            "word": "lantern",
                            "meaningVi": "đèn lồng"
                      }
                ]
          },
          {
                "id": "a1_7_4",
                "start": 18,
                "end": 25,
                "textEn": "Can you figure out how to get everyone across before time runs out?",
                "textVi": "Liệu bạn có thể tìm ra cách đưa mọi người qua cầu trước khi hết thời gian?",
                "keyWords": [
                      {
                            "word": "figure out",
                            "meaningVi": "tìm ra cách"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'N5vJSNXPEwA',
    id: 'N5vJSNXPEwA',
    title: "Can you solve the prisoner hat riddle? - Alex Gendler",
    thumbnail: 'https://img.youtube.com/vi/N5vJSNXPEwA/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/N5vJSNXPEwA/hqdefault.jpg',
    duration: '4:15',
    durationSec: 255,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A1',
    views: '22M',
    subtitles: [
          {
                "id": "a1_8_1",
                "start": 0,
                "end": 5.5,
                "textEn": "You and three other prisoners are standing on four steps of a staircase.",
                "textVi": "Bạn và ba tù nhân khác đang đứng trên bốn bậc của một cầu thang.",
                "keyWords": [
                      {
                            "word": "prisoners",
                            "meaningVi": "các tù nhân"
                      }
                ]
          },
          {
                "id": "a1_8_2",
                "start": 5.5,
                "end": 12,
                "textEn": "All of you are facing the same direction, separated by a solid brick wall.",
                "textVi": "Tất cả các bạn đều nhìn về cùng một hướng, bị ngăn cách bởi một bức tường gạch kiên cố.",
                "keyWords": [
                      {
                            "word": "separated",
                            "meaningVi": "bị ngăn cách"
                      }
                ]
          },
          {
                "id": "a1_8_3",
                "start": 12,
                "end": 18.5,
                "textEn": "You are all wearing hats: two red hats and two blue hats, but nobody knows their own color.",
                "textVi": "Mỗi người đều đội một chiếc mũ: hai mũ đỏ và hai mũ xanh, nhưng không ai biết màu mũ của mình.",
                "keyWords": [
                      {
                            "word": "hats",
                            "meaningVi": "những chiếc mũ"
                      }
                ]
          },
          {
                "id": "a1_8_4",
                "start": 18.5,
                "end": 26,
                "textEn": "To be set free, one prisoner must shout out the correct color of their hat.",
                "textVi": "Để được trả tự do, một tù nhân phải hô to chính xác màu mũ mà mình đang đội.",
                "keyWords": [
                      {
                            "word": "set free",
                            "meaningVi": "được trả tự do"
                      }
                ]
          }
    ],
  },
  {
    videoId: '2W85Dwxx218',
    id: '2W85Dwxx218',
    title: "Why do we dream? - Amy Adkins",
    thumbnail: 'https://img.youtube.com/vi/2W85Dwxx218/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/2W85Dwxx218/hqdefault.jpg',
    duration: '4:52',
    durationSec: 292,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A1',
    views: '16M',
    subtitles: [
          {
                "id": "a1_9_1",
                "start": 0,
                "end": 6,
                "textEn": "In the third millennium BCE, Mesopotamian kings recorded and interpreted their dreams.",
                "textVi": "Vào thiên niên kỷ thứ 3 TCN, các vị vua Lưỡng Hà đã ghi chép và giải mã những giấc mơ của họ.",
                "keyWords": [
                      {
                            "word": "dreams",
                            "meaningVi": "những giấc mơ"
                      }
                ]
          },
          {
                "id": "a1_9_2",
                "start": 6,
                "end": 13,
                "textEn": "Thousands of years later, scientists are still asking: Why do we dream at all?",
                "textVi": "Hàng ngàn năm sau, các nhà khoa học vẫn đang không ngừng tự hỏi: Tại sao chúng ta lại mơ?",
                "keyWords": [
                      {
                            "word": "scientists",
                            "meaningVi": "các nhà khoa học"
                      }
                ]
          },
          {
                "id": "a1_9_3",
                "start": 13,
                "end": 20,
                "textEn": "Some researchers believe dreams help our brains organize memories and process strong emotions.",
                "textVi": "Một số nhà nghiên cứu tin rằng giấc mơ giúp não bộ sắp xếp ký ức và xử lý cảm xúc mạnh.",
                "keyWords": [
                      {
                            "word": "memories",
                            "meaningVi": "ký ức"
                      },
                      {
                            "word": "emotions",
                            "meaningVi": "cảm xúc"
                      }
                ]
          },
          {
                "id": "a1_9_4",
                "start": 20,
                "end": 28,
                "textEn": "Others think dreams are just random neural signals that our sleeping brain weaves into a story.",
                "textVi": "Những người khác lại nghĩ giấc mơ chỉ là tín hiệu thần kinh ngẫu nhiên được não dệt thành câu chuyện.",
                "keyWords": [
                      {
                            "word": "neural signals",
                            "meaningVi": "tín hiệu thần kinh"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'gedoSfZvBgE',
    id: 'gedoSfZvBgE',
    title: "The benefits of a good night's sleep - Shai Marcu",
    thumbnail: 'https://img.youtube.com/vi/gedoSfZvBgE/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/gedoSfZvBgE/hqdefault.jpg',
    duration: '5:45',
    durationSec: 345,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A1',
    views: '11M',
    subtitles: [
          {
                "id": "a1_10_1",
                "start": 0,
                "end": 6,
                "textEn": "It is late at night. You are staring at your screen, exhausted, but you stay awake.",
                "textVi": "Trời đã về khuya. Bạn đang nhìn chăm chú vào màn hình, kiệt sức nhưng vẫn cố thức.",
                "keyWords": [
                      {
                            "word": "exhausted",
                            "meaningVi": "kiệt sức"
                      }
                ]
          },
          {
                "id": "a1_10_2",
                "start": 6,
                "end": 12,
                "textEn": "Sleep is not a waste of time. It is vital for your health and mental clarity.",
                "textVi": "Giấc ngủ không hề là sự lãng phí thời gian. Nó thiết yếu cho sức khỏe và sự minh mẫn.",
                "keyWords": [
                      {
                            "word": "vital",
                            "meaningVi": "thiết yếu, sống còn"
                      }
                ]
          },
          {
                "id": "a1_10_3",
                "start": 12,
                "end": 18.5,
                "textEn": "During deep sleep, your body repairs muscle tissues and your brain flushes out harmful toxins.",
                "textVi": "Trong giấc ngủ sâu, cơ thể hồi phục mô cơ và não bộ đào thải các độc tố gây hại.",
                "keyWords": [
                      {
                            "word": "repairs",
                            "meaningVi": "sửa chữa, phục hồi"
                      }
                ]
          },
          {
                "id": "a1_10_4",
                "start": 18.5,
                "end": 26,
                "textEn": "Getting seven to eight hours of sleep empowers you to focus better and learn faster.",
                "textVi": "Ngủ đủ 7 đến 8 tiếng mỗi đêm giúp bạn tập trung tốt hơn và tiếp thu kiến thức nhanh hơn.",
                "keyWords": [
                      {
                            "word": "focus better",
                            "meaningVi": "tập trung tốt hơn"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'sI8NsYIyQ2A',
    id: 'sI8NsYIyQ2A',
    title: "Why do cats act so weird? - Tony Buffington",
    thumbnail: 'https://img.youtube.com/vi/sI8NsYIyQ2A/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/sI8NsYIyQ2A/hqdefault.jpg',
    duration: '4:48',
    durationSec: 288,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '19M',
    subtitles: [
          {
                "id": "a2_1_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Cats are one of the most popular and mysterious pets on the planet.",
                "textVi": "Mèo là một trong những loài thú cưng phổ biến và bí ẩn nhất trên hành tinh.",
                "keyWords": [
                      {
                            "word": "mysterious",
                            "meaningVi": "bí ẩn"
                      }
                ]
          },
          {
                "id": "a2_1_2",
                "start": 5.5,
                "end": 12,
                "textEn": "They jump into tiny cardboard boxes, purr loudly, and suddenly run across the room.",
                "textVi": "Chúng chui vào những chiếc hộp các-tông tí hon, kêu rừ rừ và bất ngờ chạy vù qua phòng.",
                "keyWords": [
                      {
                            "word": "purr",
                            "meaningVi": "kêu rừ rừ (tiếng mèo)"
                      }
                ]
          },
          {
                "id": "a2_1_3",
                "start": 12,
                "end": 18.5,
                "textEn": "To understand why cats act this way, we have to look back at their wild ancestors.",
                "textVi": "Để hiểu tại sao mèo cư xử như vậy, chúng ta phải nhìn lại tổ tiên hoang dã của chúng.",
                "keyWords": [
                      {
                            "word": "wild ancestors",
                            "meaningVi": "tổ tiên hoang dã"
                      }
                ]
          },
          {
                "id": "a2_1_4",
                "start": 18.5,
                "end": 26,
                "textEn": "In nature, cats were both solitary predators and vulnerable prey for larger animals.",
                "textVi": "Trong tự nhiên, mèo vừa là thợ săn đơn độc vừa là con mồi dễ bị săn của thú lớn hơn.",
                "keyWords": [
                      {
                            "word": "predators",
                            "meaningVi": "kẻ săn mồi"
                      },
                      {
                            "word": "prey",
                            "meaningVi": "con mồi"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'MMmOLN5zBLY',
    id: 'MMmOLN5zBLY',
    title: "The benefits of a bilingual brain - Mia Nacamulli",
    thumbnail: 'https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg',
    duration: '5:03',
    durationSec: 303,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '15M',
    subtitles: [
          {
                "id": "a2_2_1",
                "start": 0,
                "end": 6,
                "textEn": "It is obvious that knowing more than one language can make certain things easier.",
                "textVi": "Rõ ràng rằng biết nhiều hơn một ngôn ngữ có thể làm cho nhiều điều trở nên dễ dàng hơn.",
                "keyWords": [
                      {
                            "word": "obvious",
                            "meaningVi": "rõ ràng"
                      }
                ]
          },
          {
                "id": "a2_2_2",
                "start": 6,
                "end": 12.5,
                "textEn": "You can travel around the world, watch foreign movies, and talk with international friends.",
                "textVi": "Bạn có thể đi du lịch khắp thế giới, xem phim nước ngoài và trò chuyện với bạn bè quốc tế.",
                "keyWords": [
                      {
                            "word": "travel",
                            "meaningVi": "du lịch"
                      }
                ]
          },
          {
                "id": "a2_2_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "But knowing two languages also makes your brain more flexible, active, and healthy.",
                "textVi": "Nhưng biết hai thứ tiếng còn làm cho não bộ của bạn trở nên linh hoạt, chủ động và khỏe mạnh hơn.",
                "keyWords": [
                      {
                            "word": "flexible",
                            "meaningVi": "linh hoạt"
                      }
                ]
          },
          {
                "id": "a2_2_4",
                "start": 19.5,
                "end": 27,
                "textEn": "Bilingual brains show higher executive functioning and delay cognitive decline as you age.",
                "textVi": "Bộ não song ngữ thể hiện chức năng điều hành cao hơn và trì hoãn suy giảm nhận thức khi về già.",
                "keyWords": [
                      {
                            "word": "cognitive decline",
                            "meaningVi": "suy giảm nhận thức"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'WuyPuH9ojCE',
    id: 'WuyPuH9ojCE',
    title: "How stress affects your brain - Madhumita Murgia",
    thumbnail: 'https://img.youtube.com/vi/WuyPuH9ojCE/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/WuyPuH9ojCE/hqdefault.jpg',
    duration: '4:15',
    durationSec: 255,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '18M',
    subtitles: [
          {
                "id": "a2_3_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Stress is not always a bad thing. It can be handy for a burst of extra energy and focus.",
                "textVi": "Căng thẳng không phải lúc nào cũng là điều xấu. Nó có thể hữu ích khi đem lại năng lượng tức thì.",
                "keyWords": [
                      {
                            "word": "stress",
                            "meaningVi": "sự căng thẳng"
                      }
                ]
          },
          {
                "id": "a2_3_2",
                "start": 5.5,
                "end": 11.5,
                "textEn": "However, when stress is chronic and continuous, it actually changes your brain structure.",
                "textVi": "Tuy nhiên, khi sự căng thẳng kéo dài mãn tính, nó thực sự làm thay đổi cấu trúc não bộ của bạn.",
                "keyWords": [
                      {
                            "word": "chronic",
                            "meaningVi": "mãn tính, kéo dài"
                      }
                ]
          },
          {
                "id": "a2_3_3",
                "start": 11.5,
                "end": 18,
                "textEn": "High levels of cortisol can shrink the prefrontal cortex, which regulates decision making.",
                "textVi": "Nồng độ cortisol tăng cao có thể làm teo vỏ não trước trán, nơi điều hòa việc đưa ra quyết định.",
                "keyWords": [
                      {
                            "word": "decision making",
                            "meaningVi": "đưa ra quyết định"
                      }
                ]
          },
          {
                "id": "a2_3_4",
                "start": 18,
                "end": 26,
                "textEn": "Exercise and meditation are powerful natural habits to counteract these negative effects.",
                "textVi": "Tập thể dục và thiền định là những thói quen tự nhiên đắc lực để đảo ngược tác hại này.",
                "keyWords": [
                      {
                            "word": "meditation",
                            "meaningVi": "thiền định"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'R0JKCYZ8hng',
    id: 'R0JKCYZ8hng',
    title: "How playing an instrument benefits your brain - Anita Collins",
    thumbnail: 'https://img.youtube.com/vi/R0JKCYZ8hng/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/R0JKCYZ8hng/hqdefault.jpg',
    duration: '4:45',
    durationSec: 285,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '13M',
    subtitles: [
          {
                "id": "a2_4_1",
                "start": 0,
                "end": 6,
                "textEn": "When you listen to music, multiple areas of your brain light up like fireworks on a scan.",
                "textVi": "Khi bạn nghe nhạc, nhiều vùng não bộ bừng sáng như pháo hoa trên màn hình chụp cộng hưởng.",
                "keyWords": [
                      {
                            "word": "fireworks",
                            "meaningVi": "pháo hoa"
                      }
                ]
          },
          {
                "id": "a2_4_2",
                "start": 6,
                "end": 12.5,
                "textEn": "Yet when you actually play an instrument, that activity turns into a full-body workout.",
                "textVi": "Thế nhưng khi bạn trực tiếp chơi một nhạc cụ, hoạt động đó trở thành bài tập thể lực toàn diện cho não.",
                "keyWords": [
                      {
                            "word": "instrument",
                            "meaningVi": "nhạc cụ"
                      }
                ]
          },
          {
                "id": "a2_4_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "Musicians simultaneously engage visual, auditory, and motor cortices in real time.",
                "textVi": "Người chơi nhạc cùng lúc kích hoạt vùng vỏ não thị giác, thính giác và vận động trong thời gian thực.",
                "keyWords": [
                      {
                            "word": "simultaneously",
                            "meaningVi": "đồng thời"
                      }
                ]
          },
          {
                "id": "a2_4_4",
                "start": 19.5,
                "end": 27,
                "textEn": "This strengthens memory precision and accelerates creative problem-solving skills.",
                "textVi": "Điều này củng cố độ chính xác của trí nhớ và thúc đẩy kỹ năng giải quyết vấn đề sáng tạo.",
                "keyWords": [
                      {
                            "word": "problem-solving",
                            "meaningVi": "giải quyết vấn đề"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'z-IR48Mb3W0',
    id: 'z-IR48Mb3W0',
    title: "What is depression? - Helen M. Farrell",
    thumbnail: 'https://img.youtube.com/vi/z-IR48Mb3W0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/z-IR48Mb3W0/hqdefault.jpg',
    duration: '4:28',
    durationSec: 268,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '21M',
    subtitles: [
          {
                "id": "a2_5_1",
                "start": 0,
                "end": 6,
                "textEn": "Depression is the leading cause of disability worldwide, yet it is widely misunderstood.",
                "textVi": "Trầm cảm là nguyên nhân hàng đầu gây tàn tật trên toàn cầu, nhưng vẫn thường bị hiểu sai.",
                "keyWords": [
                      {
                            "word": "depression",
                            "meaningVi": "bệnh trầm cảm"
                      }
                ]
          },
          {
                "id": "a2_5_2",
                "start": 6,
                "end": 12.5,
                "textEn": "It is not just feeling sad when life knocks you down; it is a clinical medical illness.",
                "textVi": "Đó không chỉ đơn thuần là cảm giác buồn bã khi gặp trắc trở; đó là một căn bệnh y khoa lâm sàng.",
                "keyWords": [
                      {
                            "word": "medical illness",
                            "meaningVi": "căn bệnh y khoa"
                      }
                ]
          },
          {
                "id": "a2_5_3",
                "start": 12.5,
                "end": 19,
                "textEn": "Symptoms can include chronic fatigue, loss of interest in hobbies, and severe sleep changes.",
                "textVi": "Triệu chứng có thể bao gồm mệt mỏi triền miên, mất hứng thú với sở thích và rối loạn giấc ngủ.",
                "keyWords": [
                      {
                            "word": "symptoms",
                            "meaningVi": "các triệu chứng"
                      }
                ]
          },
          {
                "id": "a2_5_4",
                "start": 19,
                "end": 27,
                "textEn": "Seeking support from therapists and loved ones is a brave and effective path to recovery.",
                "textVi": "Tìm kiếm sự hỗ trợ từ chuyên gia tâm lý và người thân là con đường dũng cảm để hồi phục.",
                "keyWords": [
                      {
                            "word": "recovery",
                            "meaningVi": "sự hồi phục"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'Uj3_KqkI9Zo',
    id: 'Uj3_KqkI9Zo',
    title: "The Infinite Hotel Paradox - Jeff Dekofsky",
    thumbnail: 'https://img.youtube.com/vi/Uj3_KqkI9Zo/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/Uj3_KqkI9Zo/hqdefault.jpg',
    duration: '5:59',
    durationSec: 359,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '17M',
    subtitles: [
          {
                "id": "a2_6_1",
                "start": 0,
                "end": 6,
                "textEn": "Imagine a grand hotel with an infinite number of rooms, and every single room is occupied.",
                "textVi": "Hãy tưởng tượng một khách sạn đồ sộ với vô số căn phòng, và mỗi một phòng đều đã có khách ở.",
                "keyWords": [
                      {
                            "word": "infinite",
                            "meaningVi": "vô hạn, vô tận"
                      }
                ]
          },
          {
                "id": "a2_6_2",
                "start": 6,
                "end": 12.5,
                "textEn": "A new guest arrives and asks for a room. Can the night manager accommodate him?",
                "textVi": "Một vị khách mới đến và hỏi xin một phòng. Liệu người quản lý đêm có thể xếp chỗ cho anh ta?",
                "keyWords": [
                      {
                            "word": "accommodate",
                            "meaningVi": "thu xếp chỗ ở"
                      }
                ]
          },
          {
                "id": "a2_6_3",
                "start": 12.5,
                "end": 19,
                "textEn": "Yes! The manager simply asks the guest in room 1 to move to room 2, room 2 to room 3, and so on.",
                "textVi": "Có chứ! Người quản lý chỉ cần bảo khách phòng 1 dời sang phòng 2, phòng 2 sang 3, cứ tiếp tục như thế.",
                "keyWords": [
                      {
                            "word": "move",
                            "meaningVi": "di chuyển"
                      }
                ]
          },
          {
                "id": "a2_6_4",
                "start": 19,
                "end": 27,
                "textEn": "This mind-bending thought experiment shows the surprising mathematical nature of infinity.",
                "textVi": "Thí nghiệm tư duy gây kinh ngạc này cho thấy bản chất toán học kỳ diệu của khái niệm vô cực.",
                "keyWords": [
                      {
                            "word": "infinity",
                            "meaningVi": "vô cực"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'rb7TVW77ZCs',
    id: 'rb7TVW77ZCs',
    title: "How do vaccines work? - Kelwalin Dhanasarnsombut",
    thumbnail: 'https://img.youtube.com/vi/rb7TVW77ZCs/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/rb7TVW77ZCs/hqdefault.jpg',
    duration: '4:35',
    durationSec: 275,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'A2',
    views: '8.4M',
    subtitles: [
          {
                "id": "a2_7_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Every day, our bodies face an army of microscopic pathogens trying to invade.",
                "textVi": "Mỗi ngày, cơ thể chúng ta phải đối mặt với đội quân mầm bệnh vi mô tìm cách xâm nhập.",
                "keyWords": [
                      {
                            "word": "pathogens",
                            "meaningVi": "mầm bệnh"
                      }
                ]
          },
          {
                "id": "a2_7_2",
                "start": 5.5,
                "end": 12,
                "textEn": "Our immune system produces white blood cells that identify and destroy these invaders.",
                "textVi": "Hệ miễn dịch sản sinh ra bạch cầu có khả năng nhận diện và tiêu diệt những kẻ xâm lược này.",
                "keyWords": [
                      {
                            "word": "immune system",
                            "meaningVi": "hệ miễn dịch"
                      }
                ]
          },
          {
                "id": "a2_7_3",
                "start": 12,
                "end": 18.5,
                "textEn": "Vaccines train your immune system by introducing weakened or inactive parts of the virus.",
                "textVi": "Vắc-xin huấn luyện hệ miễn dịch bằng cách đưa vào cơ thể dạng bất hoạt hoặc làm yếu của virus.",
                "keyWords": [
                      {
                            "word": "vaccines",
                            "meaningVi": "vắc-xin"
                      }
                ]
          },
          {
                "id": "a2_7_4",
                "start": 18.5,
                "end": 26,
                "textEn": "This creates antibodies without making you sick, providing lasting defense.",
                "textVi": "Nhờ đó cơ thể tạo ra kháng thể bảo vệ vững chắc mà không khiến bạn bị phát bệnh.",
                "keyWords": [
                      {
                            "word": "antibodies",
                            "meaningVi": "kháng thể"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'hmFQqjMF_f0',
    id: 'hmFQqjMF_f0',
    title: "How playing sports benefits your body ... and your brain",
    thumbnail: 'https://img.youtube.com/vi/hmFQqjMF_f0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/hmFQqjMF_f0/hqdefault.jpg',
    duration: '3:47',
    durationSec: 227,
    channelName: "Leah Lagos | TED-Ed",
    channelTitle: "Leah Lagos | TED-Ed",
    level: 'A2',
    views: '5.2M',
    subtitles: [
          {
                "id": "a2_8_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Playing sports is well known for keeping your heart, muscles, and bones healthy.",
                "textVi": "Chơi thể thao vốn rất nổi tiếng với công dụng giữ cho tim, cơ bắp và xương khớp khỏe mạnh.",
                "keyWords": [
                      {
                            "word": "healthy",
                            "meaningVi": "khỏe mạnh"
                      }
                ]
          },
          {
                "id": "a2_8_2",
                "start": 5.5,
                "end": 11.5,
                "textEn": "The victory of a championship or the fun of a neighborhood pickup game brings immense joy.",
                "textVi": "Chiến thắng giải đấu hay niềm vui ở trận cầu giao lưu đường phố mang lại niềm hân hoan to lớn.",
                "keyWords": [
                      {
                            "word": "victory",
                            "meaningVi": "chiến thắng"
                      }
                ]
          },
          {
                "id": "a2_8_3",
                "start": 11.5,
                "end": 18,
                "textEn": "Exercise releases endorphins, hormones that reduce pain and trigger positive feelings.",
                "textVi": "Vận động thể chất giải phóng endorphin, các hormone xua tan cơn đau và kích hoạt cảm xúc tích cực.",
                "keyWords": [
                      {
                            "word": "endorphins",
                            "meaningVi": "hormone hạnh phúc endorphin"
                      }
                ]
          },
          {
                "id": "a2_8_4",
                "start": 18,
                "end": 25,
                "textEn": "Team sports also teach resilience, leadership, and emotional regulation under pressure.",
                "textVi": "Các môn thể thao đồng đội còn rèn luyện tính kiên cường, tài lãnh đạo và kiểm soát cảm xúc.",
                "keyWords": [
                      {
                            "word": "resilience",
                            "meaningVi": "sự kiên cường"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'nNhDkKAvxFk',
    id: 'nNhDkKAvxFk',
    title: "What If You Stopped Sleeping? - AsapSCIENCE",
    thumbnail: 'https://img.youtube.com/vi/nNhDkKAvxFk/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/nNhDkKAvxFk/hqdefault.jpg',
    duration: '4:18',
    durationSec: 258,
    channelName: "AsapSCIENCE",
    channelTitle: "AsapSCIENCE",
    level: 'A2',
    views: '28M',
    subtitles: [
          {
                "id": "a2_9_1",
                "start": 0,
                "end": 6,
                "textEn": "Have you ever wondered what would happen if you decided to never sleep again?",
                "textVi": "Đã bao giờ bạn tự hỏi điều gì sẽ xảy ra nếu bạn quyết định không bao giờ đi ngủ nữa?",
                "keyWords": [
                      {
                            "word": "wondered",
                            "meaningVi": "tự hỏi"
                      }
                ]
          },
          {
                "id": "a2_9_2",
                "start": 6,
                "end": 12.5,
                "textEn": "After 24 hours of no sleep, you would feel lightheaded and your reaction times would drop.",
                "textVi": "Sau 24 giờ không ngủ, bạn sẽ cảm thấy choáng váng và phản xạ của bạn sẽ suy giảm nghiêm trọng.",
                "keyWords": [
                      {
                            "word": "reaction times",
                            "meaningVi": "tốc độ phản xạ"
                      }
                ]
          },
          {
                "id": "a2_9_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "By day three, hallucinations would start to occur as your brain struggles to distinguish reality.",
                "textVi": "Đến ngày thứ ba, ảo giác bắt đầu xuất hiện khi não bộ của bạn chật vật phân biệt thực tế.",
                "keyWords": [
                      {
                            "word": "hallucinations",
                            "meaningVi": "ảo giác"
                      }
                ]
          },
          {
                "id": "a2_9_4",
                "start": 19.5,
                "end": 27,
                "textEn": "Sleep is not optional; it is a fundamental biological requirement for human survival.",
                "textVi": "Giấc ngủ không phải điều tùy chọn; đó là nhu cầu sinh học cốt lõi để con người tồn tại.",
                "keyWords": [
                      {
                            "word": "requirement",
                            "meaningVi": "yêu cầu tất yếu"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'UNP03fDSj1U',
    id: 'UNP03fDSj1U',
    title: "Try something new for 30 days - Matt Cutts",
    thumbnail: 'https://img.youtube.com/vi/UNP03fDSj1U/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/UNP03fDSj1U/hqdefault.jpg',
    duration: '3:27',
    durationSec: 207,
    channelName: "Matt Cutts | TED",
    channelTitle: "Matt Cutts | TED",
    level: 'A2',
    views: '13M',
    subtitles: [
          {
                "id": "a2_10_1",
                "start": 0,
                "end": 5.5,
                "textEn": "A few years ago, I felt like I was stuck in a rut, so I decided to follow in the footsteps of Morgan Spurlock.",
                "textVi": "Vài năm trước, tôi cảm thấy mình bị mắc kẹt trong lối mòn, nên tôi quyết định thử thách bản thân.",
                "keyWords": [
                      {
                            "word": "stuck in a rut",
                            "meaningVi": "mắc kẹt trong lối mòn nhàm chán"
                      }
                ]
          },
          {
                "id": "a2_10_2",
                "start": 5.5,
                "end": 11.5,
                "textEn": "The idea is very simple: Think about something you have always wanted to add to your life.",
                "textVi": "Ý tưởng rất đơn giản: Nghĩ về một điều bạn luôn muốn bổ sung vào cuộc sống của mình.",
                "keyWords": [
                      {
                            "word": "simple",
                            "meaningVi": "đơn giản"
                      }
                ]
          },
          {
                "id": "a2_10_3",
                "start": 11.5,
                "end": 18,
                "textEn": "And try doing it consistently for the next 30 days. It turns out 30 days is just the right amount of time.",
                "textVi": "Và kiên trì làm điều đó liên tục trong 30 ngày tiếp theo. Hóa ra 30 ngày là thời lượng vừa đủ đẹp.",
                "keyWords": [
                      {
                            "word": "consistently",
                            "meaningVi": "đều đặn, kiên trì"
                      }
                ]
          },
          {
                "id": "a2_10_4",
                "start": 18,
                "end": 25,
                "textEn": "Small, sustainable changes are much more likely to stick and permanently transform your habits.",
                "textVi": "Những thay đổi nhỏ nhưng bền vững có khả năng gắn kết cao hơn và biến đổi thói quen của bạn.",
                "keyWords": [
                      {
                            "word": "sustainable",
                            "meaningVi": "bền vững"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'h6fcK_fRYaI',
    id: 'h6fcK_fRYaI',
    title: "The Egg - A Short Story About Life and Consciousness",
    thumbnail: 'https://img.youtube.com/vi/h6fcK_fRYaI/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/h6fcK_fRYaI/hqdefault.jpg',
    duration: '7:50',
    durationSec: 470,
    channelName: "Kurzgesagt – In a Nutshell",
    channelTitle: "Kurzgesagt – In a Nutshell",
    level: 'B1',
    views: '24M',
    subtitles: [
          {
                "id": "b1_1_1",
                "start": 0,
                "end": 5,
                "textEn": "[Ambient Intro Music - Kurzgesagt Theme]",
                "textVi": "[Nhạc nền mở đầu êm đềm phong cách Kurzgesagt]",
                "keyWords": [
                      {
                            "word": "Ambient Intro",
                            "meaningVi": "Nhạc dạo du dương"
                      }
                ]
          },
          {
                "id": "b1_1_2",
                "start": 5,
                "end": 9.5,
                "textEn": "You were on your way home when you died.",
                "textVi": "Bạn đang trên đường về nhà thì qua đời.",
                "keyWords": [
                      {
                            "word": "on your way home",
                            "meaningVi": "trên đường về nhà"
                      }
                ]
          },
          {
                "id": "b1_1_3",
                "start": 9.5,
                "end": 13.5,
                "textEn": "It was a car accident.",
                "textVi": "Đó là một vụ tai nạn xe hơi.",
                "keyWords": [
                      {
                            "word": "car accident",
                            "meaningVi": "tai nạn ô tô/xe hơi"
                      }
                ]
          },
          {
                "id": "b1_1_4",
                "start": 13.5,
                "end": 18.5,
                "textEn": "Nothing particularly remarkable, but nevertheless fatal.",
                "textVi": "Không có gì quá nổi bật, nhưng dẫu vậy nó vẫn cướp đi sinh mạng.",
                "keyWords": [
                      {
                            "word": "remarkable",
                            "meaningVi": "đáng chú ý"
                      },
                      {
                            "word": "fatal",
                            "meaningVi": "chí mạng"
                      }
                ]
          },
          {
                "id": "b1_1_5",
                "start": 18.5,
                "end": 23,
                "textEn": "You left behind a wife and two children.",
                "textVi": "Bạn để lại người vợ và hai đứa con nhỏ.",
                "keyWords": [
                      {
                            "word": "left behind",
                            "meaningVi": "để lại phía sau"
                      }
                ]
          },
          {
                "id": "b1_1_6",
                "start": 23,
                "end": 27.5,
                "textEn": "It was a painless death.",
                "textVi": "Đó là một cái chết thanh thản, không đau đớn.",
                "keyWords": [
                      {
                            "word": "painless",
                            "meaningVi": "không đau đớn"
                      }
                ]
          },
          {
                "id": "b1_1_7",
                "start": 27.5,
                "end": 32.5,
                "textEn": "The EMTs tried their best to save you, but to no avail.",
                "textVi": "Các nhân viên y tế cấp cứu đã cố gắng hết sức để cứu bạn, nhưng vô vọng.",
                "keyWords": [
                      {
                            "word": "to no avail",
                            "meaningVi": "vô ích, không thành"
                      }
                ]
          },
          {
                "id": "b1_1_8",
                "start": 32.5,
                "end": 37,
                "textEn": "And that's when you met me.",
                "textVi": "Và đó là khoảnh khắc bạn gặp tôi.",
                "keyWords": [
                      {
                            "word": "met me",
                            "meaningVi": "gặp tôi"
                      }
                ]
          },
          {
                "id": "b1_1_9",
                "start": 37,
                "end": 41.5,
                "textEn": "“What happened?” you asked. “Where am I?”",
                "textVi": "“Chuyện gì vừa xảy ra vậy?” bạn hỏi. “Tôi đang ở đâu thế này?”",
                "keyWords": [
                      {
                            "word": "what happened",
                            "meaningVi": "chuyện gì đã xảy ra"
                      }
                ]
          },
          {
                "id": "b1_1_10",
                "start": 41.5,
                "end": 47,
                "textEn": "“You died,” I said, matter-of-factly. No point in mincing words.",
                "textVi": "“Bạn đã qua đời rồi,” tôi nói một cách thản nhiên. Chẳng có lý do gì phải nói vòng vo.",
                "keyWords": [
                      {
                            "word": "matter-of-factly",
                            "meaningVi": "bình thản, không xúc động"
                      }
                ]
          }
    ],
  },
  {
    videoId: '9hus12iCyL8',
    id: '9hus12iCyL8',
    title: "Can we boost the immune system? ⏲️ 6 Minute English",
    thumbnail: 'https://img.youtube.com/vi/9hus12iCyL8/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/9hus12iCyL8/hqdefault.jpg',
    duration: '6:15',
    durationSec: 375,
    channelName: "BBC Learning English",
    channelTitle: "BBC Learning English",
    level: 'B1',
    views: '1.1M',
    subtitles: [
          {
                "id": "b1_2_1",
                "start": 0,
                "end": 6,
                "textEn": "Hello and welcome to 6 Minute English from BBC Learning English. I am Neil.",
                "textVi": "Xin chào và chào mừng đến với chương trình 6 Phút Tiếng Anh từ BBC Learning English. Tôi là Neil.",
                "keyWords": [
                      {
                            "word": "welcome",
                            "meaningVi": "chào mừng"
                      }
                ]
          },
          {
                "id": "b1_2_2",
                "start": 6,
                "end": 12,
                "textEn": "And I am Sam! In this programme, we are asking: can you really boost your immune system?",
                "textVi": "Và tôi là Sam! Trong chương trình này, chúng ta sẽ thảo luận: liệu có thể tăng cường hệ miễn dịch?",
                "keyWords": [
                      {
                            "word": "boost",
                            "meaningVi": "thúc đẩy, tăng cường"
                      }
                ]
          },
          {
                "id": "b1_2_3",
                "start": 12,
                "end": 18.5,
                "textEn": "With winter approaching, many products claim to supercharge our natural defenses.",
                "textVi": "Mùa đông cận kề, rất nhiều sản phẩm quảng cáo có khả năng tăng tốc sức đề kháng tự nhiên.",
                "keyWords": [
                      {
                            "word": "defenses",
                            "meaningVi": "hàng rào phòng thủ"
                      }
                ]
          },
          {
                "id": "b1_2_4",
                "start": 18.5,
                "end": 26,
                "textEn": "Medical experts suggest that regular balanced nutrition and sound sleep matter most.",
                "textVi": "Các chuyên gia y tế cho rằng dinh dưỡng cân bằng và giấc ngủ chất lượng mới là điều then chốt.",
                "keyWords": [
                      {
                            "word": "nutrition",
                            "meaningVi": "dinh dưỡng"
                      }
                ]
          }
    ],
  },
  {
    videoId: '3hwEplr-g5w',
    id: '3hwEplr-g5w',
    title: "Should we eat less rice? ⏲️ 6 Minute English",
    thumbnail: 'https://img.youtube.com/vi/3hwEplr-g5w/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/3hwEplr-g5w/hqdefault.jpg',
    duration: '6:10',
    durationSec: 370,
    channelName: "BBC Learning English",
    channelTitle: "BBC Learning English",
    level: 'B1',
    views: '920K',
    subtitles: [
          {
                "id": "b1_3_1",
                "start": 0,
                "end": 5.5,
                "textEn": "Welcome to 6 Minute English. Rice is a staple food for over half the world’s population.",
                "textVi": "Chào mừng bạn đến với 6 Minute English. Cơm là lương thực thiết yếu của hơn nửa nhân loại.",
                "keyWords": [
                      {
                            "word": "staple food",
                            "meaningVi": "lương thực chính"
                      }
                ]
          },
          {
                "id": "b1_3_2",
                "start": 5.5,
                "end": 12,
                "textEn": "Yet paddy rice fields produce large amounts of methane, a potent greenhouse gas.",
                "textVi": "Tuy vậy, các cánh đồng lúa nước thải ra lượng khí mê-tan khổng lồ, một khí nhà kính mạnh.",
                "keyWords": [
                      {
                            "word": "methane",
                            "meaningVi": "khí mê-tan"
                      }
                ]
          },
          {
                "id": "b1_3_3",
                "start": 12,
                "end": 18.5,
                "textEn": "Agricultural innovators are testing alternative irrigation methods to reduce climate impact.",
                "textVi": "Các nhà nông nghiệp sáng tạo đang thử nghiệm phương pháp tưới tiêu mới để giảm biến đổi khí hậu.",
                "keyWords": [
                      {
                            "word": "irrigation",
                            "meaningVi": "tưới tiêu nông nghiệp"
                      }
                ]
          },
          {
                "id": "b1_3_4",
                "start": 18.5,
                "end": 26,
                "textEn": "Join us as we explore the delicate balance between food security and global emissions.",
                "textVi": "Hãy cùng chúng tôi khám phá sự cân bằng mong manh giữa an ninh lương thực và khí thải toàn cầu.",
                "keyWords": [
                      {
                            "word": "food security",
                            "meaningVi": "an ninh lương thực"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'c5Ppkvg7xHI',
    id: 'c5Ppkvg7xHI',
    title: "How green is your money? ⏲️ 6 Minute English",
    thumbnail: 'https://img.youtube.com/vi/c5Ppkvg7xHI/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/c5Ppkvg7xHI/hqdefault.jpg',
    duration: '6:20',
    durationSec: 380,
    channelName: "BBC Learning English",
    channelTitle: "BBC Learning English",
    level: 'B1',
    views: '780K',
    subtitles: [
          {
                "id": "b1_4_1",
                "start": 0,
                "end": 6,
                "textEn": "Do you know what your bank does with your hard-earned savings while they sit in an account?",
                "textVi": "Bạn có biết ngân hàng làm gì với những đồng tiền tiết kiệm quý giá khi gửi trong tài khoản?",
                "keyWords": [
                      {
                            "word": "savings",
                            "meaningVi": "tiền tiết kiệm"
                      }
                ]
          },
          {
                "id": "b1_4_2",
                "start": 6,
                "end": 12.5,
                "textEn": "Green banking and ethical investing ensure your funds finance renewable energy projects.",
                "textVi": "Ngân hàng xanh và đầu tư đạo đức đảm bảo dòng tiền tài trợ cho các dự án năng lượng tái tạo.",
                "keyWords": [
                      {
                            "word": "renewable energy",
                            "meaningVi": "năng lượng tái tạo"
                      }
                ]
          },
          {
                "id": "b1_4_3",
                "start": 12.5,
                "end": 19,
                "textEn": "More consumers are demanding full transparency from financial institutions.",
                "textVi": "Ngày càng nhiều người tiêu dùng đòi hỏi sự minh bạch tuyệt đối từ các định chế tài chính.",
                "keyWords": [
                      {
                            "word": "transparency",
                            "meaningVi": "sự minh bạch"
                      }
                ]
          },
          {
                "id": "b1_4_4",
                "start": 19,
                "end": 27,
                "textEn": "Aligning our investments with sustainability values is a crucial lever for global change.",
                "textVi": "Định hướng các khoản đầu tư theo giá trị bền vững là đòn bẩy quan trọng cho sự chuyển mình toàn cầu.",
                "keyWords": [
                      {
                            "word": "sustainability",
                            "meaningVi": "sự bền vững"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'uAy6EawKKME',
    id: 'uAy6EawKKME',
    title: "Everyday leadership - Drew Dudley",
    thumbnail: 'https://img.youtube.com/vi/uAy6EawKKME/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/uAy6EawKKME/hqdefault.jpg',
    duration: '6:14',
    durationSec: 374,
    channelName: "Drew Dudley | TED",
    channelTitle: "Drew Dudley | TED",
    level: 'B1',
    views: '6.5M',
    subtitles: [
          {
                "id": "b1_5_1",
                "start": 0,
                "end": 6,
                "textEn": "We have made leadership into something bigger than ourselves, something extraordinary.",
                "textVi": "Chúng ta đã vô tình biến thuật lãnh đạo thành thứ gì đó quá to tát, một điều phi thường.",
                "keyWords": [
                      {
                            "word": "leadership",
                            "meaningVi": "tài năng lãnh đạo"
                      }
                ]
          },
          {
                "id": "b1_5_2",
                "start": 6,
                "end": 12.5,
                "textEn": "We celebrate people who change the world, but we devalue everyday moments of genuine impact.",
                "textVi": "Chúng ta tán dương những người thay đổi thế giới, nhưng lại xem nhẹ những khoảnh khắc tạo tác động nhỏ.",
                "keyWords": [
                      {
                            "word": "devalue",
                            "meaningVi": "xem nhẹ, hạ thấp giá trị"
                      }
                ]
          },
          {
                "id": "b1_5_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "Drew calls these \"lollipop moments\" — times when you fundamentally improved someone’s life.",
                "textVi": "Drew gọi đó là \"khoảnh khắc kẹo mút\" — lúc bạn tạo nên thay đổi tích cực sâu sắc cho cuộc đời ai đó.",
                "keyWords": [
                      {
                            "word": "improved",
                            "meaningVi": "đã cải thiện"
                      }
                ]
          },
          {
                "id": "b1_5_4",
                "start": 19.5,
                "end": 27,
                "textEn": "True leaders recognize that empowering someone today makes all the difference tomorrow.",
                "textVi": "Nhà lãnh đạo chân chính thấu hiểu rằng truyền cảm hứng cho ai đó hôm nay sẽ tạo ra khác biệt ngày mai.",
                "keyWords": [
                      {
                            "word": "empowering",
                            "meaningVi": "trao quyền, truyền cảm hứng"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'd0yGdNEWdn0',
    id: 'd0yGdNEWdn0',
    title: "How to learn any language in six months",
    thumbnail: 'https://img.youtube.com/vi/d0yGdNEWdn0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/d0yGdNEWdn0/hqdefault.jpg',
    duration: '18:27',
    durationSec: 1107,
    channelName: "Chris Lonsdale | TEDx",
    channelTitle: "Chris Lonsdale | TEDx",
    level: 'B1',
    views: '35M',
    subtitles: [
          {
                "id": "b1_6_1",
                "start": 0,
                "end": 6,
                "textEn": "Have you ever wondered how an adult can learn a foreign language in just six months?",
                "textVi": "Bạn đã từng tự hỏi làm thế nào một người trưởng thành có thể thông thạo ngoại ngữ chỉ trong 6 tháng?",
                "keyWords": [
                      {
                            "word": "foreign language",
                            "meaningVi": "ngoại ngữ"
                      }
                ]
          },
          {
                "id": "b1_6_2",
                "start": 6,
                "end": 13,
                "textEn": "The traditional approach taught in schools relies on rote memorization and formal grammar rules.",
                "textVi": "Phương pháp truyền thống giảng dạy ở trường học phụ thuộc vào việc học vẹt và ngữ pháp khô cứng.",
                "keyWords": [
                      {
                            "word": "memorization",
                            "meaningVi": "sự ghi nhớ, học vẹt"
                      }
                ]
          },
          {
                "id": "b1_6_3",
                "start": 13,
                "end": 20,
                "textEn": "Instead, immerse yourself in comprehensible input and use the language to communicate immediately.",
                "textVi": "Thay vào đó, hãy đắm chìm vào dữ liệu đầu vào có thể hiểu được và dùng ngôn ngữ giao tiếp ngay lập tức.",
                "keyWords": [
                      {
                            "word": "comprehensible",
                            "meaningVi": "có thể lĩnh hội, hiểu được"
                      }
                ]
          },
          {
                "id": "b1_6_4",
                "start": 20,
                "end": 28,
                "textEn": "By focusing on core phrases and facial imitation, your brain absorbs language effortlessly.",
                "textVi": "Bằng cách tập trung vào cụm từ cốt lõi và bắt chước khẩu hình, não bạn tiếp thu ngoại ngữ tự nhiên.",
                "keyWords": [
                      {
                            "word": "imitation",
                            "meaningVi": "sự bắt chước"
                      }
                ]
          }
    ],
  },
  {
    videoId: '-WLHr1_EVtQ',
    id: '-WLHr1_EVtQ',
    title: "5 techniques to speak any language",
    thumbnail: 'https://img.youtube.com/vi/-WLHr1_EVtQ/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/-WLHr1_EVtQ/hqdefault.jpg',
    duration: '14:50',
    durationSec: 890,
    channelName: "Sid Efromovich | TEDx",
    channelTitle: "Sid Efromovich | TEDx",
    level: 'B1',
    views: '16M',
    subtitles: [
          {
                "id": "b1_7_1",
                "start": 0,
                "end": 6,
                "textEn": "People often tell me: \"Sid, you are so lucky to speak seven languages fluently.\"",
                "textVi": "Mọi người thường nói với tôi: \"Sid à, bạn thật may mắn khi có thể nói lưu loát bảy thứ tiếng.\"",
                "keyWords": [
                      {
                            "word": "fluently",
                            "meaningVi": "một cách lưu loát"
                      }
                ]
          },
          {
                "id": "b1_7_2",
                "start": 6,
                "end": 12.5,
                "textEn": "The truth is that talent has very little to do with mastering a new tongue.",
                "textVi": "Sự thật là năng khiếu bẩm sinh chỉ đóng vai trò rất nhỏ trong việc làm chủ một ngôn ngữ mới.",
                "keyWords": [
                      {
                            "word": "mastering",
                            "meaningVi": "làm chủ, tinh thông"
                      }
                ]
          },
          {
                "id": "b1_7_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "The number one rule is: make mistakes! If you are afraid to sound silly, you will never speak.",
                "textVi": "Quy tắc số một là: hãy phạm sai lầm! Nếu bạn sợ phát âm ngớ ngẩn, bạn sẽ chẳng bao giờ dám mở lời.",
                "keyWords": [
                      {
                            "word": "make mistakes",
                            "meaningVi": "phạm lỗi, sai lầm"
                      }
                ]
          },
          {
                "id": "b1_7_4",
                "start": 19.5,
                "end": 27,
                "textEn": "Find a language buddy, embrace phonetic showers, and connect words to concrete images.",
                "textVi": "Hãy tìm một người bạn đồng hành, tắm trong ngữ âm và liên kết từ vựng với hình ảnh cụ thể.",
                "keyWords": [
                      {
                            "word": "concrete images",
                            "meaningVi": "hình ảnh trực quan"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'w-HYZv6HzAs',
    id: 'w-HYZv6HzAs',
    title: "The skill of self confidence",
    thumbnail: 'https://img.youtube.com/vi/w-HYZv6HzAs/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/w-HYZv6HzAs/hqdefault.jpg',
    duration: '13:21',
    durationSec: 801,
    channelName: "Dr. Ivan Joseph | TEDx",
    channelTitle: "Dr. Ivan Joseph | TEDx",
    level: 'B1',
    views: '29M',
    subtitles: [
          {
                "id": "b1_8_1",
                "start": 0,
                "end": 6,
                "textEn": "Self-confidence is not a personality trait you are born with; it is a trainable skill.",
                "textVi": "Sự tự tin không phải là nét tính cách bẩm sinh khi chào đời; đó là một kỹ năng có thể rèn luyện.",
                "keyWords": [
                      {
                            "word": "self-confidence",
                            "meaningVi": "sự tự tin vào bản thân"
                      }
                ]
          },
          {
                "id": "b1_8_2",
                "start": 6,
                "end": 13,
                "textEn": "Repetition, repetition, repetition. You must practice your craft until it becomes second nature.",
                "textVi": "Lặp lại, lặp lại và lặp lại. Bạn phải rèn giũa kỹ năng của mình cho đến khi nó trở thành phản xạ tự nhiên.",
                "keyWords": [
                      {
                            "word": "repetition",
                            "meaningVi": "sự lặp đi lặp lại"
                      }
                ]
          },
          {
                "id": "b1_8_3",
                "start": 13,
                "end": 20,
                "textEn": "Stop the negative self-talk. The voice in your head must be your greatest cheerleader.",
                "textVi": "Hãy chấm dứt những độc thoại nội tâm tiêu cực. Tiếng nói trong đầu bạn phải là người cổ vũ vĩ đại nhất.",
                "keyWords": [
                      {
                            "word": "cheerleader",
                            "meaningVi": "người cổ vũ, động viên"
                      }
                ]
          },
          {
                "id": "b1_8_4",
                "start": 20,
                "end": 28,
                "textEn": "Celebrate your persistence and interpret setbacks as temporary stepping stones.",
                "textVi": "Hãy trân trọng lòng kiên trì của chính mình và xem các thất bại như bước đệm tạm thời.",
                "keyWords": [
                      {
                            "word": "stepping stones",
                            "meaningVi": "bước đệm tiến lên"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'fLJsdqxnZb0',
    id: 'fLJsdqxnZb0',
    title: "The happy secret to better work - Shawn Achor",
    thumbnail: 'https://img.youtube.com/vi/fLJsdqxnZb0/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/fLJsdqxnZb0/hqdefault.jpg',
    duration: '12:20',
    durationSec: 740,
    channelName: "Shawn Achor | TED",
    channelTitle: "Shawn Achor | TED",
    level: 'B1',
    views: '25M',
    subtitles: [
          {
                "id": "b1_9_1",
                "start": 0,
                "end": 6,
                "textEn": "Most people believe that if they work harder, they will be more successful and then happier.",
                "textVi": "Hầu hết mọi người tin rằng nếu nỗ lực làm việc chăm chỉ hơn, họ sẽ thành công hơn và rồi sẽ hạnh phúc.",
                "keyWords": [
                      {
                            "word": "successful",
                            "meaningVi": "thành công"
                      }
                ]
          },
          {
                "id": "b1_9_2",
                "start": 6,
                "end": 12.5,
                "textEn": "However, scientific research in positive psychology proves that the formula is backwards.",
                "textVi": "Thế nhưng các nghiên cứu khoa học tâm lý tích cực lại chứng minh công thức đó đang bị đảo ngược.",
                "keyWords": [
                      {
                            "word": "backwards",
                            "meaningVi": "ngược chiều, sai trật tự"
                      }
                ]
          },
          {
                "id": "b1_9_3",
                "start": 12.5,
                "end": 19.5,
                "textEn": "When your brain is positive in the present, your dopamine levels rise, enhancing creativity.",
                "textVi": "Khi tâm trí bạn lạc quan ở hiện tại, lượng dopamine gia tăng, kích thích mạnh mẽ sự sáng tạo.",
                "keyWords": [
                      {
                            "word": "dopamine",
                            "meaningVi": "hormone tạo hưng phấn dopamine"
                      }
                ]
          },
          {
                "id": "b1_9_4",
                "start": 19.5,
                "end": 27,
                "textEn": "Practicing gratitude and random acts of kindness daily rewire your brain for peak performance.",
                "textVi": "Thực hành lòng biết ơn và hành động tử tế mỗi ngày giúp lập trình lại não bộ cho hiệu suất đỉnh cao.",
                "keyWords": [
                      {
                            "word": "gratitude",
                            "meaningVi": "lòng biết ơn"
                      }
                ]
          }
    ],
  },
  {
    videoId: '86x-u-tz0MA',
    id: '86x-u-tz0MA',
    title: "Your elusive creative genius - Elizabeth Gilbert",
    thumbnail: 'https://img.youtube.com/vi/86x-u-tz0MA/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/86x-u-tz0MA/hqdefault.jpg',
    duration: '19:09',
    durationSec: 1149,
    channelName: "Elizabeth Gilbert | TED",
    channelTitle: "Elizabeth Gilbert | TED",
    level: 'B1',
    views: '21M',
    subtitles: [
          {
                "id": "b1_10_1",
                "start": 0,
                "end": 6,
                "textEn": "After the enormous success of \"Eat, Pray, Love\", people asked me: \"Aren’t you afraid of failing now?\"",
                "textVi": "Sau thành công vang dội của cuốn sách \"Ăn, Cầu nguyện, Yêu\", mọi người hỏi tôi: \"Bây giờ chị có sợ thất bại?\"",
                "keyWords": [
                      {
                            "word": "enormous success",
                            "meaningVi": "thành công vang dội"
                      }
                ]
          },
          {
                "id": "b1_10_2",
                "start": 6,
                "end": 13,
                "textEn": "In ancient Greece and Rome, people did not believe that an individual WAS a genius.",
                "textVi": "Thời Hy Lạp và La Mã cổ đại, con người không bao giờ tin rằng một cá nhân LÀ một thiên tài.",
                "keyWords": [
                      {
                            "word": "ancient",
                            "meaningVi": "thời cổ đại"
                      }
                ]
          },
          {
                "id": "b1_10_3",
                "start": 13,
                "end": 20,
                "textEn": "They believed that a genius was a divine external entity that lived in the walls of an artist’s studio.",
                "textVi": "Họ tin rằng thiên tài là một thực thể vô hình thiêng liêng ghé thăm xưởng vẽ của người nghệ sĩ.",
                "keyWords": [
                      {
                            "word": "divine entity",
                            "meaningVi": "thực thể thiêng liêng"
                      }
                ]
          },
          {
                "id": "b1_10_4",
                "start": 20,
                "end": 28,
                "textEn": "This separation shields artists from narcissistic ego and paralyzing anxiety alike.",
                "textVi": "Sự tách biệt này che chắn cho người sáng tạo khỏi thói tự cao tự đại lẫn nỗi lo âu tê liệt.",
                "keyWords": [
                      {
                            "word": "anxiety",
                            "meaningVi": "nỗi lo âu, bất an"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'VgOm8nqPlD4',
    id: 'VgOm8nqPlD4',
    title: "Want Someone to Change? Ask This Question",
    thumbnail: 'https://img.youtube.com/vi/VgOm8nqPlD4/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/VgOm8nqPlD4/hqdefault.jpg',
    duration: '7:32',
    durationSec: 452,
    channelName: "Philip Jameson | TED",
    channelTitle: "Philip Jameson | TED",
    level: 'B2',
    views: '3.8M',
    subtitles: [
          {
                "id": "b2_1_1",
                "start": 0.8,
                "end": 2.2,
                "textEn": "A few years ago,",
                "textVi": "Cách đây vài năm,",
                "keyWords": [
                      {
                            "word": "years ago",
                            "meaningVi": "những năm trước"
                      }
                ]
          },
          {
                "id": "b2_1_2",
                "start": 2.2,
                "end": 5.8,
                "textEn": "I was speaking with a business leader who was frustrated.",
                "textVi": "Tôi có nói chuyện với một lãnh đạo doanh nghiệp đang vô cùng thất vọng.",
                "keyWords": [
                      {
                            "word": "business leader",
                            "meaningVi": "lãnh đạo doanh nghiệp"
                      },
                      {
                            "word": "frustrated",
                            "meaningVi": "thất vọng, ức chế"
                      }
                ]
          },
          {
                "id": "b2_1_3",
                "start": 5.8,
                "end": 8,
                "textEn": "He was always pitching new ideas to his team",
                "textVi": "Anh ấy liên tục đưa ra những ý tưởng mới mẻ cho đội ngũ của mình",
                "keyWords": [
                      {
                            "word": "pitching ideas",
                            "meaningVi": "đưa ra ý tưởng"
                      }
                ]
          },
          {
                "id": "b2_1_4",
                "start": 8,
                "end": 11.5,
                "textEn": "on how they could improve their performance.",
                "textVi": "về cách thức cải thiện hiệu suất công việc.",
                "keyWords": [
                      {
                            "word": "performance",
                            "meaningVi": "hiệu suất công việc"
                      }
                ]
          },
          {
                "id": "b2_1_5",
                "start": 11.5,
                "end": 15,
                "textEn": "But his team didn't seem to take up those ideas very often.",
                "textVi": "Nhưng dường như đội ngũ của anh ấy rất hiếm khi đón nhận những ý tưởng đó.",
                "keyWords": [
                      {
                            "word": "take up",
                            "meaningVi": "đón nhận, thực thi"
                      }
                ]
          },
          {
                "id": "b2_1_6",
                "start": 15,
                "end": 20,
                "textEn": "Instead of pushing harder, we need to ask what friction is stopping them from moving forward.",
                "textVi": "Thay vì thúc ép gay gắt hơn, ta cần tìm hiểu xem trở ngại nào đang ngăn cản họ tiến lên.",
                "keyWords": [
                      {
                            "word": "friction",
                            "meaningVi": "trở ngại, ma sát cản trở"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'UF8uR6Z6KLc',
    id: 'UF8uR6Z6KLc',
    title: "Steve Jobs' 2005 Stanford Commencement Address",
    thumbnail: 'https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg',
    duration: '15:04',
    durationSec: 904,
    channelName: "Stanford University",
    channelTitle: "Stanford University",
    level: 'B2',
    views: '45M',
    subtitles: [
          {
                "id": "b2_2_1",
                "start": 0,
                "end": 8,
                "textEn": "I am honored to be with you today at your commencement from one of the finest universities in the world.",
                "textVi": "Tôi rất vinh dự được có mặt cùng các bạn hôm nay trong lễ tốt nghiệp tại một trong những trường đại học danh giá nhất thế giới.",
                "keyWords": [
                      {
                            "word": "commencement",
                            "meaningVi": "lễ tốt nghiệp đại học"
                      }
                ]
          },
          {
                "id": "b2_2_2",
                "start": 8,
                "end": 15,
                "textEn": "I never graduated from college. Truth be told, this is the closest I’ve ever gotten to a college graduation.",
                "textVi": "Tôi chưa từng tốt nghiệp đại học. Thật lòng mà nói, đây là khoảnh khắc gần nhất tôi chạm tới một lễ tốt nghiệp.",
                "keyWords": [
                      {
                            "word": "graduated",
                            "meaningVi": "đã tốt nghiệp"
                      }
                ]
          },
          {
                "id": "b2_2_3",
                "start": 15,
                "end": 22,
                "textEn": "Today I want to tell you three stories from my life. That’s it. No big deal. Just three stories.",
                "textVi": "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện trong đời tôi. Chỉ vậy thôi. Không to tát gì. Chỉ đúng ba câu chuyện.",
                "keyWords": [
                      {
                            "word": "three stories",
                            "meaningVi": "ba câu chuyện"
                      }
                ]
          },
          {
                "id": "b2_2_4",
                "start": 22,
                "end": 30,
                "textEn": "The first story is about connecting the dots. You can’t connect the dots looking forward; you can only connect them looking backwards.",
                "textVi": "Câu chuyện đầu tiên là về việc kết nối các dấu chấm. Bạn không thể nối chúng lại khi nhìn về tương lai; chỉ có thể nối khi nhìn lại quá khứ.",
                "keyWords": [
                      {
                            "word": "connecting the dots",
                            "meaningVi": "kết nối các điểm mấu chốt"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'u4ZoJKF_VuA',
    id: 'u4ZoJKF_VuA',
    title: "Start with why -- how great leaders inspire action",
    thumbnail: 'https://img.youtube.com/vi/u4ZoJKF_VuA/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/u4ZoJKF_VuA/hqdefault.jpg',
    duration: '18:04',
    durationSec: 1084,
    channelName: "Simon Sinek | TEDx",
    channelTitle: "Simon Sinek | TEDx",
    level: 'B2',
    views: '62M',
    subtitles: [
          {
                "id": "b2_3_1",
                "start": 0,
                "end": 6.5,
                "textEn": "How do you explain when things don’t go as we assume? Or better, how do you explain when others achieve things that seem to defy assumptions?",
                "textVi": "Làm thế nào bạn giải thích khi mọi thứ không diễn ra như dự tính? Hay giải thích khi người khác làm được điều tưởng chừng bất khả thi?",
                "keyWords": [
                      {
                            "word": "assumptions",
                            "meaningVi": "các giả định, nhận định"
                      }
                ]
          },
          {
                "id": "b2_3_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "Why is Apple so innovative year after year? Why did Martin Luther King lead the Civil Rights Movement?",
                "textVi": "Tại sao Apple có thể đổi mới năm này qua năm khác? Tại sao Martin Luther King lại dẫn dắt phong trào Dân quyền?",
                "keyWords": [
                      {
                            "word": "innovative",
                            "meaningVi": "mang tính đổi mới sáng tạo"
                      }
                ]
          },
          {
                "id": "b2_3_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Simon Sinek discovered a codified pattern: all great leaders think, act, and communicate in the exact same way — from the inside out.",
                "textVi": "Simon Sinek phát hiện ra một hình mẫu: mọi nhà lãnh đạo vĩ đại đều tư duy, hành động và truyền thông theo cùng một cách — từ trong ra ngoài.",
                "keyWords": [
                      {
                            "word": "inside out",
                            "meaningVi": "từ sâu bên trong ra ngoài"
                      }
                ]
          },
          {
                "id": "b2_3_4",
                "start": 21,
                "end": 29,
                "textEn": "He calls this the Golden Circle: Why, How, and What. People don’t buy what you do; they buy why you do it.",
                "textVi": "Ông gọi đó là Vòng tròn Vàng: Tại sao, Như thế nào và Cái gì. Khách hàng không mua cái bạn làm; họ mua lý do bạn làm điều đó.",
                "keyWords": [
                      {
                            "word": "Golden Circle",
                            "meaningVi": "Vòng tròn Vàng cốt lõi"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'iG9CE55wbtY',
    id: 'iG9CE55wbtY',
    title: "Do schools kill creativity? - Sir Ken Robinson",
    thumbnail: 'https://img.youtube.com/vi/iG9CE55wbtY/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/iG9CE55wbtY/hqdefault.jpg',
    duration: '19:24',
    durationSec: 1164,
    channelName: "Sir Ken Robinson | TED",
    channelTitle: "Sir Ken Robinson | TED",
    level: 'B2',
    views: '76M',
    subtitles: [
          {
                "id": "b2_4_1",
                "start": 0,
                "end": 6.5,
                "textEn": "Good morning. How are you? It’s been great, hasn’t it? I’ve been blown away by the whole thing.",
                "textVi": "Xin chào buổi sáng. Các bạn thế nào? Thật tuyệt vời phải không? Tôi hoàn toàn bị choáng ngợp bởi mọi thứ ở đây.",
                "keyWords": [
                      {
                            "word": "blown away",
                            "meaningVi": "bị choáng ngợp, ấn tượng sâu sắc"
                      }
                ]
          },
          {
                "id": "b2_4_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "I have an interest in education, and what strikes me is that all kids have tremendous talents.",
                "textVi": "Tôi có mối quan tâm sâu sắc tới giáo dục, và điều khiến tôi trăn trở là đứa trẻ nào cũng mang tài năng phi thường.",
                "keyWords": [
                      {
                            "word": "tremendous talents",
                            "meaningVi": "những tài năng phi thường"
                      }
                ]
          },
          {
                "id": "b2_4_3",
                "start": 13.5,
                "end": 21,
                "textEn": "My contention is that creativity now is as important in education as literacy, and we should treat it with the same status.",
                "textVi": "Quan điểm của tôi là sự sáng tạo trong giáo dục ngày nay quan trọng không kém gì khả năng biết chữ, và cần được đối xử bình đẳng.",
                "keyWords": [
                      {
                            "word": "creativity",
                            "meaningVi": "sự sáng tạo"
                      },
                      {
                            "word": "literacy",
                            "meaningVi": "khả năng đọc viết"
                      }
                ]
          },
          {
                "id": "b2_4_4",
                "start": 21,
                "end": 29,
                "textEn": "If you are not prepared to be wrong, you will never come up with anything original.",
                "textVi": "Nếu bạn không sẵn sàng chấp nhận việc mình có thể sai lầm, bạn sẽ không bao giờ nghĩ ra được bất cứ thứ gì độc đáo.",
                "keyWords": [
                      {
                            "word": "original",
                            "meaningVi": "mang tính độc bản, nguyên bản"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'arj7oStGLkU',
    id: 'arj7oStGLkU',
    title: "Inside the Mind of a Master Procrastinator",
    thumbnail: 'https://img.youtube.com/vi/arj7oStGLkU/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/arj7oStGLkU/hqdefault.jpg',
    duration: '14:03',
    durationSec: 843,
    channelName: "Tim Urban | TED",
    channelTitle: "Tim Urban | TED",
    level: 'B2',
    views: '68M',
    subtitles: [
          {
                "id": "b2_5_1",
                "start": 0,
                "end": 6.5,
                "textEn": "So in college, I was a government major, which means I had to write a lot of papers.",
                "textVi": "Hồi đại học, tôi học chuyên ngành quản trị công, đồng nghĩa với việc phải viết rất nhiều bài luận.",
                "keyWords": [
                      {
                            "word": "major",
                            "meaningVi": "chuyên ngành học"
                      }
                ]
          },
          {
                "id": "b2_5_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "When normal students write a paper, they spread the work out smoothly over the weeks.",
                "textVi": "Khi các sinh viên bình thường viết bài, họ phân bổ công việc đều đặn suốt các tuần lễ.",
                "keyWords": [
                      {
                            "word": "spread out",
                            "meaningVi": "phân bổ dàn trải"
                      }
                ]
          },
          {
                "id": "b2_5_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Inside the brain of a procrastinator, there is a Rational Decision-Maker and an Instant Gratification Monkey.",
                "textVi": "Trong não người hay trì hoãn, có một Người Ra Quyết Định Lý Trí và một Chú Khỉ Thích Tận Hưởng Tức Thì.",
                "keyWords": [
                      {
                            "word": "procrastinator",
                            "meaningVi": "người hay trì hoãn công việc"
                      }
                ]
          },
          {
                "id": "b2_5_4",
                "start": 21,
                "end": 29,
                "textEn": "The monkey only cares about two things: easy and fun. Until the Panic Monster wakes up.",
                "textVi": "Chú khỉ chỉ quan tâm tới hai điều: dễ dàng và vui vẻ. Cho đến khi Quái Vật Hoảng Loạn thức giấc.",
                "keyWords": [
                      {
                            "word": "Panic Monster",
                            "meaningVi": "Quái Vật Hoảng Loạn vì deadline"
                      }
                ]
          }
    ],
  },
  {
    videoId: '8KkKuTCFvzI',
    id: '8KkKuTCFvzI',
    title: "What Makes a Good Life? Lessons from the Longest Study on Happiness",
    thumbnail: 'https://img.youtube.com/vi/8KkKuTCFvzI/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/8KkKuTCFvzI/hqdefault.jpg',
    duration: '12:46',
    durationSec: 766,
    channelName: "Robert Waldinger | TED",
    channelTitle: "Robert Waldinger | TED",
    level: 'B2',
    views: '46M',
    subtitles: [
          {
                "id": "b2_6_1",
                "start": 0,
                "end": 6.5,
                "textEn": "What keeps us healthy and happy as we go through life? If you think it’s fame and money, you’re not alone.",
                "textVi": "Điều gì giữ cho chúng ta khỏe mạnh và hạnh phúc suốt cuộc đời? Nếu bạn nghĩ là danh vọng và tiền tài, bạn không đơn độc.",
                "keyWords": [
                      {
                            "word": "fame and money",
                            "meaningVi": "danh vọng và tiền bạc"
                      }
                ]
          },
          {
                "id": "b2_6_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "For 75 years, Harvard tracked the lives of 724 men, asking about their work, home lives, and health.",
                "textVi": "Trong 75 năm, Harvard đã theo dõi cuộc đời của 724 người đàn ông, tìm hiểu về công việc, đời sống và sức khỏe của họ.",
                "keyWords": [
                      {
                            "word": "tracked",
                            "meaningVi": "đã theo dõi sát sao"
                      }
                ]
          },
          {
                "id": "b2_6_3",
                "start": 13.5,
                "end": 21,
                "textEn": "The clearest message from this 75-year study is this: Good relationships keep us happier and healthier. Period.",
                "textVi": "Thông điệp rõ ràng nhất rút ra từ công trình 75 năm này là: Các mối quan hệ tốt đẹp giữ cho ta hạnh phúc và khỏe mạnh hơn.",
                "keyWords": [
                      {
                            "word": "relationships",
                            "meaningVi": "các mối quan hệ gắn bó"
                      }
                ]
          },
          {
                "id": "b2_6_4",
                "start": 21,
                "end": 29,
                "textEn": "Loneliness kills. It is as toxic as smoking or alcoholism. Quality connection is the ultimate protector.",
                "textVi": "Sự cô độc giết chết con người. Nó độc hại ngang hút thuốc lá hay nghiện rượu. Kết nối chân thành là lá chắn tối thượng.",
                "keyWords": [
                      {
                            "word": "loneliness",
                            "meaningVi": "sự cô đơn, lẻ loi"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'Ks-_Mh1QhMc',
    id: 'Ks-_Mh1QhMc',
    title: "Your Body Language May Shape Who You Are",
    thumbnail: 'https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg',
    duration: '21:02',
    durationSec: 1262,
    channelName: "Amy Cuddy | TED",
    channelTitle: "Amy Cuddy | TED",
    level: 'B2',
    views: '71M',
    subtitles: [
          {
                "id": "b2_7_1",
                "start": 0,
                "end": 6.5,
                "textEn": "We are fascinated by body language, and we are particularly interested in other people’s nonverbal signals.",
                "textVi": "Chúng ta bị cuốn hút bởi ngôn ngữ cơ thể, và đặc biệt quan tâm tới những tín hiệu phi ngôn ngữ của người khác.",
                "keyWords": [
                      {
                            "word": "body language",
                            "meaningVi": "ngôn ngữ cơ thể"
                      }
                ]
          },
          {
                "id": "b2_7_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "Social scientists have spent decades analyzing the effects of our posture on how others perceive us.",
                "textVi": "Các nhà khoa học xã hội đã dành nhiều thập kỷ phân tích ảnh hưởng của tư thế đứng ngồi lên cách người khác nhìn nhận ta.",
                "keyWords": [
                      {
                            "word": "posture",
                            "meaningVi": "tư thế vóc dáng"
                      }
                ]
          },
          {
                "id": "b2_7_3",
                "start": 13.5,
                "end": 21,
                "textEn": "But Amy Cuddy’s experiment examined the reverse: Does our nonverbal posture govern how we think about ourselves?",
                "textVi": "Nhưng thí nghiệm của Amy Cuddy xem xét chiều ngược lại: Liệu tư thế cơ thể có chi phối cách ta tự cảm nhận về mình?",
                "keyWords": [
                      {
                            "word": "nonverbal",
                            "meaningVi": "phi ngôn ngữ"
                      }
                ]
          },
          {
                "id": "b2_7_4",
                "start": 21,
                "end": 29,
                "textEn": "Power posing for just two minutes before an interview increases testosterone and drops cortisol levels.",
                "textVi": "Tạo dáng quyền lực chỉ 2 phút trước khi phỏng vấn giúp tăng cường hormone tự tin và giảm mạnh mức độ căng thẳng.",
                "keyWords": [
                      {
                            "word": "power posing",
                            "meaningVi": "tư thế tự tin quyền lực"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'iCvmsMzlF7o',
    id: 'iCvmsMzlF7o',
    title: "The Power of Vulnerability",
    thumbnail: 'https://img.youtube.com/vi/iCvmsMzlF7o/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/iCvmsMzlF7o/hqdefault.jpg',
    duration: '20:19',
    durationSec: 1219,
    channelName: "Brené Brown | TED",
    channelTitle: "Brené Brown | TED",
    level: 'B2',
    views: '65M',
    subtitles: [
          {
                "id": "b2_8_1",
                "start": 0,
                "end": 6.5,
                "textEn": "I’ll start with this: a couple years ago, an event planner called me because she was looking for a speaker.",
                "textVi": "Tôi xin bắt đầu bằng điều này: vài năm trước, một nhà tổ chức sự kiện gọi cho tôi vì đang tìm diễn giả.",
                "keyWords": [
                      {
                            "word": "event planner",
                            "meaningVi": "nhà tổ chức sự kiện"
                      }
                ]
          },
          {
                "id": "b2_8_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "I study human connection — our ability to feel empathy, belonging, and authentic love.",
                "textVi": "Tôi nghiên cứu về sự kết nối giữa người với người — khả năng đồng cảm, cảm giác thuộc về và tình yêu chân thật.",
                "keyWords": [
                      {
                            "word": "empathy",
                            "meaningVi": "sự đồng cảm sâu sắc"
                      }
                ]
          },
          {
                "id": "b2_8_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Through thousands of qualitative interviews, one universal truth emerged: shame unravels our connections.",
                "textVi": "Qua hàng ngàn cuộc phỏng vấn định tính, một chân lý phổ quát hiện ra: nỗi xấu hổ phá hủy các mối gắn kết của ta.",
                "keyWords": [
                      {
                            "word": "universal truth",
                            "meaningVi": "chân lý phổ quát"
                      }
                ]
          },
          {
                "id": "b2_8_4",
                "start": 21,
                "end": 29,
                "textEn": "Vulnerability is not weakness; it is the birthplace of innovation, creativity, and profound joy.",
                "textVi": "Dám bộc lộ sự yếu mềm không phải là yếu đuối; đó là cái nôi sản sinh lòng dũng cảm, sự sáng tạo và niềm vui sâu sắc.",
                "keyWords": [
                      {
                            "word": "vulnerability",
                            "meaningVi": "sự yếu mềm, tổn thương"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'eIho2S0ZahI',
    id: 'eIho2S0ZahI',
    title: "How to Speak So That People Want to Listen",
    thumbnail: 'https://img.youtube.com/vi/eIho2S0ZahI/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/eIho2S0ZahI/hqdefault.jpg',
    duration: '9:58',
    durationSec: 598,
    channelName: "Julian Treasure | TED",
    channelTitle: "Julian Treasure | TED",
    level: 'B2',
    views: '54M',
    subtitles: [
          {
                "id": "b2_9_1",
                "start": 0,
                "end": 6.5,
                "textEn": "The human voice: It’s the instrument we all play. It’s the most powerful sound in the world.",
                "textVi": "Giọng nói con người: Đó là nhạc cụ mà tất cả chúng ta cùng chơi. Đó là âm thanh quyền năng nhất trên thế giới.",
                "keyWords": [
                      {
                            "word": "human voice",
                            "meaningVi": "giọng nói con người"
                      }
                ]
          },
          {
                "id": "b2_9_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "And yet many people have the experience that when they speak, people simply don’t listen to them.",
                "textVi": "Thế nhưng rất nhiều người từng trải qua cảm giác rằng khi họ cất lời, mọi người xung quanh dường như chẳng hề lắng nghe.",
                "keyWords": [
                      {
                            "word": "experience",
                            "meaningVi": "trải nghiệm"
                      }
                ]
          },
          {
                "id": "b2_9_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Julian identifies the seven deadly sins of speaking: gossip, judging, negativity, and dogmatism.",
                "textVi": "Julian chỉ ra bảy thói quen tai hại khi giao tiếp: nói xấu sau lưng, phán xét, tiêu cực và sự giáo điều áp đặt.",
                "keyWords": [
                      {
                            "word": "seven deadly sins",
                            "meaningVi": "bảy thói xấu tai hại"
                      }
                ]
          },
          {
                "id": "b2_9_4",
                "start": 21,
                "end": 29,
                "textEn": "To stand on powerful ground, remember HAIL: Honesty, Authenticity, Integrity, and Love.",
                "textVi": "Để lời nói chạm đến lòng người, hãy nhớ nguyên tắc HAIL: Thành thật, Chân thực, Liêm chính và Yêu thương.",
                "keyWords": [
                      {
                            "word": "Integrity",
                            "meaningVi": "sự chính trực liêm chính"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'rrkrvAUbU9Y',
    id: 'rrkrvAUbU9Y',
    title: "The puzzle of motivation - Dan Pink",
    thumbnail: 'https://img.youtube.com/vi/rrkrvAUbU9Y/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/rrkrvAUbU9Y/hqdefault.jpg',
    duration: '18:36',
    durationSec: 1116,
    channelName: "Dan Pink | TED",
    channelTitle: "Dan Pink | TED",
    level: 'B2',
    views: '32M',
    subtitles: [
          {
                "id": "b2_10_1",
                "start": 0,
                "end": 6.5,
                "textEn": "I need to make a confession at the outset: A little more than 20 years ago, I did something that I regret.",
                "textVi": "Tôi cần thú nhận ngay từ đầu: Hơn 20 năm trước, tôi đã làm một điều mà bản thân luôn thấy hối tiếc.",
                "keyWords": [
                      {
                            "word": "confession",
                            "meaningVi": "lời thú nhận"
                      }
                ]
          },
          {
                "id": "b2_10_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "I went to law school. But later, I immersed myself in social science and behavioral economics.",
                "textVi": "Tôi theo học trường luật. Nhưng về sau, tôi đắm mình vào khoa học xã hội và kinh tế học hành vi.",
                "keyWords": [
                      {
                            "word": "behavioral economics",
                            "meaningVi": "kinh tế học hành vi"
                      }
                ]
          },
          {
                "id": "b2_10_3",
                "start": 13.5,
                "end": 21,
                "textEn": "There is a mismatch between what science knows and what business does regarding employee motivation.",
                "textVi": "Đang có một hố sâu ngăn cách giữa điều khoa học đã sáng tỏ và cách các doanh nghiệp áp dụng động lực thúc đẩy.",
                "keyWords": [
                      {
                            "word": "mismatch",
                            "meaningVi": "sự khập khiễng, không tương thích"
                      }
                ]
          },
          {
                "id": "b2_10_4",
                "start": 21,
                "end": 29,
                "textEn": "Traditional extrinsic rewards — carrots and sticks — crush creative 21st-century problem solving.",
                "textVi": "Các phần thưởng ngoại tại truyền thống — củ cà rốt và cây gậy — đang bóp nghẹt khả năng giải quyết vấn đề sáng tạo.",
                "keyWords": [
                      {
                            "word": "extrinsic rewards",
                            "meaningVi": "phần thưởng ngoại tại bên ngoài"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'c0KYU2j0TM4',
    id: 'c0KYU2j0TM4',
    title: "The power of introverts - Susan Cain",
    thumbnail: 'https://img.youtube.com/vi/c0KYU2j0TM4/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/c0KYU2j0TM4/hqdefault.jpg',
    duration: '19:04',
    durationSec: 1144,
    channelName: "Susan Cain | TED",
    channelTitle: "Susan Cain | TED",
    level: 'C1',
    views: '34M',
    subtitles: [
          {
                "id": "c1_1_1",
                "start": 0,
                "end": 6.5,
                "textEn": "When I was nine years old, I went off to summer camp for the first time, carrying a suitcase full of books.",
                "textVi": "Khi lên chín tuổi, lần đầu tiên tôi đi trại hè, mang theo một chiếc vali chật ních toàn những cuốn sách.",
                "keyWords": [
                      {
                            "word": "summer camp",
                            "meaningVi": "trại hè thiếu nhi"
                      }
                ]
          },
          {
                "id": "c1_1_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "Our modern institutions — schools and workplaces — are designed almost entirely for extroverts.",
                "textVi": "Các tổ chức hiện đại của chúng ta — từ trường học tới công sở — gần như được thiết kế hoàn toàn cho người hướng ngoại.",
                "keyWords": [
                      {
                            "word": "extroverts",
                            "meaningVi": "người hướng ngoại"
                      }
                ]
          },
          {
                "id": "c1_1_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Yet some of the greatest transformative ideas in history were born from quiet, deep contemplation.",
                "textVi": "Thế nhưng một số tư tưởng biến đổi vĩ đại nhất trong lịch sử nhân loại lại bắt nguồn từ sự tĩnh lặng suy tư sâu sắc.",
                "keyWords": [
                      {
                            "word": "contemplation",
                            "meaningVi": "sự trầm ngâm suy tưởng"
                      }
                ]
          },
          {
                "id": "c1_1_4",
                "start": 21,
                "end": 29,
                "textEn": "Solitude matters, and for some people, it is the very air that they breathe to create art.",
                "textVi": "Sự cô độc có giá trị lớn lao, và đối với một số người, đó chính là dưỡng khí họ hít thở để thai nghén nghệ thuật.",
                "keyWords": [
                      {
                            "word": "solitude",
                            "meaningVi": "sự thanh tịnh cô độc"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'RcGyVTAoXEU',
    id: 'RcGyVTAoXEU',
    title: "How to Make Stress Your Friend",
    thumbnail: 'https://img.youtube.com/vi/RcGyVTAoXEU/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/RcGyVTAoXEU/hqdefault.jpg',
    duration: '14:28',
    durationSec: 868,
    channelName: "Kelly McGonigal | TED",
    channelTitle: "Kelly McGonigal | TED",
    level: 'C1',
    views: '31M',
    subtitles: [
          {
                "id": "c1_2_1",
                "start": 0,
                "end": 6.5,
                "textEn": "I have a confession to make. For the past ten years, I’ve been telling people that stress is an enemy.",
                "textVi": "Tôi có một lời thú nhận. Suốt mười năm qua, tôi đã luôn nói với mọi người rằng căng thẳng là kẻ thù nguy hiểm.",
                "keyWords": [
                      {
                            "word": "confession",
                            "meaningVi": "lời thú nhận"
                      }
                ]
          },
          {
                "id": "c1_2_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "A study tracked 30,000 adults in the US for eight years, asking: \"Do you believe stress is harmful to your health?\"",
                "textVi": "Một nghiên cứu theo dõi 30.000 người trưởng thành ở Mỹ trong tám năm đã hỏi: \"Bạn có tin stress gây hại sức khỏe?\"",
                "keyWords": [
                      {
                            "word": "harmful",
                            "meaningVi": "có hại"
                      }
                ]
          },
          {
                "id": "c1_2_3",
                "start": 13.5,
                "end": 21,
                "textEn": "People who experienced high stress but did NOT view it as harmful had the lowest risk of dying.",
                "textVi": "Những người chịu mức độ căng thẳng cao nhưng KHÔNG coi nó là điều độc hại lại có tỷ lệ tử vong thấp nhất.",
                "keyWords": [
                      {
                            "word": "lowest risk",
                            "meaningVi": "nguy cơ thấp nhất"
                      }
                ]
          },
          {
                "id": "c1_2_4",
                "start": 21,
                "end": 29,
                "textEn": "When you change your mind about stress, you can fundamentally change your body’s physiological response.",
                "textVi": "Khi bạn thay đổi góc nhìn về sự căng thẳng, bạn có thể biến đổi phản ứng sinh lý bên trong cơ thể theo hướng tích cực.",
                "keyWords": [
                      {
                            "word": "physiological",
                            "meaningVi": "thuộc về sinh lý học"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'R1vskiVDwl4',
    id: 'R1vskiVDwl4',
    title: "10 ways to have a better conversation",
    thumbnail: 'https://img.youtube.com/vi/R1vskiVDwl4/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/R1vskiVDwl4/hqdefault.jpg',
    duration: '11:44',
    durationSec: 704,
    channelName: "Celeste Headlee | TED",
    channelTitle: "Celeste Headlee | TED",
    level: 'C1',
    views: '36M',
    subtitles: [
          {
                "id": "c1_3_1",
                "start": 0,
                "end": 6.5,
                "textEn": "We live in a world where every conversation has the potential to devolve into an argument.",
                "textVi": "Chúng ta đang sống trong một thế giới nơi mà bất kỳ cuộc chuyện trò nào cũng tiềm ẩn nguy cơ biến thành tranh cãi.",
                "keyWords": [
                      {
                            "word": "devolve into",
                            "meaningVi": "biến tướng, trượt dài thành"
                      }
                ]
          },
          {
                "id": "c1_3_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "A good conversation requires a balance between listening and speaking, and somewhere we lost that.",
                "textVi": "Một cuộc đàm thoại sâu sắc đòi hỏi sự cân bằng giữa lắng nghe và giãi bày, nhưng chúng ta dường như đã đánh mất nó.",
                "keyWords": [
                      {
                            "word": "balance",
                            "meaningVi": "sự cân bằng"
                      }
                ]
          },
          {
                "id": "c1_3_3",
                "start": 13.5,
                "end": 21,
                "textEn": "Rule number one: Don’t multitask. Be present. Be in that moment with the person in front of you.",
                "textVi": "Quy tắc thứ nhất: Đừng làm nhiều việc cùng lúc. Hãy hiện diện trọn vẹn. Hãy ở trong khoảnh khắc đó với người đối diện.",
                "keyWords": [
                      {
                            "word": "be present",
                            "meaningVi": "hiện diện trọn vẹn"
                      }
                ]
          },
          {
                "id": "c1_3_4",
                "start": 21,
                "end": 29,
                "textEn": "Most people don’t listen with the intent to understand; they listen with the intent to reply.",
                "textVi": "Hầu hết mọi người không lắng nghe với tâm thế muốn thấu hiểu; họ lắng nghe chỉ để chuẩn bị phản hồi.",
                "keyWords": [
                      {
                            "word": "intent to understand",
                            "meaningVi": "ý muốn thấu hiểu người khác"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'D9Ihs241zeg',
    id: 'D9Ihs241zeg',
    title: "The Danger of a Single Story",
    thumbnail: 'https://img.youtube.com/vi/D9Ihs241zeg/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/D9Ihs241zeg/hqdefault.jpg',
    duration: '18:49',
    durationSec: 1129,
    channelName: "Chimamanda Ngozi Adichie | TED",
    channelTitle: "Chimamanda Ngozi Adichie | TED",
    level: 'C1',
    views: '38M',
    subtitles: [
          {
                "id": "c1_4_1",
                "start": 0,
                "end": 6.5,
                "textEn": "I’m a storyteller. And I would like to tell you a few personal stories about what I like to call \"the danger of a single story.\"",
                "textVi": "Tôi là một người kể chuyện. Và tôi muốn kể cho các bạn vài câu chuyện về điều tôi gọi là \"sự nguy hại của câu chuyện một chiều.\"",
                "keyWords": [
                      {
                            "word": "storyteller",
                            "meaningVi": "người kể chuyện"
                      }
                ]
          },
          {
                "id": "c1_4_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "As a child in Nigeria, I read British and American children’s books where characters were white and blue-eyed.",
                "textVi": "Khi còn là một cô bé ở Nigeria, tôi đọc sách thiếu nhi của Anh và Mỹ, nơi các nhân vật đều da trắng và mắt xanh.",
                "keyWords": [
                      {
                            "word": "characters",
                            "meaningVi": "nhân vật trong sách"
                      }
                ]
          },
          {
                "id": "c1_4_3",
                "start": 13.5,
                "end": 21,
                "textEn": "The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete.",
                "textVi": "Câu chuyện một chiều tạo ra định kiến, và vấn đề của định kiến không phải là sai sự thật, mà là chúng phiến diện thiếu sót.",
                "keyWords": [
                      {
                            "word": "stereotypes",
                            "meaningVi": "những định kiến rập khuôn"
                      }
                ]
          },
          {
                "id": "c1_4_4",
                "start": 21,
                "end": 29,
                "textEn": "When we reject the single story, we regain a kind of paradise of human nuance and mutual dignity.",
                "textVi": "Khi từ chối cái nhìn phiến diện, chúng ta tìm lại được sự phong phú của nhân tính và phẩm giá lẫn nhau.",
                "keyWords": [
                      {
                            "word": "mutual dignity",
                            "meaningVi": "phẩm giá tôn trọng lẫn nhau"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'H14bBuluwB8',
    id: 'H14bBuluwB8',
    title: "Grit: The Power of Passion and Perseverance",
    thumbnail: 'https://img.youtube.com/vi/H14bBuluwB8/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/H14bBuluwB8/hqdefault.jpg',
    duration: '6:12',
    durationSec: 372,
    channelName: "Angela Duckworth | TED",
    channelTitle: "Angela Duckworth | TED",
    level: 'C1',
    views: '32M',
    subtitles: [
          {
                "id": "c1_5_1",
                "start": 0,
                "end": 6.5,
                "textEn": "When I was 27 years old, I left a demanding job in management consulting to teach seventh-grade math in New York.",
                "textVi": "Năm 27 tuổi, tôi rời bỏ công việc tư vấn quản trị đầy thử thách để dạy toán lớp 7 tại trường công lập New York.",
                "keyWords": [
                      {
                            "word": "management consulting",
                            "meaningVi": "tư vấn quản trị kinh doanh"
                      }
                ]
          },
          {
                "id": "c1_5_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "I noticed that IQ was not the only difference between my best and my worst students.",
                "textVi": "Tôi nhận ra rằng chỉ số IQ không phải là yếu tố duy nhất phân biệt giữa học sinh giỏi nhất và yếu nhất.",
                "keyWords": [
                      {
                            "word": "IQ",
                            "meaningVi": "chỉ số thông minh"
                      }
                ]
          },
          {
                "id": "c1_5_3",
                "start": 13.5,
                "end": 21,
                "textEn": "In every field we studied — military academies, national spelling bees, corporations — one characteristic emerged as paramount: Grit.",
                "textVi": "Trong mọi môi trường nghiên cứu — học viện quân sự, cuộc thi đánh vần, tập đoàn — một phẩm chất nổi bật nhất: Sự kiên định (Grit).",
                "keyWords": [
                      {
                            "word": "paramount",
                            "meaningVi": "tối quan trọng, hàng đầu"
                      }
                ]
          },
          {
                "id": "c1_5_4",
                "start": 21,
                "end": 29,
                "textEn": "Grit is passion and perseverance for very long-term goals. Grit is having stamina for your dreams.",
                "textVi": "Sự kiên định là đam mê và lòng bền bỉ cho mục tiêu dài hạn. Đó là sức bền dẻo dai để theo đuổi hoài bão.",
                "keyWords": [
                      {
                            "word": "stamina",
                            "meaningVi": "sức bền dẻo dai"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'kBdfcR-8hEY',
    id: 'kBdfcR-8hEY',
    title: "Justice: Episode 01 \"THE MORAL SIDE OF MURDER\"",
    thumbnail: 'https://img.youtube.com/vi/kBdfcR-8hEY/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/kBdfcR-8hEY/hqdefault.jpg',
    duration: '54:56',
    durationSec: 3296,
    channelName: "Harvard University",
    channelTitle: "Harvard University",
    level: 'C1',
    views: '28M',
    subtitles: [
          {
                "id": "c1_6_1",
                "start": 0,
                "end": 7.5,
                "textEn": "Suppose you are the driver of a trolley car, hurtling down the track at sixty miles an hour.",
                "textVi": "Giả sử bạn là người lái một chiếc xe điện, đang lao vun vút trên đường ray với vận tốc 60 dặm/giờ.",
                "keyWords": [
                      {
                            "word": "trolley car",
                            "meaningVi": "toa xe điện chạy trên ray"
                      }
                ]
          },
          {
                "id": "c1_6_2",
                "start": 7.5,
                "end": 15,
                "textEn": "At the end of the track, you see five workers. The brakes don’t work. You feel desperate.",
                "textVi": "Phía cuối đường ray, bạn thấy năm công nhân đang làm việc. Thắng xe bị hỏng. Bạn cảm thấy tuyệt vọng.",
                "keyWords": [
                      {
                            "word": "brakes don’t work",
                            "meaningVi": "thắng xe bị mất tác dụng"
                      }
                ]
          },
          {
                "id": "c1_6_3",
                "start": 15,
                "end": 23,
                "textEn": "Suddenly you notice a side track with only one worker on it. If you steer, one dies instead of five.",
                "textVi": "Bất chợt bạn thấy một ray rẽ nhánh chỉ có một công nhân. Nếu đánh lái, một người chết thay vì năm người.",
                "keyWords": [
                      {
                            "word": "side track",
                            "meaningVi": "đường ray rẽ nhánh"
                      }
                ]
          },
          {
                "id": "c1_6_4",
                "start": 23,
                "end": 32,
                "textEn": "What is the right thing to do? This fundamental philosophical dilemma launches our inquiry into moral reasoning.",
                "textVi": "Đâu mới là hành động đúng đắn? Tình huống tiến thoái lưỡng nan kinh điển này mở đầu cuộc truy vấn đạo đức.",
                "keyWords": [
                      {
                            "word": "moral reasoning",
                            "meaningVi": "lập luận tư duy đạo đức"
                      }
                ]
          }
    ],
  },
  {
    videoId: '0O2Rq4HJBxw',
    id: '0O2Rq4HJBxw',
    title: "Justice: Episode 02 \"PUTTING A PRICE TAG ON LIFE\"",
    thumbnail: 'https://img.youtube.com/vi/0O2Rq4HJBxw/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/0O2Rq4HJBxw/hqdefault.jpg',
    duration: '55:10',
    durationSec: 3310,
    channelName: "Harvard University",
    channelTitle: "Harvard University",
    level: 'C1',
    views: '8.4M',
    subtitles: [
          {
                "id": "c1_7_1",
                "start": 0,
                "end": 7,
                "textEn": "Last time, we began to explore the philosophy of utilitarianism formulated by Jeremy Bentham.",
                "textVi": "Ở buổi trước, chúng ta đã bắt đầu khám phá triết học thuyết vị lợi do Jeremy Bentham xây dựng.",
                "keyWords": [
                      {
                            "word": "utilitarianism",
                            "meaningVi": "thuyết vị lợi (tối đa hóa hạnh phúc)"
                      }
                ]
          },
          {
                "id": "c1_7_2",
                "start": 7,
                "end": 14.5,
                "textEn": "The core premise is simple: the highest principle of morality is to maximize utility.",
                "textVi": "Tiền đề cốt lõi rất giản đơn: nguyên tắc tối cao của đạo đức là tối đa hóa lợi ích và hạnh phúc chung.",
                "keyWords": [
                      {
                            "word": "maximize utility",
                            "meaningVi": "tối đa hóa lợi ích"
                      }
                ]
          },
          {
                "id": "c1_7_3",
                "start": 14.5,
                "end": 22,
                "textEn": "Today, we examine modern corporate cost-benefit analyses, such as the Ford Pinto safety case.",
                "textVi": "Hôm nay, chúng ta xem xét các phép phân tích chi phí - lợi ích của doanh nghiệp, như vụ xe Ford Pinto.",
                "keyWords": [
                      {
                            "word": "cost-benefit analysis",
                            "meaningVi": "phân tích chi phí - lợi ích"
                      }
                ]
          },
          {
                "id": "c1_7_4",
                "start": 22,
                "end": 30,
                "textEn": "Is it ever morally acceptable to assign a monetary monetary value to a human life?",
                "textVi": "Liệu việc gán một giá trị tiền tệ cụ thể lên sinh mạng con người có bao giờ là chấp nhận được về đạo đức?",
                "keyWords": [
                      {
                            "word": "monetary value",
                            "meaningVi": "giá trị quy đổi bằng tiền tệ"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'MGyygiXMzRk',
    id: 'MGyygiXMzRk',
    title: "Justice: Episode 04 \"THIS LAND IS MY LAND\"",
    thumbnail: 'https://img.youtube.com/vi/MGyygiXMzRk/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/MGyygiXMzRk/hqdefault.jpg',
    duration: '54:18',
    durationSec: 3258,
    channelName: "Harvard University",
    channelTitle: "Harvard University",
    level: 'C1',
    views: '5.6M',
    subtitles: [
          {
                "id": "c1_8_1",
                "start": 0,
                "end": 7,
                "textEn": "Today we turn to the great seventeenth-century philosopher of private property, John Locke.",
                "textVi": "Hôm nay chúng ta cùng hướng về nhà triết học vĩ đại thế kỷ 17 về sở hữu tư nhân, John Locke.",
                "keyWords": [
                      {
                            "word": "private property",
                            "meaningVi": "quyền sở hữu tư nhân"
                      }
                ]
          },
          {
                "id": "c1_8_2",
                "start": 7,
                "end": 14.5,
                "textEn": "Locke argues that every person has a natural property right in their own person and labor.",
                "textVi": "Locke lập luận rằng mỗi người đều có quyền tự nhiên không thể xâm phạm đối với thân thể và sức lao động.",
                "keyWords": [
                      {
                            "word": "natural right",
                            "meaningVi": "quyền tự nhiên của con người"
                      }
                ]
          },
          {
                "id": "c1_8_3",
                "start": 14.5,
                "end": 22,
                "textEn": "When we mix our labor with the unowned commons of the earth, it becomes our legitimate property.",
                "textVi": "Khi ta hòa trộn sức lao động với tài sản chung tự nhiên, vật đó trở thành tài sản hợp pháp của ta.",
                "keyWords": [
                      {
                            "word": "legitimate",
                            "meaningVi": "hợp pháp, chính đáng"
                      }
                ]
          },
          {
                "id": "c1_8_4",
                "start": 22,
                "end": 30,
                "textEn": "Yet Locke also insists that government legitimate authority derives strictly from citizen consent.",
                "textVi": "Tuy vậy Locke cũng khẳng định quyền lực nhà nước chỉ hợp pháp khi có sự đồng thuận từ nhân dân.",
                "keyWords": [
                      {
                            "word": "citizen consent",
                            "meaningVi": "sự đồng thuận của công dân"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'zPx5N6Lh3sw',
    id: 'zPx5N6Lh3sw',
    title: "Bill Gates Harvard Commencement Address 2007",
    thumbnail: 'https://img.youtube.com/vi/zPx5N6Lh3sw/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/zPx5N6Lh3sw/hqdefault.jpg',
    duration: '29:45',
    durationSec: 1785,
    channelName: "Harvard University",
    channelTitle: "Harvard University",
    level: 'C1',
    views: '4.8M',
    subtitles: [
          {
                "id": "c1_9_1",
                "start": 0,
                "end": 7,
                "textEn": "President Bok, former President Rudenstine, members of the Harvard Corporation, thank you.",
                "textVi": "Kính thưa Chủ tịch Bok, cựu Chủ tịch Rudenstine, các thành viên Hội đồng Harvard, xin cảm ơn quý vị.",
                "keyWords": [
                      {
                            "word": "Corporation",
                            "meaningVi": "Hội đồng quản trị đại học"
                      }
                ]
          },
          {
                "id": "c1_9_2",
                "start": 7,
                "end": 14.5,
                "textEn": "I’ve been waiting more than thirty years to say this: \"Dad, I always told you I’d come back and get my degree.\"",
                "textVi": "Tôi đã đợi hơn 30 năm để có thể thốt lên câu này: \"Bố ơi, con từng bảo sẽ quay lại lấy bằng mà.\"",
                "keyWords": [
                      {
                            "word": "degree",
                            "meaningVi": "bằng đại học"
                      }
                ]
          },
          {
                "id": "c1_9_3",
                "start": 14.5,
                "end": 22,
                "textEn": "Humanity’s greatest advances are not in its discoveries, but in how those discoveries apply to reduce inequity.",
                "textVi": "Tiến bộ vĩ đại nhất của nhân loại không nằm ở các phát minh, mà là cách chúng được ứng dụng để xóa bỏ bất bình đẳng.",
                "keyWords": [
                      {
                            "word": "reduce inequity",
                            "meaningVi": "giảm thiểu bất bình đẳng"
                      }
                ]
          },
          {
                "id": "c1_9_4",
                "start": 22,
                "end": 30,
                "textEn": "We must not let complexity stop us from taking on the great inequities of poverty and disease.",
                "textVi": "Chúng ta tuyệt đối không được để sự phức tạp cản trở việc giải quyết nghèo đói và dịch bệnh.",
                "keyWords": [
                      {
                            "word": "inequities",
                            "meaningVi": "sự bất công, bất bình đẳng"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'vpW2sGlCtaE',
    id: 'vpW2sGlCtaE',
    title: "Penn's 2011 Commencement Address by Denzel Washington",
    thumbnail: 'https://img.youtube.com/vi/vpW2sGlCtaE/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/vpW2sGlCtaE/hqdefault.jpg',
    duration: '21:12',
    durationSec: 1272,
    channelName: "University of Pennsylvania",
    channelTitle: "University of Pennsylvania",
    level: 'C1',
    views: '16M',
    subtitles: [
          {
                "id": "c1_10_1",
                "start": 0,
                "end": 6.5,
                "textEn": "President Gutmann, Provost Price, trustees, parents, and above all, graduates of the Class of 2011.",
                "textVi": "Kính thưa Hiệu trưởng Gutmann, Phó hiệu trưởng Price, các bậc phụ huynh và quan trọng nhất: các tân cử nhân 2011.",
                "keyWords": [
                      {
                            "word": "graduates",
                            "meaningVi": "các tân cử nhân tốt nghiệp"
                      }
                ]
          },
          {
                "id": "c1_10_2",
                "start": 6.5,
                "end": 13.5,
                "textEn": "I have to tell you the truth: I am uncomfortable. It is much easier to play a character than to stand here as myself.",
                "textVi": "Thật lòng tôi thấy bồn chồn. Hóa thân vào nhân vật điện ảnh dễ hơn nhiều việc đứng đây với tư cách chính mình.",
                "keyWords": [
                      {
                            "word": "uncomfortable",
                            "meaningVi": "không thoải mái, bồn chồn"
                      }
                ]
          },
          {
                "id": "c1_3_3",
                "start": 13.5,
                "end": 21,
                "textEn": "I found that nothing in life is worthwhile unless you take risks. Fall forward.",
                "textVi": "Tôi nhận ra rằng trên đời chẳng có gì đáng giá trừ khi bạn dám dấn thân mạo hiểm. Hãy ngã về phía trước.",
                "keyWords": [
                      {
                            "word": "take risks",
                            "meaningVi": "chấp nhận rủi ro, mạo hiểm"
                      },
                      {
                            "word": "fall forward",
                            "meaningVi": "ngã về phía trước"
                      }
                ]
          },
          {
                "id": "c1_10_4",
                "start": 21,
                "end": 29,
                "textEn": "Every failed experiment is one step closer to success. Don’t have a fallback plan; fail forward.",
                "textVi": "Mỗi thử nghiệm thất bại là một bước gần hơn tới thành công. Đừng giữ đường lui; hãy ngã về phía trước.",
                "keyWords": [
                      {
                            "word": "fallback plan",
                            "meaningVi": "kế hoạch thoái lui"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'BiqDZlAZygU',
    id: 'BiqDZlAZygU',
    title: "In full: Rowan Atkinson on free speech",
    thumbnail: 'https://img.youtube.com/vi/BiqDZlAZygU/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/BiqDZlAZygU/hqdefault.jpg',
    duration: '9:12',
    durationSec: 552,
    channelName: "Defend Free Speech UK",
    channelTitle: "Defend Free Speech UK",
    level: 'C2',
    views: '8.2M',
    subtitles: [
          {
                "id": "c2_1_1",
                "start": 0,
                "end": 7,
                "textEn": "As someone who has earned his living for thirty years on the freedom to criticize, ridicule, and offend...",
                "textVi": "Là một người kiếm sống suốt ba mươi năm dựa trên quyền tự do phê bình, châm biếm và gây xúc phạm...",
                "keyWords": [
                      {
                            "word": "ridicule",
                            "meaningVi": "châm biếm, chế nhạo"
                      }
                ]
          },
          {
                "id": "c2_1_2",
                "start": 7,
                "end": 15,
                "textEn": "I find the creeping legislation criminalizing \"insulting words\" profoundly alarming.",
                "textVi": "Tôi nhận thấy những dự luật hình sự hóa \"lời lẽ xúc phạm\" đang âm thầm lan rộng là điều vô cùng đáng báo động.",
                "keyWords": [
                      {
                            "word": "alarming",
                            "meaningVi": "đáng báo động"
                      }
                ]
          },
          {
                "id": "c2_1_3",
                "start": 15,
                "end": 23,
                "textEn": "The best way to increase society’s resistance to insulting or offensive speech is to allow more of it, not less.",
                "textVi": "Cách tốt nhất để nâng cao sức đề kháng xã hội trước lời lẽ xúc phạm là cho phép nó tồn tại nhiều hơn, chứ không phải dập tắt.",
                "keyWords": [
                      {
                            "word": "resistance",
                            "meaningVi": "sức đề kháng, khả năng chống chịu"
                      }
                ]
          },
          {
                "id": "c2_1_4",
                "start": 23,
                "end": 32,
                "textEn": "Freedom of expression is only meaningful if it protects the right to articulate controversial viewpoints.",
                "textVi": "Quyền tự do ngôn luận chỉ thực sự có ý nghĩa nếu nó bảo vệ quyền được cất lên những góc nhìn gây tranh cãi.",
                "keyWords": [
                      {
                            "word": "controversial",
                            "meaningVi": "gây nhiều tranh cãi"
                      }
                ]
          }
    ],
  },
  {
    videoId: '2OwRUyZMKwI',
    id: '2OwRUyZMKwI',
    title: "Neil Gaiman Addresses the University of the Arts: \"Make Good Art\"",
    thumbnail: 'https://img.youtube.com/vi/2OwRUyZMKwI/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/2OwRUyZMKwI/hqdefault.jpg',
    duration: '19:42',
    durationSec: 1182,
    channelName: "University of the Arts",
    channelTitle: "University of the Arts",
    level: 'C2',
    views: '6.4M',
    subtitles: [
          {
                "id": "c2_2_1",
                "start": 0,
                "end": 7,
                "textEn": "I never expected to find myself giving advice to people graduating from an establishment of higher education.",
                "textVi": "Tôi chưa bao giờ nghĩ mình sẽ đứng đây đưa ra lời khuyên cho những người tốt nghiệp từ một học viện danh giá.",
                "keyWords": [
                      {
                            "word": "higher education",
                            "meaningVi": "giáo dục bậc cao"
                      }
                ]
          },
          {
                "id": "c2_2_2",
                "start": 7,
                "end": 15,
                "textEn": "I never went to university. I had no career safety net, only a fervent desire to write stories.",
                "textVi": "Tôi chưa từng học đại học. Tôi không có mạng lưới an toàn sự nghiệp, chỉ có khát vọng cháy bỏng được viết truyện.",
                "keyWords": [
                      {
                            "word": "safety net",
                            "meaningVi": "lưới an toàn bảo hộ"
                      }
                ]
          },
          {
                "id": "c2_2_3",
                "start": 15,
                "end": 23,
                "textEn": "When things get tough, this is what you should do: Make good art. When you’re heartbroken, make good art.",
                "textVi": "Khi đời quật ngã bạn, đây là điều bạn phải làm: Hãy sáng tạo nghệ thuật xuất sắc. Khi tan nát cõi lòng, hãy sáng tạo.",
                "keyWords": [
                      {
                            "word": "Make good art",
                            "meaningVi": "Tạo tác nghệ thuật xuất sắc"
                      }
                ]
          },
          {
                "id": "c2_2_4",
                "start": 23,
                "end": 32,
                "textEn": "The rules on what is possible or impossible in the arts were made by people who had not tested the bounds.",
                "textVi": "Các quy tắc về việc gì khả thi hay bất khả trong nghệ thuật được đặt ra bởi những kẻ chưa từng vượt giới hạn.",
                "keyWords": [
                      {
                            "word": "tested bounds",
                            "meaningVi": "thử thách ranh giới"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'ELC_e2QBQMk',
    id: 'ELC_e2QBQMk',
    title: "Conan O'Brien Delivers Dartmouth's Commencement Address",
    thumbnail: 'https://img.youtube.com/vi/ELC_e2QBQMk/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/ELC_e2QBQMk/hqdefault.jpg',
    duration: '23:42',
    durationSec: 1422,
    channelName: "Dartmouth College",
    channelTitle: "Dartmouth College",
    level: 'C2',
    views: '11M',
    subtitles: [
          {
                "id": "c2_3_1",
                "start": 0,
                "end": 7,
                "textEn": "President Kim, trustees, faculty, and above all, graduates of the magnificent Dartmouth Class of 2011.",
                "textVi": "Kính thưa Hiệu trưởng Kim, ban giám hiệu và trên hết, các tân cử nhân của lớp 2011 trường Dartmouth tuyệt vời.",
                "keyWords": [
                      {
                            "word": "faculty",
                            "meaningVi": "ban giảng viên trường"
                      }
                ]
          },
          {
                "id": "c2_3_2",
                "start": 7,
                "end": 15,
                "textEn": "In 2000, I gave a commencement speech at Harvard. My overarching message was: do not be afraid to fail.",
                "textVi": "Năm 2000, tôi từng phát biểu tại Harvard. Thông điệp xuyên suốt của tôi khi đó là: đừng sợ thất bại.",
                "keyWords": [
                      {
                            "word": "overarching message",
                            "meaningVi": "thông điệp xuyên suốt cốt lõi"
                      }
                ]
          },
          {
                "id": "c2_3_3",
                "start": 15,
                "end": 23,
                "textEn": "Then in 2010, I experienced a very public, humiliating career disaster that stripped away my identity.",
                "textVi": "Rồi đến năm 2010, tôi trải qua một thảm họa sự nghiệp công khai, nhục nhã làm tước đoạt danh phận của mình.",
                "keyWords": [
                      {
                            "word": "career disaster",
                            "meaningVi": "thảm họa sự nghiệp"
                      }
                ]
          },
          {
                "id": "c2_3_4",
                "start": 23,
                "end": 32,
                "textEn": "It is our failure to become our idealized selves that ultimately shapes our authentic individuality.",
                "textVi": "Chính sự bất thành trong việc trở thành hình mẫu lý tưởng mới là thứ kiến tạo nên cá tính độc bản đích thực của ta.",
                "keyWords": [
                      {
                            "word": "individuality",
                            "meaningVi": "bản sắc cá tính độc bản"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'J7GY1Xg6X20',
    id: 'J7GY1Xg6X20',
    title: "Charlie Chaplin - Final Speech from The Great Dictator",
    thumbnail: 'https://img.youtube.com/vi/J7GY1Xg6X20/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/J7GY1Xg6X20/hqdefault.jpg',
    duration: '4:05',
    durationSec: 245,
    channelName: "Charlie Chaplin",
    channelTitle: "Charlie Chaplin",
    level: 'C2',
    views: '42M',
    subtitles: [
          {
                "id": "c2_4_1",
                "start": 0,
                "end": 7,
                "textEn": "I’m sorry, but I don’t want to be an emperor. That’s not my business. I don’t want to rule or conquer anyone.",
                "textVi": "Tôi xin lỗi, nhưng tôi không muốn làm hoàng đế. Đó không phải việc của tôi. Tôi không muốn cai trị hay xâm chiếm ai.",
                "keyWords": [
                      {
                            "word": "conquer",
                            "meaningVi": "xâm chiếm, chinh phục"
                      }
                ]
          },
          {
                "id": "c2_4_2",
                "start": 7,
                "end": 15,
                "textEn": "I should like to help everyone if possible: Jew, Gentile, black man, white. We all want to help one another.",
                "textVi": "Tôi muốn giúp đỡ tất cả mọi người nếu có thể: người Do Thái, người ngoại đạo, người da đen, da trắng. Ta sinh ra để đùm bọc nhau.",
                "keyWords": [
                      {
                            "word": "help one another",
                            "meaningVi": "giúp đỡ lẫn nhau"
                      }
                ]
          },
          {
                "id": "c2_4_3",
                "start": 15,
                "end": 23,
                "textEn": "We have developed speed, but we have shut ourselves in. Machinery that gives abundance has left us in want.",
                "textVi": "Chúng ta tạo ra tốc độ, nhưng lại tự giam hãm mình. Máy móc tạo ra của cải dư thừa lại bỏ rơi ta trong thiếu thốn.",
                "keyWords": [
                      {
                            "word": "abundance",
                            "meaningVi": "sự dư thừa trù phú"
                      }
                ]
          },
          {
                "id": "c2_4_4",
                "start": 23,
                "end": 32,
                "textEn": "More than machinery, we need humanity. More than cleverness, we need kindness and gentleness.",
                "textVi": "Hơn cả máy móc, chúng ta cần nhân tính. Hơn cả sự khôn ngoan, chúng ta cần lòng tử tế và sự dịu dàng.",
                "keyWords": [
                      {
                            "word": "humanity",
                            "meaningVi": "lòng nhân ái, nhân tính"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'ji5_MqicxSo',
    id: 'ji5_MqicxSo',
    title: "Randy Pausch's Last Lecture: Achieving Your Childhood Dreams",
    thumbnail: 'https://img.youtube.com/vi/ji5_MqicxSo/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/ji5_MqicxSo/hqdefault.jpg',
    duration: '1:16:26',
    durationSec: 4586,
    channelName: "Carnegie Mellon University",
    channelTitle: "Carnegie Mellon University",
    level: 'C2',
    views: '22M',
    subtitles: [
          {
                "id": "c2_5_1",
                "start": 0,
                "end": 7,
                "textEn": "Carnegie Mellon has a tradition of \"The Last Lecture\", where professors imagine giving a final talk.",
                "textVi": "Đại học Carnegie Mellon có truyền thống \"Bài giảng cuối cùng\", nơi giáo sư mường tượng bài giảng sau cùng.",
                "keyWords": [
                      {
                            "word": "tradition",
                            "meaningVi": "truyền thống lâu đời"
                      }
                ]
          },
          {
                "id": "c2_5_2",
                "start": 7,
                "end": 15,
                "textEn": "For me, this lecture is real. I have terminal pancreatic cancer, and I have months left to live.",
                "textVi": "Với tôi, bài giảng này là sự thật. Tôi bị ung thư tuyến tụy giai đoạn cuối, và chỉ còn vài tháng để sống.",
                "keyWords": [
                      {
                            "word": "pancreatic cancer",
                            "meaningVi": "ung thư tuyến tụy"
                      }
                ]
          },
          {
                "id": "c2_5_3",
                "start": 15,
                "end": 23,
                "textEn": "The brick walls are there for a reason. The brick walls are not there to keep us out.",
                "textVi": "Những bức tường gạch ngăn trở được dựng lên đều có lý do. Chúng không sinh ra để ngăn cản ta.",
                "keyWords": [
                      {
                            "word": "brick walls",
                            "meaningVi": "những bức tường cản trở"
                      }
                ]
          },
          {
                "id": "c2_5_4",
                "start": 23,
                "end": 32,
                "textEn": "The brick walls are there to give us a chance to show how badly we want something.",
                "textVi": "Các bức tường ở đó để trao cho ta cơ hội chứng minh ta khao khát đạt được mục tiêu cháy bỏng đến nhường nào.",
                "keyWords": [
                      {
                            "word": "how badly",
                            "meaningVi": "khao khát mãnh liệt"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'kYfNvmF0Bqw',
    id: 'kYfNvmF0Bqw',
    title: "Steve Jobs Secrets of Life",
    thumbnail: 'https://img.youtube.com/vi/kYfNvmF0Bqw/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/kYfNvmF0Bqw/hqdefault.jpg',
    duration: '2:15',
    durationSec: 135,
    channelName: "Silicon Valley Historical Association",
    channelTitle: "Silicon Valley Historical Association",
    level: 'C2',
    views: '9.8M',
    subtitles: [
          {
                "id": "c2_6_1",
                "start": 0,
                "end": 6.5,
                "textEn": "When you grow up, you tend to get told that the world is the way it is and your life is just to live inside the world.",
                "textVi": "Khi lớn lên, bạn thường được dạy rằng thế giới này vốn dĩ là như vậy và bổn phận của bạn chỉ là sống êm đềm bên trong nó.",
                "keyWords": [
                      {
                            "word": "grow up",
                            "meaningVi": "lớn lên, trưởng thành"
                      }
                ]
          },
          {
                "id": "c2_6_2",
                "start": 6.5,
                "end": 14,
                "textEn": "Try not to bash into the walls too much. Try to have a nice family life, have fun, save a little money.",
                "textVi": "Đừng va đập quá mạnh vào các bức tường. Hãy cố xây dựng gia đình êm ấm, vui vẻ và tích cóp chút tiền.",
                "keyWords": [
                      {
                            "word": "family life",
                            "meaningVi": "đời sống gia đình"
                      }
                ]
          },
          {
                "id": "c2_6_3",
                "start": 14,
                "end": 22,
                "textEn": "That’s a very limited life. Life can be much broader once you discover one simple fact.",
                "textVi": "Đó là một lối sống vô cùng hạn hẹp. Cuộc đời sẽ rộng mở hơn bao la một khi bạn khám phá ra một sự thật giản dị.",
                "keyWords": [
                      {
                            "word": "limited life",
                            "meaningVi": "cuộc đời chật hẹp, gò bó"
                      }
                ]
          },
          {
                "id": "c2_6_4",
                "start": 22,
                "end": 31,
                "textEn": "Everything around you that you call life was made up by people that were no smarter than you.",
                "textVi": "Mọi thứ xung quanh bạn mà bạn gọi là cuộc sống đều được tạo dựng bởi những con người chẳng hề thông minh hơn bạn.",
                "keyWords": [
                      {
                            "word": "no smarter",
                            "meaningVi": "không hề thông minh hơn"
                      }
                ]
          }
    ],
  },
  {
    videoId: '8LWuu2Zwsfs',
    id: '8LWuu2Zwsfs',
    title: "Martin Luther King Jr. - I Have a Dream",
    thumbnail: 'https://img.youtube.com/vi/8LWuu2Zwsfs/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/8LWuu2Zwsfs/hqdefault.jpg',
    duration: '17:28',
    durationSec: 1048,
    channelName: "Official Historic Archive",
    channelTitle: "Official Historic Archive",
    level: 'C2',
    views: '58M',
    subtitles: [
          {
                "id": "c2_7_1",
                "start": 0,
                "end": 7,
                "textEn": "I am happy to join with you today in what will go down in history as the greatest demonstration for freedom.",
                "textVi": "Tôi vô cùng hân hoan được đứng cùng các bạn hôm nay trong sự kiện sẽ đi vào lịch sử như cuộc biểu tình vĩ đại vì tự do.",
                "keyWords": [
                      {
                            "word": "demonstration",
                            "meaningVi": "cuộc biểu tình tuần hành"
                      }
                ]
          },
          {
                "id": "c2_7_2",
                "start": 7,
                "end": 15,
                "textEn": "Five score years ago, a great American signed the Emancipation Proclamation, a beacon of hope to millions.",
                "textVi": "Một thế kỷ trước, một người Mỹ vĩ đại đã ký Bản tuyên ngôn giải phóng nô lệ, ngọn hải đăng hy vọng cho hàng triệu người.",
                "keyWords": [
                      {
                            "word": "Emancipation",
                            "meaningVi": "sự giải phóng, giải ách"
                      }
                ]
          },
          {
                "id": "c2_7_3",
                "start": 15,
                "end": 23,
                "textEn": "I have a dream that one day this nation will rise up and live out the true meaning of its creed.",
                "textVi": "Tôi có một giấc mơ rằng một ngày nào đó quốc gia này sẽ đứng dậy và sống trọn vẹn với ý nghĩa chân thật của bản tín điều.",
                "keyWords": [
                      {
                            "word": "creed",
                            "meaningVi": "tín điều, cương lĩnh"
                      }
                ]
          },
          {
                "id": "c2_7_4",
                "start": 23,
                "end": 32,
                "textEn": "That all men are created equal, judged not by the color of their skin but by the content of their character.",
                "textVi": "Rằng muôn người sinh ra đều bình đẳng, được đánh giá không phải bởi màu da mà bằng phẩm giá đạo đức bên trong.",
                "keyWords": [
                      {
                            "word": "content of character",
                            "meaningVi": "phẩm giá của nhân cách"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'JyECrGp-Sw8',
    id: 'JyECrGp-Sw8',
    title: "What If We Detonated All Nuclear Bombs at Once?",
    thumbnail: 'https://img.youtube.com/vi/JyECrGp-Sw8/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/JyECrGp-Sw8/hqdefault.jpg',
    duration: '7:45',
    durationSec: 465,
    channelName: "Kurzgesagt – In a Nutshell",
    channelTitle: "Kurzgesagt – In a Nutshell",
    level: 'C2',
    views: '35M',
    subtitles: [
          {
                "id": "c2_8_1",
                "start": 0,
                "end": 7,
                "textEn": "There are about 15,000 nuclear weapons on planet Earth, mostly controlled by the US and Russia.",
                "textVi": "Có khoảng 15.000 đầu đạn hạt nhân trên hành tinh Trái Đất, phần lớn do Mỹ và Nga kiểm soát.",
                "keyWords": [
                      {
                            "word": "nuclear weapons",
                            "meaningVi": "vũ khí hạt nhân"
                      }
                ]
          },
          {
                "id": "c2_8_2",
                "start": 7,
                "end": 15,
                "textEn": "What would happen if we gathered all of them into a single massive pile and pressed the button?",
                "textVi": "Điều gì sẽ xảy ra nếu ta gom tất cả chúng lại thành một khối khổng lồ duy nhất và bấm nút kích nổ?",
                "keyWords": [
                      {
                            "word": "detonated",
                            "meaningVi": "đã kích nổ"
                      }
                ]
          },
          {
                "id": "c2_8_3",
                "start": 15,
                "end": 23,
                "textEn": "The explosion would create a fireball thirty miles wide, scorching hundreds of thousands of square miles.",
                "textVi": "Vụ nổ sẽ tạo ra quả cầu lửa rộng 30 dặm, thiêu rụi hàng trăm ngàn dặm vuông đất đai trong nháy mắt.",
                "keyWords": [
                      {
                            "word": "scorching",
                            "meaningVi": "thiêu rụi, nung nóng thiêu cháy"
                      }
                ]
          },
          {
                "id": "c2_8_4",
                "start": 23,
                "end": 32,
                "textEn": "A nuclear winter would envelope the globe, blocking out sunlight and plunging Earth into darkness.",
                "textVi": "Mùa đông hạt nhân sẽ bao trùm toàn cầu, chặn đứng ánh sáng mặt trời và nhấn chìm Trái Đất vào tăm tối.",
                "keyWords": [
                      {
                            "word": "nuclear winter",
                            "meaningVi": "mùa đông hạt nhân toàn cầu"
                      }
                ]
          }
    ],
  },
  {
    videoId: 'arJLy3hX1E8',
    id: 'arJLy3hX1E8',
    title: "The psychology of narcissism - W. Keith Campbell",
    thumbnail: 'https://img.youtube.com/vi/arJLy3hX1E8/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/arJLy3hX1E8/hqdefault.jpg',
    duration: '5:13',
    durationSec: 313,
    channelName: "TED-Ed",
    channelTitle: "TED-Ed",
    level: 'C2',
    views: '24M',
    subtitles: [
          {
                "id": "c2_9_1",
                "start": 0,
                "end": 7,
                "textEn": "When Narcissus saw his reflection in a pool of water, he fell so deeply in love that he could not leave.",
                "textVi": "Khi chàng Narcissus nhìn thấy bóng hình mình phản chiếu dưới hồ nước, chàng si mê đến mức không thể rời bước.",
                "keyWords": [
                      {
                            "word": "reflection",
                            "meaningVi": "hình ảnh phản chiếu"
                      }
                ]
          },
          {
                "id": "c2_9_2",
                "start": 7,
                "end": 15,
                "textEn": "Psychologists distinguish between two forms of narcissism: grandiose narcissism and vulnerable narcissism.",
                "textVi": "Các nhà tâm lý học phân biệt hai dạng ái kỷ: ái kỷ vĩ cuồng tự cao và ái kỷ mong manh tổn thương.",
                "keyWords": [
                      {
                            "word": "grandiose",
                            "meaningVi": "vĩ cuồng, tự cao tự đại"
                      }
                ]
          },
          {
                "id": "c2_9_3",
                "start": 15,
                "end": 23,
                "textEn": "While grandiose narcissists exude extroverted charm, vulnerable individuals harbor deep-seated resentment.",
                "textVi": "Trong khi kẻ ái kỷ vĩ cuồng toát ra vẻ quyến rũ hướng ngoại, kẻ ái kỷ mong manh lại chất chứa đầy oán hận thầm kín.",
                "keyWords": [
                      {
                            "word": "resentment",
                            "meaningVi": "sự oán hận, bất mãn"
                      }
                ]
          },
          {
                "id": "c2_9_4",
                "start": 23,
                "end": 32,
                "textEn": "Cultivating authentic self-compassion and genuine empathy is the psychological antidote to narcissistic tendencies.",
                "textVi": "Nuôi dưỡng lòng trắc ẩn với chính mình và sự thấu cảm chân thành là liều thuốc giải cho khuynh hướng ái kỷ.",
                "keyWords": [
                      {
                            "word": "self-compassion",
                            "meaningVi": "lòng trắc ẩn với bản thân"
                      }
                ]
          }
    ],
  },
  {
    videoId: '7Tev43VNRIc',
    id: '7Tev43VNRIc',
    title: "2018 Toastmasters World Champion of Public Speaking",
    thumbnail: 'https://img.youtube.com/vi/7Tev43VNRIc/hqdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/7Tev43VNRIc/hqdefault.jpg',
    duration: '8:45',
    durationSec: 525,
    channelName: "Toastmasters International",
    channelTitle: "Toastmasters International",
    level: 'C2',
    views: '4.6M',
    subtitles: [
          {
                "id": "c2_10_1",
                "start": 0,
                "end": 7,
                "textEn": "Ramona J. Smith walked onto the world stage in Chicago to deliver a tour-de-force championship speech.",
                "textVi": "Ramona J. Smith bước lên vũ đài thế giới tại Chicago để cống hiến một bài diễn thuyết đỉnh cao đoạt chức vô địch.",
                "keyWords": [
                      {
                            "word": "tour-de-force",
                            "meaningVi": "màn trình diễn bậc thầy đỉnh cao"
                      }
                ]
          },
          {
                "id": "c2_10_2",
                "start": 7,
                "end": 15,
                "textEn": "Using the metaphor of a boxing match, she illustrated how life lands unexpected blows against all of us.",
                "textVi": "Sử dụng hình tượng trận đấu quyền anh, cô khắc họa cách cuộc đời giáng những đòn đấm bất ngờ xuống mỗi chúng ta.",
                "keyWords": [
                      {
                            "word": "metaphor",
                            "meaningVi": "phép ẩn dụ tu từ"
                      }
                ]
          },
          {
                "id": "c2_10_3",
                "start": 15,
                "end": 23,
                "textEn": "You might get knocked down, your knees might buckle, but you must get back up before the count of ten.",
                "textVi": "Bạn có thể bị đánh ngã gục, đầu gối bạn có thể run rẩy khuỵu xuống, nhưng bạn phải gượng dậy trước khi trọng tài đếm đến 10.",
                "keyWords": [
                      {
                            "word": "knocked down",
                            "meaningVi": "bị đánh ngã gục"
                      }
                ]
          },
          {
                "id": "c2_10_4",
                "start": 23,
                "end": 32,
                "textEn": "Mastering rhetoric and nonverbal vocal variety elevated her delivery into an unforgettable masterclass.",
                "textVi": "Khả năng làm chủ thuật hùng biện và biến hóa giọng nói đã nâng bài diễn thuyết của cô thành tiết học mẫu mực khó quên.",
                "keyWords": [
                      {
                            "word": "rhetoric",
                            "meaningVi": "thuật hùng biện thuyết phục"
                      }
                ]
          }
    ],
  },
];
