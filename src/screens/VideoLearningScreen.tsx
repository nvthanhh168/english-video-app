import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VideoPagerFeed } from '../components/video/VideoPagerFeed';
import { SAMPLE_LESSONS } from '../data/mockVideos';

export const VideoLearningScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        {/* Module 1: Trình phát video TikTok-style với 3 phân vùng dọc */}
        <VideoPagerFeed lessons={SAMPLE_LESSONS} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
  },
});
