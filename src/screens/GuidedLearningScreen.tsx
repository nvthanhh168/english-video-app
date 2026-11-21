import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as Haptics from 'expo-haptics';
import { GuidedLesson } from '../types/guided';
import { MascotHeader } from '../components/guided/MascotHeader';
import { InlineVocabularyCard } from '../components/guided/InlineVocabularyCard';
import { NextStepCTA } from '../components/guided/NextStepCTA';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Dữ liệu bài học mẫu Module 2
const SAMPLE_GUIDED_LESSONS: GuidedLesson[] = [
  {
    id: 'lesson_002',
    aiMascot: {
      message: 'Can you understand the following clip? 🤔',
    },
    video: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: '',
    },
    content: {
      englishSentence:
        'What is the best way to improve your spoken English and overall fluency?',
      vietnameseTranslation:
        'Cách tốt nhất để cải thiện tiếng Anh nói và độ trôi chảy tổng thể là gì?',
      keyWords: [
        {
          word: 'fluency',
          vietnameseMeaning: 'độ trôi chảy',
          highlightColor: '#A7F3D0',
        },
        {
          word: 'spoken English',
          vietnameseMeaning: 'tiếng Anh nói',
          highlightColor: '#BAE6FD',
        },
      ],
    },
  },
  {
    id: 'lesson_001',
    aiMascot: {
      message: 'Great job! 🥳 Ready for a more challenging one?',
    },
    video: {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: '',
    },
    content: {
      englishSentence:
        'So we are at the garden center looking for the perfect plant and pot.',
      vietnameseTranslation:
        'Vậy là chúng tôi đang ở trung tâm cây cảnh để tìm cây và chậu hoàn hảo.',
      keyWords: [
        {
          word: 'plant',
          vietnameseMeaning: 'cây trồng',
          highlightColor: '#A7F3D0',
        },
        {
          word: 'pot',
          vietnameseMeaning: 'chậu cây',
          highlightColor: '#FDE68A',
        },
        {
          word: 'garden center',
          vietnameseMeaning: 'tiệm cây cảnh',
          highlightColor: '#DDD6FE',
        },
      ],
    },
  },
];

export const GuidedLearningScreen: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const lesson = SAMPLE_GUIDED_LESSONS[currentIdx];

  // Trình phát video mini ở giữa màn hình
  const player = useVideoPlayer(lesson.video.videoUrl, (p) => {
    p.loop = true;
    p.muted = false;
    p.play();
  });

  const togglePlay = () => {
    if (!player) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (player.isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_GUIDED_LESSONS.length);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. MascotHeader: Avatar chim cánh cụt & Bong bóng chat thoại */}
          <MascotHeader mascot={lesson.aiMascot} />

          {/* 2. MiniVideoPlayer: Video thu nhỏ ở giữa, bo góc tròn 20px */}
          <View style={styles.miniVideoCard}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={togglePlay}
              style={styles.touchableArea}
            >
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen={false}
                allowsPictureInPicture={false}
                contentFit="cover"
              />

              {/* Nút Play mờ ở chính giữa nếu tạm dừng */}
              {!isPlaying && (
                <View style={styles.playOverlay}>
                  <View style={styles.playCircle}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* 3. InlineVocabularyCard: Bóc tách chuỗi & Micro-translation dưới từ khóa */}
          <InlineVocabularyCard
            englishSentence={lesson.content.englishSentence}
            vietnameseTranslation={lesson.content.vietnameseTranslation}
            keyWords={lesson.content.keyWords}
          />
        </ScrollView>

        {/* 4. NextStepCTA: Nút viên thuốc xanh tím (Pill shape) với Reanimated Scale */}
        <NextStepCTA onPress={handleNextStep} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Nền sáng sạch sẽ
    justifyContent: 'space-between',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  miniVideoCard: {
    width: SCREEN_WIDTH - 32,
    height: 195,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 10,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  touchableArea: {
    flex: 1,
    position: 'relative',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  playIcon: {
    fontSize: 22,
    color: '#4F46E5',
    marginLeft: 3,
  },
});
