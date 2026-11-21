import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SentenceBreakdownHeaderProps {
  onClose?: () => void;
}

export const SentenceBreakdownHeader: React.FC<SentenceBreakdownHeaderProps> = () => {
  return (
    <View style={styles.headerContainer}>
      {/* 1. Thanh gạch ngang báo hiệu có thể vuốt xuống (Drag Indicator) */}
      <View style={styles.dragIndicator} />

      {/* 2. Tiêu đề chính "Sentence Breakdown" */}
      <Text style={styles.title}>Sentence Breakdown</Text>

      {/* 3. Subtitle nhỏ màu xám "Your AI helper explains" */}
      <Text style={styles.subtitle}>Your AI helper explains</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#121212',
  },
  dragIndicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3F3F46', // Zinc 700
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#A1A1AA', // Zinc 400
    fontSize: 12.5,
    fontWeight: '500',
    marginTop: 3,
  },
});
