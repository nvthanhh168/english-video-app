import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyWordHighlight, SentenceChunk } from '../../types/guided';

interface Props {
  englishSentence: string;
  vietnameseTranslation: string;
  keyWords: KeyWordHighlight[];
}

export const InlineVocabularyCard: React.FC<Props> = ({
  englishSentence,
  vietnameseTranslation,
  keyWords,
}) => {
  // Thuật toán bóc tách chuỗi đa từ khóa (Multi-Keyword String Tokenization)
  const parsedSentence = useMemo<SentenceChunk[]>(() => {
    if (!englishSentence) return [];
    if (!keyWords || keyWords.length === 0) {
      return [{ type: 'text', content: englishSentence }];
    }

    // 1. Sắp xếp keyWords theo độ dài giảm dần (để ưu tiên cụm nhiều từ trước từ đơn lẻ)
    const sortedKws = [...keyWords].sort((a, b) => b.word.length - a.word.length);

    interface RangeMatch {
      start: number;
      end: number;
      matchedText: string;
      keywordData: KeyWordHighlight;
    }

    const matches: RangeMatch[] = [];

    // 2. Tìm tất cả vị trí xuất hiện của từng từ khóa bằng Regex Word Boundary (\b)
    sortedKws.forEach((kw) => {
      const escaped = kw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(englishSentence)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        // Tránh trùng lặp với khoảng đã khớp
        const overlaps = matches.some(
          (m) => (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
        );

        if (!overlaps) {
          matches.push({
            start,
            end,
            matchedText: match[0],
            keywordData: kw,
          });
        }
      }
    });

    // 3. Sắp xếp các đoạn khớp theo thứ tự xuất hiện từ trái qua phải
    matches.sort((a, b) => a.start - b.start);

    // 4. Chia câu thành các khối text bình thường và keyword
    const chunks: SentenceChunk[] = [];
    let currentIndex = 0;

    matches.forEach((m) => {
      if (m.start > currentIndex) {
        chunks.push({
          type: 'text',
          content: englishSentence.substring(currentIndex, m.start),
        });
      }

      chunks.push({
        type: 'keyword',
        content: m.matchedText,
        keywordData: m.keywordData,
      });

      currentIndex = m.end;
    });

    if (currentIndex < englishSentence.length) {
      chunks.push({
        type: 'text',
        content: englishSentence.substring(currentIndex),
      });
    }

    return chunks;
  }, [englishSentence, keyWords]);

  return (
    <View style={styles.cardContainer}>
      {/* Khu vực câu tiếng Anh bóc tách */}
      <View style={styles.sentenceWrapper}>
        {parsedSentence.map((chunk, index) => {
          if (chunk.type === 'text') {
            return (
              <Text key={index} style={styles.normalText}>
                {chunk.content}
              </Text>
            );
          }

          // Render khối Highlight
          return (
            <View key={index} style={styles.keywordBlock}>
              <View
                style={[
                  styles.highlightBg,
                  {
                    backgroundColor:
                      chunk.keywordData?.highlightColor || '#A7F3D0',
                  },
                ]}
              >
                <Text style={styles.keywordText}>{chunk.content}</Text>
              </View>
              {/* Micro-translation nằm chính xác dưới từ khóa */}
              <Text style={styles.microTranslation}>
                {chunk.keywordData?.vietnameseMeaning}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Dịch nguyên câu (Nằm cuối thẻ) */}
      <Text style={styles.fullTranslation}>{vietnameseTranslation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sentenceWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline', // Đảm bảo chân chữ tiếng Anh thẳng hàng
    marginBottom: 16,
  },
  normalText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4F46E5', // Xanh tím đậm
    lineHeight: 34,
  },
  keywordBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 4,
    top: 4, // Tinh chỉnh để chân chữ cân bằng với Text bình thường
  },
  highlightBg: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  keywordText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#065F46', // Xanh lá đậm
  },
  microTranslation: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    textAlign: 'center',
  },
  fullTranslation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    lineHeight: 20,
  },
});
