import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MOCK_CONTEXTUAL_SESSION } from '../data/mockContextualPlaylists';
import { PinnedTargetHeader } from '../components/module4/PinnedTargetHeader';
import { ContextualVideoFeed } from '../components/module4/ContextualVideoFeed';
import { SwipeGestureGuideOverlay } from '../components/module4/SwipeGestureGuideOverlay';

export const ContextualMasteryScreen: React.FC = () => {
  const session = MOCK_CONTEXTUAL_SESSION;
  const [currentClipIndex, setCurrentClipIndex] = useState<number>(0);
  const [showGuideOverlay, setShowGuideOverlay] = useState<boolean>(true);

  return (
    <SafeAreaProvider>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {/* 1. Header Ghim cố định ở góc trên bên trái (Pinned Fixed) */}
        <PinnedTargetHeader
          targetPhrase={session.target_phrase}
          currentIndex={currentClipIndex}
          totalClips={session.total_clips}
          onClose={() => alert('Thoát buổi học ngấm từ vựng')}
        />

        {/* 2. Danh sách video vuốt dọc Snapping (TikTok/Reels style) */}
        <ContextualVideoFeed
          session={session}
          onActiveIndexChange={setCurrentClipIndex}
          onUserSwiped={() => setShowGuideOverlay(false)}
        />

        {/* 3. Lớp phủ hướng dẫn vuốt ở clip đầu tiên (Onboarding Gesture Overlay) */}
        <SwipeGestureGuideOverlay
          visible={showGuideOverlay}
          onDismiss={() => setShowGuideOverlay(false)}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#050811',
  },
});
