import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChunkToken } from '../../types/module3';

interface Props {
  chunks: ChunkToken[];
  translation: string;
}

export const MeaningfulChunking: React.FC<Props> = ({ chunks, translation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Meaningful Chunking</Text>
        <View style={styles.infoIcon}>
          <Text style={styles.infoText}>i</Text>
        </View>
      </View>

      {/* Khối hiển thị các chunks đa màu xen kẽ */}
      <View style={styles.chunksWrapper}>
        {chunks.map((chunk, index) => (
          <View
            key={index}
            style={[styles.chunkBlock, { backgroundColor: chunk.bgColor }]}
          >
            <Text style={styles.chunkText}>{chunk.text}</Text>
          </View>
        ))}
      </View>

      {/* Dịch nghĩa toàn câu */}
      <Text style={styles.translationText}>{translation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E5E7EB', // Trắng xám
    marginRight: 8,
  },
  infoIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  chunksWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Tự động xuống dòng nếu câu dài
    marginBottom: 12,
    gap: 4,
  },
  chunkBlock: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 2,
    marginBottom: 4,
  },
  chunkText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 26,
  },
  translationText: {
    fontSize: 14.5,
    color: '#9CA3AF',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
