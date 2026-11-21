import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ContextualClip, TargetPhrase } from '../../types/module4';
import { ContextualVideoCard } from './ContextualVideoCard';
import { ContextualBottomSubtitles } from './ContextualBottomSubtitles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ContextualReelPageProps {
  clip: ContextualClip;
  targetPhrase: TargetPhrase;
  isActive: boolean;
}

export const ContextualReelPage: React.FC<ContextualReelPageProps> = ({
  clip,
  targetPhrase,
  isActive,
}) => {
  return (
    <View style={styles.pageContainer}>
      {/* Khoảng đệm phía trên để chừa không gian cho Pinned Header */}
      <View style={styles.topSpacer} />

      {/* 1. Khung phát video trung tâm */}
      <ContextualVideoCard clip={clip} isActive={isActive} />

      {/* 2. Khu vực phụ đề & Toolbar dưới đáy */}
      <ContextualBottomSubtitles
        subtitles={clip.subtitles}
        targetPhrase={targetPhrase}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#050811', // Dark Mode
    justifyContent: 'space-between',
  },
  topSpacer: {
    height: 125, // Chừa khoảng trống an toàn cho Pinned Header cố định
  },
});
