import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InspiringHeaderProps {
  headerText: string;
}

export const InspiringHeader: React.FC<InspiringHeaderProps> = ({ headerText }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.tagline}>LỘ TRÌNH HỌC TẬP CEFR DÀI HẠN</Text>
      <Text style={styles.titleText}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tagline: {
    color: '#4F46E5', // Indigo 600
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#0F172A', // Slate 900
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 31,
    letterSpacing: -0.4,
    textAlign: 'left',
  },
});
