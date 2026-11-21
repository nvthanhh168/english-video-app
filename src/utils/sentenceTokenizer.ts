import { KeyWordExtraction, ParsedWordToken } from '../types/module2';

/**
 * Hàm phân tích và tách câu tiếng Anh (String Manipulation)
 * Tìm và so khớp chính xác các từ/cụm từ trong keyWords (kể cả cụm nhiều từ như "spoken English")
 * Giữ nguyên viết hoa/viết thường và dấu câu gốc.
 */
export function tokenizeSentence(
  sentence: string,
  keyWords: KeyWordExtraction[]
): ParsedWordToken[] {
  if (!sentence) return [];
  if (!keyWords || keyWords.length === 0) {
    // Nếu không có keyword, tách thành từng từ thông thường
    return sentence.split(/\s+/).filter(Boolean).map((word, idx) => ({
      id: `w_normal_${idx}`,
      text: word,
      isKeyWord: false,
    }));
  }

  // 1. Sắp xếp keyWords theo độ dài giảm dần (để ưu tiên cụm nhiều từ trước từ đơn lẻ)
  const sortedKeywords = [...keyWords].sort((a, b) => b.word.length - a.word.length);

  interface MatchRange {
    start: number;
    end: number;
    keyword: KeyWordExtraction;
    matchedText: string;
  }

  const matches: MatchRange[] = [];

  // 2. Tìm tất cả vị trí xuất hiện của từng keyword trong câu
  sortedKeywords.forEach((kw) => {
    // Regex tìm từ độc lập (Word boundary \b)
    const escaped = kw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(sentence)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Đảm bảo không bị trùng lặp vị trí đã khớp trước đó
      const isOverlapping = matches.some(
        (m) => (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
      );

      if (!isOverlapping) {
        matches.push({
          start,
          end,
          keyword: kw,
          matchedText: match[0],
        });
      }
    }
  });

  // Sắp xếp các đoạn khớp theo thứ tự xuất hiện từ trái qua phải
  matches.sort((a, b) => a.start - b.start);

  // 3. Cắt chuỗi thành các phân đoạn (Tokens)
  const tokens: ParsedWordToken[] = [];
  let currentIndex = 0;
  let tokenCounter = 0;

  matches.forEach((m) => {
    // Phần văn bản trước keyword
    if (m.start > currentIndex) {
      const beforeText = sentence.substring(currentIndex, m.start);
      // Tách thành các từ thông thường theo khoảng trắng
      const normalWords = beforeText.split(/\s+/).filter(Boolean);
      normalWords.forEach((nw) => {
        tokens.push({
          id: `tok_${tokenCounter++}`,
          text: nw,
          isKeyWord: false,
        });
      });
    }

    // Phần keyword được highlight
    tokens.push({
      id: `tok_${tokenCounter++}_kw`,
      text: m.matchedText,
      isKeyWord: true,
      vietnameseMeaning: m.keyword.vietnameseMeaning,
      highlightColor: m.keyword.highlightColor || '#A7F3D0',
    });

    currentIndex = m.end;
  });

  // Phần văn bản còn lại sau keyword cuối cùng
  if (currentIndex < sentence.length) {
    const remainingText = sentence.substring(currentIndex);
    const normalWords = remainingText.split(/\s+/).filter(Boolean);
    normalWords.forEach((nw) => {
      tokens.push({
        id: `tok_${tokenCounter++}`,
        text: nw,
        isKeyWord: false,
      });
    });
  }

  return tokens;
}
