import { YoutubeVideoItem } from '../types/youtube';

export const MOCK_YOUTUBE_LIBRARY: YoutubeVideoItem[] = [
  // =====================================================================
  // CẤP ĐỘ B1 - KURZGESAGT: THE EGG (TRỌN VẸN ĐẦY ĐỦ CÂU THOẠI ĐẦU PHIM)
  // =====================================================================
  {
    id: 'h6fcK_fRYaI',
    title: 'The Egg: A Short Story About Life and Consciousness',
    channelTitle: 'Kurzgesagt – In a Nutshell',
    thumbnailUrl: 'https://img.youtube.com/vi/h6fcK_fRYaI/hqdefault.jpg',
    duration: '7:50',
    durationSec: 470,
    level: 'B1',
    views: '24M',
    subtitles: [
      {
        id: 'egg_0',
        start: 0,
        end: 5.0,
        textEn: '[Ambient Intro Music - Kurzgesagt Theme]',
        textVi: '[Giai điệu mở đầu êm dịu - Nhạc nền Kurzgesagt]',
        keyWords: [{ word: 'Intro Music', meaningVi: 'Nhạc dạo đầu' }]
      },
      {
        id: 'egg_1',
        start: 5.0,
        end: 9.5,
        textEn: 'You were on your way home when you died.',
        textVi: 'Bạn đang trên đường về nhà thì qua đời.',
        keyWords: [{ word: 'on your way home', meaningVi: 'trên đường về nhà', highlightColor: '#22C55E' }]
      },
      {
        id: 'egg_2',
        start: 9.5,
        end: 13.5,
        textEn: 'It was a car accident.',
        textVi: 'Đó là một vụ tai nạn xe hơi.',
        keyWords: [{ word: 'car accident', meaningVi: 'tai nạn ô tô/xe hơi' }]
      },
      {
        id: 'egg_3',
        start: 13.5,
        end: 18.5,
        textEn: 'Nothing particularly remarkable, but nevertheless fatal.',
        textVi: 'Không có gì quá đặc biệt, nhưng dẫu sao thì nó cũng đã cướp đi sinh mạng.',
        keyWords: [
          { word: 'remarkable', meaningVi: 'đáng chú ý' },
          { word: 'nevertheless', meaningVi: 'tuy nhiên, dẫu vậy' },
          { word: 'fatal', meaningVi: 'chết người, chí mạng', highlightColor: '#EF4444' }
        ]
      },
      {
        id: 'egg_4',
        start: 18.5,
        end: 23.0,
        textEn: 'You left behind a wife and two children.',
        textVi: 'Bạn để lại người vợ và hai đứa con nhỏ.',
        keyWords: [{ word: 'left behind', meaningVi: 'để lại phía sau' }]
      },
      {
        id: 'egg_5',
        start: 23.0,
        end: 27.5,
        textEn: 'It was a painless death.',
        textVi: 'Đó là một cái chết thanh thản, không đau đớn.',
        keyWords: [{ word: 'painless', meaningVi: 'không đau đớn' }]
      },
      {
        id: 'egg_6',
        start: 27.5,
        end: 32.5,
        textEn: 'The EMTs tried their best to save you, but to no avail.',
        textVi: 'Các nhân viên y tế cấp cứu đã cố gắng hết sức để cứu bạn, nhưng vô vọng.',
        keyWords: [{ word: 'EMTs', meaningVi: 'nhân viên cấp cứu' }, { word: 'to no avail', meaningVi: 'vô ích, không thành', highlightColor: '#F59E0B' }]
      },
      {
        id: 'egg_7',
        start: 32.5,
        end: 37.0,
        textEn: "And that's when you met me.",
        textVi: 'Và đó là khoảnh khắc bạn gặp tôi.',
        keyWords: [{ word: 'met me', meaningVi: 'gặp tôi', highlightColor: '#38BDF8' }]
      },
      {
        id: 'egg_8',
        start: 37.0,
        end: 41.5,
        textEn: '“What… what happened?” you asked. “Where am I?”',
        textVi: '“Chuyện… chuyện gì đã xảy ra vậy?” bạn hỏi. “Tôi đang ở đâu thế này?”',
        keyWords: [{ word: 'what happened', meaningVi: 'chuyện gì đã xảy ra' }]
      },
      {
        id: 'egg_9',
        start: 41.5,
        end: 46.0,
        textEn: '“You died,” I said, matter-of-factly. No point in mincing words.',
        textVi: '“Bạn đã qua đời rồi,” tôi nói một cách bình thản. Chẳng có lý do gì phải nói vòng vo.',
        keyWords: [{ word: 'matter-of-factly', meaningVi: 'một cách thản nhiên' }, { word: 'mincing words', meaningVi: 'nói giảm nói tránh' }]
      },
      {
        id: 'egg_10',
        start: 46.0,
        end: 50.5,
        textEn: '“There was a… a truck and it was skidding…”',
        textVi: '“Có một chiếc… chiếc xe tải và nó bị trượt bánh…”',
        keyWords: [{ word: 'skidding', meaningVi: 'bị trượt bánh xe', highlightColor: '#EF4444' }]
      },
      {
        id: 'egg_11',
        start: 50.5,
        end: 53.5,
        textEn: '“Yup,” I said.',
        textVi: '“Đúng vậy,” tôi đáp.',
        keyWords: [{ word: 'Yup', meaningVi: 'Ừ, đúng rồi' }]
      },
      {
        id: 'egg_12',
        start: 53.5,
        end: 57.0,
        textEn: '“I… I died?”',
        textVi: '“Tôi… tôi chết thật rồi sao?”',
        keyWords: [{ word: 'died', meaningVi: 'đã chết' }]
      },
      {
        id: 'egg_13',
        start: 57.0,
        end: 62.0,
        textEn: '“Yup. But don’t feel bad about it. Everyone dies,” I said.',
        textVi: '“Ừ. Nhưng đừng buồn vì điều đó. Ai rồi cũng phải qua đời mà,” tôi nói.',
        keyWords: [{ word: 'feel bad', meaningVi: 'cảm thấy tồi tệ/buồn bã' }]
      },
      {
        id: 'egg_14',
        start: 62.0,
        end: 68.0,
        textEn: 'You looked around. There was nothingness. Just you and me.',
        textVi: 'Bạn nhìn quanh. Xung quanh chỉ là hư vô. Chỉ có bạn và tôi.',
        keyWords: [{ word: 'nothingness', meaningVi: 'sự hư vô, trống rỗng', highlightColor: '#8B5CF6' }]
      },
      {
        id: 'egg_15',
        start: 68.0,
        end: 74.0,
        textEn: '“What is this place?” you asked. “Is this the afterlife?”',
        textVi: '“Nơi này là đâu?” bạn hỏi. “Đây có phải là thế giới bên kia không?”',
        keyWords: [{ word: 'afterlife', meaningVi: 'thế giới bên kia/kiếp sau' }]
      },
      {
        id: 'egg_16',
        start: 74.0,
        end: 78.0,
        textEn: '“More or less,” I said.',
        textVi: '“Đại loại là như vậy,” tôi trả lời.',
        keyWords: [{ word: 'More or less', meaningVi: 'Đại khái, gần như vậy' }]
      },
      {
        id: 'egg_17',
        start: 78.0,
        end: 82.0,
        textEn: '“Are you God?” you asked.',
        textVi: '“Ngài có phải là Chúa không?” bạn hỏi.',
        keyWords: [{ word: 'God', meaningVi: 'Chúa trời / Thượng đế' }]
      },
      {
        id: 'egg_18',
        start: 82.0,
        end: 86.0,
        textEn: '“Yup,” I replied. “I’m God.”',
        textVi: '“Đúng rồi,” tôi đáp. “Ta chính là Chúa.”',
        keyWords: [{ word: 'replied', meaningVi: 'trả lời' }]
      },
      {
        id: 'egg_19',
        start: 86.0,
        end: 90.0,
        textEn: '“My kids… my wife,” you said.',
        textVi: '“Các con tôi… và vợ tôi,” bạn ngập ngừng.',
        keyWords: [{ word: 'wife', meaningVi: 'người vợ' }]
      },
      {
        id: 'egg_20',
        start: 90.0,
        end: 94.0,
        textEn: '“What about them?”',
        textVi: '“Họ làm sao nào?”',
        keyWords: [{ word: 'What about them', meaningVi: 'Thế còn họ thì sao' }]
      },
      {
        id: 'egg_21',
        start: 94.0,
        end: 98.0,
        textEn: '“Will they be all right?”',
        textVi: '“Liệu họ có ổn không?”',
        keyWords: [{ word: 'all right', meaningVi: 'ổn thỏa, bình an' }]
      },
      {
        id: 'egg_22',
        start: 98.0,
        end: 104.0,
        textEn: '“That’s what I like to see,” I said. “Your main concern is for your family.”',
        textVi: '“Đó chính là điều ta rất thích ở con,” tôi nói. “Nỗi bận tâm lớn nhất của con vẫn là dành cho gia đình.”',
        keyWords: [{ word: 'main concern', meaningVi: 'mối bận tâm chính', highlightColor: '#22C55E' }]
      },
      {
        id: 'egg_23',
        start: 104.0,
        end: 110.0,
        textEn: 'You looked at me with fascination. To you, I didn’t look like God.',
        textVi: 'Bạn nhìn tôi với vẻ kinh ngạc. Đối với bạn, tôi trông chẳng giống Chúa chút nào.',
        keyWords: [{ word: 'fascination', meaningVi: 'sự say mê, kinh ngạc' }]
      },
      {
        id: 'egg_24',
        start: 110.0,
        end: 115.0,
        textEn: 'I just looked like some man. Or possibly a woman.',
        textVi: 'Tôi trông chỉ giống một người đàn ông bình thường. Hoặc có thể là một người phụ nữ.',
        keyWords: [{ word: 'possibly', meaningVi: 'có thể' }]
      },
      {
        id: 'egg_25',
        start: 115.0,
        end: 120.0,
        textEn: '“Don’t worry,” I said. “They’ll be fine.”',
        textVi: '“Đừng lo lắng,” tôi nói. “Họ sẽ ổn cả thôi.”',
        keyWords: [{ word: 'Don’t worry', meaningVi: 'Đừng lo' }]
      },
      {
        id: 'egg_26',
        start: 120.0,
        end: 126.0,
        textEn: '“Your kids will remember you as perfect in every way.”',
        textVi: '“Các con của con sẽ luôn nhớ về con như một người cha hoàn hảo về mọi mặt.”',
        keyWords: [{ word: 'in every way', meaningVi: 'về mọi mặt', highlightColor: '#22C55E' }]
      },
      {
        id: 'egg_27',
        start: 126.0,
        end: 132.0,
        textEn: '“So what happens now? Do I go to heaven or hell or something?”',
        textVi: '“Vậy điều gì sẽ xảy ra tiếp theo? Tôi sẽ lên thiên đàng hay xuống địa ngục hay sao?”',
        keyWords: [{ word: 'heaven or hell', meaningVi: 'thiên đàng hay địa ngục' }]
      },
      {
        id: 'egg_28',
        start: 132.0,
        end: 138.0,
        textEn: '“Neither,” I said. “You’ll be reincarnated.”',
        textVi: '“Không nơi nào cả,” tôi nói. “Con sẽ được luân hồi tái sinh.”',
        keyWords: [{ word: 'reincarnated', meaningVi: 'luân hồi, đầu thai', highlightColor: '#F59E0B' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ A1 - NEVER GONNA GIVE YOU UP (TRỌN BÀI HÁT TỪNG CÂU LIÊN TỤC)
  // =====================================================================
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up (Học Tiếng Anh Qua Bài Hát)',
    channelTitle: 'Rick Astley',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    duration: '3:32',
    durationSec: 212,
    level: 'A1',
    views: '1.5B',
    subtitles: [
      {
        id: 'a1_song_0',
        start: 0,
        end: 18.0,
        textEn: '[Music Intro - Giai điệu nhạc dạo đầu]',
        textVi: '[Đoạn nhạc mở đầu sôi động]',
        keyWords: [{ word: 'Music Intro', meaningVi: 'Nhạc dạo đầu' }]
      },
      {
        id: 'a1_song_1',
        start: 18.0,
        end: 23.0,
        textEn: "We're no strangers to love.",
        textVi: 'Chúng ta không còn xa lạ gì với tình yêu.',
        keyWords: [{ word: 'strangers', meaningVi: 'người xa lạ', highlightColor: '#22C55E' }]
      },
      {
        id: 'a1_song_2',
        start: 23.0,
        end: 27.0,
        textEn: 'You know the rules and so do I.',
        textVi: 'Em biết rõ các quy luật và anh cũng vậy.',
        keyWords: [{ word: 'rules', meaningVi: 'quy luật, luật chơi', highlightColor: '#38BDF8' }]
      },
      {
        id: 'a1_song_3',
        start: 27.0,
        end: 31.0,
        textEn: "A full commitment's what I'm thinking of.",
        textVi: 'Một sự gắn kết trọn vẹn là điều anh đang nghĩ tới.',
        keyWords: [{ word: 'commitment', meaningVi: 'sự cam kết, gắn bó', highlightColor: '#22C55E' }]
      },
      {
        id: 'a1_song_4',
        start: 31.0,
        end: 35.5,
        textEn: "You wouldn't get this from any other guy.",
        textVi: 'Em sẽ không thể nhận được điều này từ bất kỳ chàng trai nào khác.',
        keyWords: [{ word: 'any other guy', meaningVi: 'chàng trai nào khác', highlightColor: '#F59E0B' }]
      },
      {
        id: 'a1_song_5',
        start: 35.5,
        end: 43.0,
        textEn: "I just wanna tell you how I'm feeling, gotta make you understand.",
        textVi: 'Anh chỉ muốn nói cho em biết cảm xúc của mình, muốn em hiểu được.',
        keyWords: [{ word: 'wanna', meaningVi: 'muốn (want to)', highlightColor: '#38BDF8' }]
      },
      {
        id: 'a1_song_6',
        start: 43.0,
        end: 48.0,
        textEn: 'Never gonna give you up, never gonna let you down.',
        textVi: 'Không bao giờ từ bỏ em, không bao giờ làm em thất vọng.',
        keyWords: [{ word: 'give you up', meaningVi: 'từ bỏ em' }, { word: 'let you down', meaningVi: 'làm em thất vọng' }]
      },
      {
        id: 'a1_song_7',
        start: 48.0,
        end: 52.5,
        textEn: 'Never gonna run around and desert you.',
        textVi: 'Không bao giờ chạy trốn và bỏ rơi em.',
        keyWords: [{ word: 'desert you', meaningVi: 'bỏ rơi em', highlightColor: '#EF4444' }]
      },
      {
        id: 'a1_song_8',
        start: 52.5,
        end: 56.5,
        textEn: 'Never gonna make you cry, never gonna say goodbye.',
        textVi: 'Không bao giờ làm em khóc, không bao giờ nói lời tạm biệt.',
        keyWords: [{ word: 'make you cry', meaningVi: 'làm em rơi lệ' }]
      },
      {
        id: 'a1_song_9',
        start: 56.5,
        end: 62.0,
        textEn: 'Never gonna tell a lie and hurt you.',
        textVi: 'Không bao giờ nói dối và làm tổn thương em.',
        keyWords: [{ word: 'tell a lie', meaningVi: 'nói dối' }, { word: 'hurt you', meaningVi: 'làm đau em' }]
      },
      {
        id: 'a1_song_10',
        start: 62.0,
        end: 70.0,
        textEn: "We've known each other for so long.",
        textVi: 'Chúng ta đã biết nhau từ rất lâu rồi.',
        keyWords: [{ word: 'for so long', meaningVi: 'từ rất lâu' }]
      },
      {
        id: 'a1_song_11',
        start: 70.0,
        end: 78.0,
        textEn: "Your heart's been aching, but you're too shy to say it.",
        textVi: 'Trái tim em đang rung động, nhưng em lại quá ngại ngùng để nói ra.',
        keyWords: [{ word: 'aching', meaningVi: 'rung động, thổn thức' }, { word: 'too shy', meaningVi: 'quá ngại ngùng' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ A1 - ENGLISH SINGSING (ĐẦY ĐỦ THÓI QUEN HÀNG NGÀY)
  // =====================================================================
  {
    id: 'qD1pnquN_DM',
    title: 'Daily Routines and Easy Vocabulary for Beginners',
    channelTitle: 'English Singsing',
    thumbnailUrl: 'https://img.youtube.com/vi/qD1pnquN_DM/hqdefault.jpg',
    duration: '3:20',
    durationSec: 200,
    level: 'A1',
    views: '2.1M',
    subtitles: [
      {
        id: 'a1_daily_1',
        start: 0,
        end: 4.5,
        textEn: "Kids vocabulary - My Day - Daily Routine.",
        textVi: 'Từ vựng cho bé - Một ngày của tôi - Thói quen hàng ngày.',
        keyWords: [{ word: 'Daily Routine', meaningVi: 'Thói quen hàng ngày' }]
      },
      {
        id: 'a1_daily_2',
        start: 4.5,
        end: 9.0,
        textEn: 'I wake up at seven o’clock every morning.',
        textVi: 'Tôi thức dậy lúc bảy giờ mỗi buổi sáng.',
        keyWords: [{ word: 'wake up', meaningVi: 'thức dậy', highlightColor: '#22C55E' }]
      },
      {
        id: 'a1_daily_3',
        start: 9.0,
        end: 14.0,
        textEn: 'Then I drink a warm glass of water and brush my teeth.',
        textVi: 'Sau đó tôi uống một ly nước ấm và đánh răng.',
        keyWords: [{ word: 'brush my teeth', meaningVi: 'đánh răng', highlightColor: '#38BDF8' }]
      },
      {
        id: 'a1_daily_4',
        start: 14.0,
        end: 19.5,
        textEn: 'I wash my face and put on my clean clothes.',
        textVi: 'Tôi rửa mặt và mặc quần áo sạch sẽ.',
        keyWords: [{ word: 'put on', meaningVi: 'mặc vào', highlightColor: '#22C55E' }]
      },
      {
        id: 'a1_daily_5',
        start: 19.5,
        end: 25.0,
        textEn: 'At seven thirty, I eat breakfast with my family.',
        textVi: 'Vào lúc bảy giờ rưỡi, tôi ăn sáng cùng gia đình.',
        keyWords: [{ word: 'eat breakfast', meaningVi: 'ăn bữa sáng' }]
      },
      {
        id: 'a1_daily_6',
        start: 25.0,
        end: 30.0,
        textEn: 'I pack my school bag and say goodbye to mom.',
        textVi: 'Tôi soạn cặp sách và chào tạm biệt mẹ.',
        keyWords: [{ word: 'pack my bag', meaningVi: 'soạn đồ/cặp sách' }]
      },
      {
        id: 'a1_daily_7',
        start: 30.0,
        end: 36.0,
        textEn: 'I walk to school with my best friends.',
        textVi: 'Tôi đi bộ đến trường cùng những người bạn thân nhất.',
        keyWords: [{ word: 'walk to school', meaningVi: 'đi bộ đến trường' }]
      },
      {
        id: 'a1_daily_8',
        start: 36.0,
        end: 42.0,
        textEn: 'At school, I study English, math, and art with my teacher.',
        textVi: 'Ở trường, tôi học tiếng Anh, toán và vẽ cùng cô giáo.',
        keyWords: [{ word: 'study', meaningVi: 'học tập' }]
      },
      {
        id: 'a1_daily_9',
        start: 42.0,
        end: 48.0,
        textEn: 'At noon, I have lunch in the school cafeteria.',
        textVi: 'Vào buổi trưa, tôi ăn trưa ở căng tin của trường.',
        keyWords: [{ word: 'cafeteria', meaningVi: 'quán ăn tự phục vụ / căng tin', highlightColor: '#38BDF8' }]
      },
      {
        id: 'a1_daily_10',
        start: 48.0,
        end: 55.0,
        textEn: 'In the afternoon, I play football with my classmates in the playground.',
        textVi: 'Vào buổi chiều, tôi đá bóng cùng các bạn cùng lớp ở sân chơi.',
        keyWords: [{ word: 'classmates', meaningVi: 'bạn cùng lớp' }, { word: 'playground', meaningVi: 'sân chơi' }]
      },
      {
        id: 'a1_daily_11',
        start: 55.0,
        end: 62.0,
        textEn: 'At five o’clock, I come back home and take a shower.',
        textVi: 'Lúc năm giờ chiều, tôi về nhà và đi tắm.',
        keyWords: [{ word: 'take a shower', meaningVi: 'đi tắm vòi sen', highlightColor: '#22C55E' }]
      },
      {
        id: 'a1_daily_12',
        start: 62.0,
        end: 70.0,
        textEn: 'I do my homework and prepare my lessons for tomorrow.',
        textVi: 'Tôi làm bài tập về nhà và chuẩn bị bài vở cho ngày mai.',
        keyWords: [{ word: 'homework', meaningVi: 'bài tập về nhà' }]
      },
      {
        id: 'a1_daily_13',
        start: 70.0,
        end: 80.0,
        textEn: 'At nine thirty, I go to bed and have sweet dreams.',
        textVi: 'Lúc chín giờ rưỡi, tôi lên giường ngủ và có những giấc mơ ngọt ngào.',
        keyWords: [{ word: 'go to bed', meaningVi: 'đi ngủ' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ A2 - ME AT THE ZOO (VIDEO ĐẦU TIÊN TRÊN YOUTUBE)
  // =====================================================================
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo (Video đầu tiên trong lịch sử YouTube)',
    channelTitle: 'Jawed',
    thumbnailUrl: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg',
    duration: '0:19',
    durationSec: 19,
    level: 'A2',
    views: '340M',
    subtitles: [
      {
        id: 'a2_zoo_1',
        start: 0,
        end: 4.5,
        textEn: 'All right, so here we are in front of the elephants.',
        textVi: 'Được rồi, chúng ta đang đứng trước những chú voi.',
        keyWords: [{ word: 'elephants', meaningVi: 'những con voi' }]
      },
      {
        id: 'a2_zoo_2',
        start: 4.5,
        end: 9.5,
        textEn: 'The cool thing about these guys is that they have really, really, really long trunks.',
        textVi: 'Điều tuyệt vời ở những con vật này là chúng có chiếc vòi rất, rất, rất dài.',
        keyWords: [{ word: 'trunks', meaningVi: 'vòi voi', highlightColor: '#22C55E' }]
      },
      {
        id: 'a2_zoo_3',
        start: 9.5,
        end: 14.0,
        textEn: "And that's, that's cool.",
        textVi: 'Và điều đó thật tuyệt.',
        keyWords: [{ word: 'cool', meaningVi: 'thú vị, tuyệt vời' }]
      },
      {
        id: 'a2_zoo_4',
        start: 14.0,
        end: 19.0,
        textEn: "And that's pretty much all there is to say.",
        textVi: 'Đó gần như là tất cả những gì cần nói.',
        keyWords: [{ word: 'pretty much', meaningVi: 'gần như là', highlightColor: '#38BDF8' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ B2 - STEVE JOBS STANFORD SPEECH (ĐẦY ĐỦ BÀI NÓI MỞ ĐẦU)
  // =====================================================================
  {
    id: 'UF8uR6Z6KLc',
    title: 'Steve Jobs’ 2005 Stanford Commencement Address',
    channelTitle: 'Stanford University',
    thumbnailUrl: 'https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg',
    duration: '14:32',
    durationSec: 872,
    level: 'B2',
    views: '45M',
    subtitles: [
      {
        id: 'b2_1',
        start: 0,
        end: 8.0,
        textEn: 'I am honored to be with you today at your commencement from one of the finest universities in the world.',
        textVi: 'Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp từ một trong những trường đại học tốt nhất thế giới.',
        keyWords: [{ word: 'commencement', meaningVi: 'lễ tốt nghiệp' }, { word: 'finest', meaningVi: 'tuyệt vời nhất' }]
      },
      {
        id: 'b2_2',
        start: 8.0,
        end: 16.5,
        textEn: "I never graduated from college. Truth be told, this is the closest I've ever gotten to a college graduation.",
        textVi: 'Tôi chưa bao giờ tốt nghiệp đại học. Thật lòng mà nói, đây là khoảng cách gần nhất tôi từng có với một lễ tốt nghiệp đại học.',
        keyWords: [{ word: 'Truth be told', meaningVi: 'Thật lòng mà nói' }, { word: 'graduated', meaningVi: 'tốt nghiệp' }]
      },
      {
        id: 'b2_3',
        start: 16.5,
        end: 25.0,
        textEn: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
        textVi: 'Hôm nay tôi muốn kể cho các bạn ba câu chuyện từ cuộc đời tôi. Chỉ vậy thôi. Không có gì to tát. Chỉ ba câu chuyện.',
        keyWords: [{ word: 'No big deal', meaningVi: 'Không có gì to tát', highlightColor: '#38BDF8' }]
      },
      {
        id: 'b2_4',
        start: 25.0,
        end: 34.0,
        textEn: 'The first story is about connecting the dots.',
        textVi: 'Câu chuyện đầu tiên là về việc kết nối các dấu mốc trong cuộc sống.',
        keyWords: [{ word: 'connecting the dots', meaningVi: 'kết nối các điểm mốc', highlightColor: '#22C55E' }]
      },
      {
        id: 'b2_5',
        start: 34.0,
        end: 42.0,
        textEn: 'I dropped out of Reed College after the first six months, but then stayed around as a drop-in for another eighteen months.',
        textVi: 'Tôi đã bỏ học tại Cao đẳng Reed sau sáu tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm mười tám tháng nữa.',
        keyWords: [{ word: 'dropped out', meaningVi: 'bỏ học' }, { word: 'drop-in', meaningVi: 'học dự thính' }]
      },
      {
        id: 'b2_6',
        start: 42.0,
        end: 50.0,
        textEn: 'So why did I drop out? It started before I was born.',
        textVi: 'Vậy tại sao tôi lại bỏ học? Chuyện bắt đầu từ trước khi tôi ra đời.',
        keyWords: [{ word: 'drop out', meaningVi: 'từ bỏ việc học' }]
      },
      {
        id: 'b2_7',
        start: 50.0,
        end: 60.0,
        textEn: 'Your time is limited, so don’t waste it living someone else’s life.',
        textVi: 'Thời gian của bạn là hữu hạn, vì vậy đừng lãng phí nó để sống cuộc đời của người khác.',
        keyWords: [{ word: 'limited', meaningVi: 'hữu hạn' }, { word: 'waste', meaningVi: 'lãng phí' }]
      },
      {
        id: 'b2_8',
        start: 60.0,
        end: 70.0,
        textEn: 'Don’t be trapped by dogma, which is living with the results of other people’s thinking.',
        textVi: 'Đừng bị mắc kẹt bởi giáo điều, tức là sống dựa trên suy nghĩ và định kiến của người khác.',
        keyWords: [{ word: 'dogma', meaningVi: 'giáo điều, định kiến', highlightColor: '#EF4444' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ C1 - VERITASIUM: TỐC ĐỘ ÁNH SÁNG
  // =====================================================================
  {
    id: 'bHIhgxav9LY',
    title: 'Why The Speed of Light is Not What You Think',
    channelTitle: 'Veritasium',
    thumbnailUrl: 'https://img.youtube.com/vi/bHIhgxav9LY/hqdefault.jpg',
    duration: '16:10',
    durationSec: 970,
    level: 'C1',
    views: '18M',
    subtitles: [
      {
        id: 'c1_1',
        start: 0,
        end: 5.5,
        textEn: 'The one-way speed of light has actually never been measured directly.',
        textVi: 'Tốc độ một chiều của ánh sáng thực tế chưa bao giờ được đo đạc trực tiếp.',
        keyWords: [{ word: 'one-way speed', meaningVi: 'vận tốc một chiều' }, { word: 'measured', meaningVi: 'đo lường' }]
      },
      {
        id: 'c1_2',
        start: 5.5,
        end: 11.2,
        textEn: 'Every single experiment relies on a round-trip assumption in fundamental physics.',
        textVi: 'Mọi thí nghiệm vật lý cơ bản đều dựa trên giả định hành trình khứ hồi hai chiều.',
        keyWords: [{ word: 'relies on', meaningVi: 'dựa vào' }, { word: 'round-trip assumption', meaningVi: 'giả định khứ hồi' }]
      },
      {
        id: 'c1_3',
        start: 11.2,
        end: 18.0,
        textEn: 'We assume light travels at the exact same speed in all directions, but Einstein admitted this is just a convention.',
        textVi: 'Chúng ta cho rằng ánh sáng di chuyển cùng một tốc độ theo mọi hướng, nhưng Einstein thừa nhận đây chỉ là một quy ước.',
        keyWords: [{ word: 'convention', meaningVi: 'quy ước ngầm định', highlightColor: '#38BDF8' }]
      },
      {
        id: 'c1_4',
        start: 18.0,
        end: 26.0,
        textEn: 'If the speed of light is different in different directions, we would never know because any measurement requires reflection.',
        textVi: 'Nếu tốc độ ánh sáng khác nhau theo các hướng khác nhau, chúng ta sẽ không bao giờ biết được vì mọi phép đo đều cần sự phản xạ.',
        keyWords: [{ word: 'reflection', meaningVi: 'sự phản xạ' }]
      },
      {
        id: 'c1_5',
        start: 26.0,
        end: 35.0,
        textEn: 'This means our deepest understanding of simultaneity in special relativity is fundamentally a choice.',
        textVi: 'Điều này có nghĩa là sự hiểu biết sâu sắc nhất của chúng ta về tính đồng thời trong thuyết tương đối hẹp về cơ bản là một sự lựa chọn.',
        keyWords: [{ word: 'simultaneity', meaningVi: 'tính đồng thời', highlightColor: '#8B5CF6' }]
      }
    ]
  },

  // =====================================================================
  // CẤP ĐỘ C2 - HARVARD JUSTICE: MICHAEL SANDEL
  // =====================================================================
  {
    id: 'kBdfcR-8hEY',
    title: 'Justice: What’s The Right Thing To Do? (The Moral Side of Murder)',
    channelTitle: 'Harvard University',
    thumbnailUrl: 'https://img.youtube.com/vi/kBdfcR-8hEY/hqdefault.jpg',
    duration: '54:20',
    durationSec: 3260,
    level: 'C2',
    views: '22M',
    subtitles: [
      {
        id: 'c2_1',
        start: 0,
        end: 8.0,
        textEn: 'My name is Michael Sandel and I teach political philosophy at Harvard University.',
        textVi: 'Tôi là Michael Sandel và tôi giảng dạy triết học chính trị tại Đại học Harvard.',
        keyWords: [{ word: 'political philosophy', meaningVi: 'triết học chính trị' }]
      },
      {
        id: 'c2_2',
        start: 8.0,
        end: 16.0,
        textEn: "Suppose you're the driver of a trolley car, and your trolley car is hurtling down the track at sixty miles an hour.",
        textVi: 'Giả sử bạn là người lái một chiếc xe điện, và chiếc xe điện của bạn đang lao nhanh xuống đường ray với tốc độ sáu mươi dặm một giờ.',
        keyWords: [{ word: 'trolley car', meaningVi: 'xe điện bánh sắt' }, { word: 'hurtling', meaningVi: 'lao nhanh', highlightColor: '#EF4444' }]
      },
      {
        id: 'c2_3',
        start: 16.0,
        end: 24.0,
        textEn: "And at the end of the track, you notice five workers. The brakes don't work.",
        textVi: 'Và ở cuối đường ray, bạn nhận thấy có năm công nhân. Hệ thống phanh không hoạt động.',
        keyWords: [{ word: 'notice', meaningVi: 'nhận thấy' }, { word: 'brakes', meaningVi: 'hệ thống phanh' }]
      },
      {
        id: 'c2_4',
        start: 24.0,
        end: 32.0,
        textEn: 'You feel desperate because you know that if you crash into these five workers, they will all die.',
        textVi: 'Bạn cảm thấy tuyệt vọng vì biết rằng nếu đâm vào năm công nhân này, tất cả họ sẽ chết.',
        keyWords: [{ word: 'desperate', meaningVi: 'tuyệt vọng' }, { word: 'crash into', meaningVi: 'đâm sầm vào' }]
      },
      {
        id: 'c2_5',
        start: 32.0,
        end: 40.0,
        textEn: 'Now suppose you notice a side track off to the right. And on that track, there is only one worker.',
        textVi: 'Bây giờ hãy tưởng tượng bạn thấy một đường ray phụ rẽ sang bên phải. Và trên đường ray đó chỉ có duy nhất một công nhân.',
        keyWords: [{ word: 'side track', meaningVi: 'đường ray phụ rẽ nhánh' }]
      },
      {
        id: 'c2_6',
        start: 40.0,
        end: 50.0,
        textEn: 'Your steering wheel still works, so you can steer onto the side track if you choose. What would you do?',
        textVi: 'Vô lăng vẫn hoạt động, nên bạn có thể bẻ lái sang đường ray phụ nếu muốn. Bạn sẽ làm gì trong tình huống này?',
        keyWords: [{ word: 'steer onto', meaningVi: 'bẻ lái sang', highlightColor: '#38BDF8' }]
      }
    ]
  }
];
