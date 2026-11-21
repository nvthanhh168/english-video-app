import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PathHeaderProps {
  title?: string;
}

export const PathHeader: React.FC<PathHeaderProps> = ({
  title = 'Mastering English requires long-term, immersive input.',
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.mainTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
});
