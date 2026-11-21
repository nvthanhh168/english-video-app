import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  paragraphs: string[];
}

export const DifficultyAnalysis: React.FC<Props> = ({ paragraphs }) => {
  // Tự động nhận diện và highlight các từ khóa tiếng Anh trong văn bản giải thích
  const renderHighlightedText = (text: string) => {
    const englishRegex = /(want|you|to|Ask you to take part in an experiment|take part in|experiment)/gi;
    const parts = text.split(englishRegex);

    return (
      <Text style={styles.paragraphText}>
        {parts.map((part, idx) => {
          if (englishRegex.test(part)) {
            return (
              <Text key={idx} style={styles.highlightedTerm}>
                {part}
              </Text>
            );
          }
          return <Text key={idx}>{part}</Text>;
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Difficulty Analysis</Text>

        {/* Badge Send feedback */}
        <TouchableOpacity
          style={styles.feedbackBadge}
          onPress={() => alert('Cảm ơn bạn! Phản hồi đã được gửi tới AI Tutor.')}
          activeOpacity={0.7}
        >
          <Text style={styles.feedbackIcon}>💬</Text>
          <Text style={styles.feedbackText}>Send feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {paragraphs.map((para, index) => (
          <View
            key={index}
            style={[
              styles.paragraphBlock,
              index > 0 && styles.paragraphBlockBorder,
            ]}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconSymbol}>💡</Text>
            </View>
            <View style={styles.textWrap}>{renderHighlightedText(para)}</View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  feedbackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 4,
  },
  feedbackIcon: {
    fontSize: 11,
  },
  feedbackText: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#1E1E22',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  paragraphBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 4,
  },
  paragraphBlockBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12,
    marginTop: 8,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  iconSymbol: {
    fontSize: 13,
  },
  textWrap: {
    flex: 1,
  },
  paragraphText: {
    color: '#D4D4D8',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
  },
  highlightedTerm: {
    color: '#FFFFFF',
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
