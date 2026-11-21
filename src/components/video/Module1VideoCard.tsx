import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useVideoPlayer as useExpoVideoPlayer } from 'expo-video';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { VideoLessonItem, PlaybackRate, SubtitleSize } from '../../types/video';
import { VideoTopSection } from './VideoTopSection';
import { MiddleSubtitleSection } from './MiddleSubtitleSection';
import { BottomToolbar } from './BottomToolbar';
import { DisplaySettingsSheet } from './DisplaySettingsSheet';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Module1VideoCardProps {
  lesson: VideoLessonItem;
  isActive: boolean;
  onAutoAdvance: () => void;
}

export const Module1VideoCard: React.FC<Module1VideoCardProps> = ({
  lesson,
  isActive,
  onAutoAdvance,
}) => {
  // State quản lý các nút và chế độ học tập
  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isBlindListening, setIsBlindListening] = useState<boolean>(
    lesson.isBlindListeningEnabled
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    lesson.userStates.isBookmarked
  );
  const [isStarred, setIsStarred] = useState<boolean>(
    lesson.userStates.isStarred
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<SubtitleSize>('normal');
  const [showSettingsSheet, setShowSettingsSheet] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Khởi tạo trình phát expo-video
  const player = useExpoVideoPlayer(lesson.videoUrl, (p) => {
    p.loop = isLooping;
    p.muted = false;
  });

  // 1. Quản lý Lifecycle khi chuyển trang (Swipe Up/Down)
  useEffect(() => {
    if (!player) return;

    if (isActive) {
      // Yêu cầu Phần 2.1: Tự động phát (Auto-play) và tự động reset tốc độ về 1.0x
      setPlaybackRate(1.0);
      player.playbackRate = 1.0;
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  }, [isActive, player]);

  // Cập nhật tốc độ phát video vào player khi thay đổi
  useEffect(() => {
    if (player) {
      player.playbackRate = playbackRate;
    }
  }, [player, playbackRate]);

  // Cập nhật chế độ Loop vào player
  useEffect(() => {
    if (player) {
      player.loop = isLooping;
    }
  }, [player, isLooping]);

  // Lắng nghe sự kiện phát hết video
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player.isPlaying && player.duration > 0) {
        // Kiểm tra nếu đã phát đến cuối video
        if (player.currentTime >= player.duration - 0.2) {
          if (!isLooping) {
            // Yêu cầu Phần 2.4 - Nút 2: Tự động nhảy sang câu tiếp theo khi Loop = Off
            onAutoAdvance();
          } else {
            // Lặp lại từ đầu
            player.currentTime = 0;
            player.play();
          }
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [player, isLooping, onAutoAdvance]);

  // Hàm hiển thị Toast thông báo
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Toggle Play / Pause khi chạm 1 lần vào video (Phần 2.1)
  const handleTogglePlayPause = useCallback(() => {
    if (!player) return;
    if (player.isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [player]);

  // Nút 2: Toggle Vòng lặp (Loop)
  const handleToggleLoop = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLooping((prev) => {
      const next = !prev;
      showToast(next ? 'Đã bật lặp lại câu (Loop On)' : 'Chế độ tự chuyển tiếp (Auto-next)');
      return next;
    });
  }, []);

  // Nút 3: Tốc độ chậm (1.0x -> 0.75x -> 0.5x -> 1.0x)
  const handleCyclePlaybackRate = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlaybackRate((prev) => {
      let next: PlaybackRate = 1.0;
      if (prev === 1.0) next = 0.75;
      else if (prev === 0.75) next = 0.5;
      else next = 1.0;

      showToast(`Tốc độ phát: ${next}x`);
      return next;
    });
  }, []);

  // Nút 4: Copy nguyên gốc câu tiếng Anh vào Clipboard
  const handleCopyEnglishText = useCallback(async () => {
    await Clipboard.setStringAsync(lesson.subtitles.en);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast('Đã sao chép');
  }, [lesson.subtitles.en]);

  // Nút 5: Lưu câu (Bookmark)
  const handleToggleBookmark = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsBookmarked((prev) => {
      const next = !prev;
      showToast(next ? 'Đã lưu câu vào sổ từ vựng' : 'Đã bỏ lưu câu');
      return next;
    });
  }, []);

  // Nút 6: Yêu thích (Star)
  const handleToggleStar = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsStarred((prev) => {
      const next = !prev;
      showToast(next ? 'Đã thêm vào mục yêu thích' : 'Đã bỏ yêu thích');
      return next;
    });
  }, []);

  // Toggle Chế độ Nghe Mù
  const handleToggleBlindListening = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsBlindListening((prev) => !prev);
  }, []);

  return (
    <View style={styles.cardContainer}>
      {/* 1. KHU VỰC VIDEO (Top - 40-50% phía trên) */}
      <VideoTopSection
        player={player}
        topic={lesson.topic}
        isPlaying={isPlaying}
        onTogglePlayPause={handleTogglePlayPause}
      />

      {/* Toast thông báo nổi */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* 2. KHU VỰC PHỤ ĐỀ (Middle - Căn lề trái, highlight keyWords & Blur) */}
      <MiddleSubtitleSection
        subtitles={lesson.subtitles}
        keyWords={lesson.keyWords}
        isBlindListening={isBlindListening}
        fontSize={fontSize}
        onToggleBlindListening={handleToggleBlindListening}
      />

      {/* 3. KHU VỰC THANH CÔNG CỤ (Bottom - Cố định dưới cùng) */}
      <BottomToolbar
        playbackRate={playbackRate}
        isLooping={isLooping}
        isBookmarked={isBookmarked}
        isStarred={isStarred}
        onPressFontSettings={() => setShowSettingsSheet(true)}
        onToggleLoop={handleToggleLoop}
        onCyclePlaybackRate={handleCyclePlaybackRate}
        onCopyEnglishText={handleCopyEnglishText}
        onToggleBookmark={handleToggleBookmark}
        onToggleStar={handleToggleStar}
      />

      {/* Bottom Sheet cài đặt cỡ chữ */}
      <DisplaySettingsSheet
        visible={showSettingsSheet}
        fontSize={fontSize}
        onClose={() => setShowSettingsSheet(false)}
        onSelectFontSize={setFontSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#050811', // Dark Mode chủ đạo
    justifyContent: 'space-between',
    paddingTop: 48,
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
