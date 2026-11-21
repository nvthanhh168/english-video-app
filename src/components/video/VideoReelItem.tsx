import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useVideoPlayer as useExpoVideoPlayer, VideoView } from 'expo-video';
import { VideoReel } from '../../types/video';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { BilingualSubtitles } from './BilingualSubtitles';
import { BottomToolbar } from './BottomToolbar';
import { BlindListeningToggle } from './BlindListeningToggle';
import { DisplaySettingsModal } from './DisplaySettingsModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoReelItemProps {
  reel: VideoReel;
  isActive: boolean; // Chỉ phát video khi item này đang nằm trong màn hình nhìn thấy
  onOpenBreakdown?: () => void;
}

export const VideoReelItem: React.FC<VideoReelItemProps> = ({
  reel,
  isActive,
  onOpenBreakdown,
}) => {
  const {
    settings,
    currentSentence,
    setCurrentPositionMs,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    copiedNotification,
    toggleBlindListening,
    cyclePlaybackSpeed,
    toggleLoop,
    copyCurrentSentence,
    toggleBookmark,
    toggleFavorite,
    updateDisplaySettings,
  } = useVideoPlayer({ reel });

  // Khởi tạo expo-video player
  const player = useExpoVideoPlayer(reel.videoUrl, (p) => {
    p.loop = true;
    p.muted = false;
  });

  // Đồng bộ tốc độ phát video
  useEffect(() => {
    if (player) {
      player.playbackRate = settings.playbackRate;
    }
  }, [player, settings.playbackRate]);

  // Điều khiển Play / Pause theo trạng thái isActive
  useEffect(() => {
    if (player) {
      if (isActive) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isActive, player]);

  // Lắng nghe cập nhật thời gian phát để đồng bộ phụ đề và thực hiện loop câu
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player.isPlaying) {
        const currentTimeMs = Math.floor(player.currentTime * 1000);
        setCurrentPositionMs(currentTimeMs);

        // Logic Lặp lại câu (Loop Mode)
        if (settings.isLooping && currentSentence) {
          if (currentTimeMs >= currentSentence.endTimeMs) {
            player.currentTime = currentSentence.startTimeMs / 1000;
          }
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [player, settings.isLooping, currentSentence, setCurrentPositionMs]);

  return (
    <View style={styles.container}>
      {/* 1. Trình phát Video toàn màn hình */}
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        contentFit="cover"
      />

      {/* Lớp phủ Gradient tối nhẹ để text phụ đề luôn đọc rõ */}
      <View style={styles.darkGradientOverlay} />

      {/* 2. Header Top Bar (Level, Giọng điệu, và Nút Nghe Mù) */}
      <View style={styles.topHeader}>
        <View style={styles.authorBadge}>
          <View style={styles.levelTag}>
            <Text style={styles.levelTagText}>{reel.level}</Text>
          </View>
          <View style={styles.accentTag}>
            <Text style={styles.accentTagText}>{reel.accent}</Text>
          </View>
          <Text style={styles.authorName} numberOfLines={1}>
            {reel.authorName}
          </Text>
        </View>

        {/* Nút Chuyển chế độ Nghe Mù */}
        <BlindListeningToggle
          isBlindListening={settings.isBlindListening}
          onToggle={toggleBlindListening}
        />
      </View>

      {/* 3. Toast thông báo đã sao chép */}
      {copiedNotification && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ Đã sao chép câu vào bộ nhớ tạm!</Text>
        </View>
      )}

      {/* 4. Vùng thông tin dưới đáy: Phụ đề + Toolbar */}
      <View style={styles.bottomArea}>
        {/* Phụ đề Song ngữ Thông minh */}
        <BilingualSubtitles
          sentence={currentSentence}
          isBlindListening={settings.isBlindListening}
          fontSize={settings.fontSize}
          fontFamily={settings.fontFamily}
          onPressRevealSubtitles={toggleBlindListening}
        />

        {/* Thanh công cụ học tập (Bottom Toolbar) */}
        <BottomToolbar
          playbackRate={settings.playbackRate}
          isLooping={settings.isLooping}
          isBookmarked={settings.isBookmarked}
          isFavorite={settings.isFavorite}
          onPressFontSettings={() => setIsSettingsModalOpen(true)}
          onPressLoop={toggleLoop}
          onPressSpeed={cyclePlaybackSpeed}
          onPressCopy={copyCurrentSentence}
          onPressBookmark={toggleBookmark}
          onPressFavorite={toggleFavorite}
        />
      </View>

      {/* 5. Modal cài đặt Font chữ */}
      <DisplaySettingsModal
        visible={isSettingsModalOpen}
        fontSize={settings.fontSize}
        fontFamily={settings.fontFamily}
        onClose={() => setIsSettingsModalOpen(false)}
        onSelectFontSize={(size) => updateDisplaySettings({ fontSize: size })}
        onSelectFontFamily={(family) => updateDisplaySettings({ fontFamily: family })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'space-between',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 6,
  },
  levelTag: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  levelTagText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  accentTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  accentTagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  authorName: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 13,
    maxWidth: 110,
  },
  toast: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 20,
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  bottomArea: {
    paddingBottom: 28,
    zIndex: 10,
  },
});
