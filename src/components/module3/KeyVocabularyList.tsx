import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VocabularyItem } from '../../types/module3';

interface Props {
  items: VocabularyItem[];
}

export const KeyVocabularyList: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Key Vocabulary</Text>

      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={index} style={styles.vocabRow}>
            {/* Dấu chấm tròn bullet nhỏ màu tím */}
            <View style={styles.bulletDot} />

            <Text style={styles.vocabContentText}>
              {/* Từ khóa tiếng Anh: in đậm, màu trắng nổi bật */}
              <Text style={styles.englishWord}>{item.word}</Text>

              {/* Ký tự phân cách em-dash màu xám */}
              <Text style={styles.separator}> — </Text>

              {/* Giải thích từ loại và nghĩa tiếng Việt */}
              <Text style={styles.definitionText}>{item.definition}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1E1E22',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6', // Purple 500
    marginTop: 8,
    marginRight: 10,
  },
  vocabContentText: {
    flex: 1,
    lineHeight: 22,
  },
  englishWord: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  separator: {
    color: '#71717A',
    fontSize: 14,
  },
  definitionText: {
    color: '#D4D4D8',
    fontSize: 14,
    fontWeight: '400',
  },
});
