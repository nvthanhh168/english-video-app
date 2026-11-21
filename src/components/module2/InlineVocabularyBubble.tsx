import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LessonContent } from '../../types/module2';
import { tokenizeSentence } from '../../utils/sentenceTokenizer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InlineVocabularyBubbleProps {
  content: LessonContent;
  onPressKeyWord?: (word: string, meaning?: string) => void;
}

export const InlineVocabularyBubble: React.FC<InlineVocabularyBubbleProps> = ({
  content,
  onPressKeyWord,
}) => {
  // 1. Thực hiện thuật toán tokenize câu tiếng Anh và ánh xạ keyword
  const tokens = useMemo(() => {
    return tokenizeSentence(content.englishSentence, content.keyWords);
  }, [content.englishSentence, content.keyWords]);

  const handleKeyWordPress = (word: string, meaning?: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPressKeyWord) {
      onPressKeyWord(word, meaning);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* 1. Khu vực hiển thị câu tiếng Anh kết hợp Micro-translation tại chỗ */}
      <View style={styles.sentenceWrapper}>
        <View style={styles.wordsFlexRow}>
          {tokens.map((token) => {
            if (token.isKeyWord) {
              return (
                <TouchableOpacity
                  key={token.id}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleKeyWordPress(token.text, token.vietnameseMeaning)
                  }
                  style={styles.keyWordTokenColumn}
                >
                  {/* Từ khóa có background màu nổi bật (Xanh mint / Pastel) */}
                  <View
                    style={[
                      styles.highlightBadge,
                      { backgroundColor: token.highlightColor || '#A7F3D0' },
                    ]}
                  >
                    <Text style={styles.keyWordText}>{token.text}</Text>
                  </View>

                  {/* Nghĩa tiếng Việt hiển thị siêu nhỏ ngay phía dưới */}
                  {token.vietnameseMeaning && (
                    <Text style={styles.microMeaningText} numberOfLines={1}>
                      {token.vietnameseMeaning}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            }

            // Từ thông thường trong câu
            return (
              <View key={token.id} style={styles.normalTokenColumn}>
                <View style={styles.normalWordBox}>
                  <Text style={styles.normalWordText}>{token.text}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Đường phân cách mảnh tinh tế */}
      <View style={styles.divider} />

      {/* 2. Dịch nguyên câu: Bản dịch tiếng Việt hoàn chỉnh ở dưới cùng */}
      <View style={styles.translationContainer}>
        <Text style={styles.translationLabel}>Bản dịch gợi ý:</Text>
        <Text style={styles.translationText}>
          "{content.vietnameseTranslation}"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH - 40,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF', // Nền sáng sạch sẽ theo yêu cầu
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginVertical: 8,
  },
  sentenceWrapper: {
    marginBottom: 16,
  },
  wordsFlexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Tự động co giãn xuống dòng đẹp mắt trên mọi màn hình
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 6,
  },
  keyWordTokenColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  highlightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  keyWordText: {
    color: '#065F46', // Xanh lục đậm tương phản tốt trên nền mint
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  microMeaningText: {
    color: '#64748B', // Màu xám chuẩn Slate 500
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 3,
    textAlign: 'center',
  },
  normalTokenColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  normalWordBox: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  normalWordText: {
    color: '#1E293B', // Xám đậm / Xanh tím nổi bật
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 25,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9', // Slate 100
    marginVertical: 12,
  },
  translationContainer: {
    paddingTop: 2,
  },
  translationLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  translationText: {
    color: '#334155', // Slate 700
    fontSize: 14.5,
    fontStyle: 'italic',
    lineHeight: 22,
    fontWeight: '500',
  },
});
