import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface NoSubVideoPlayerProps {
  videoUrl: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export const NoSubVideoPlayer: React.FC<NoSubVideoPlayerProps> = ({
  videoUrl,
  autoPlay = true,
  loop = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = loop;
    p.muted = false;
    if (autoPlay) {
      p.play();
    }
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

  const replayAudio = () => {
    if (!player) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    player.currentTime = 0;
    player.play();
    setIsPlaying(true);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={togglePlay}
        style={styles.touchableArea}
      >
        {/* Trình phát Video KHÔNG HIỂN THỊ PHỤ ĐỀ */}
        <VideoView
          style={styles.videoPlayer}
          player={player}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          contentFit="cover"
        />

        {/* Lớp phủ biểu tượng Nghe mù - Tai nghe góc trên */}
        <View style={styles.audioOnlyBadge}>
          <Text style={styles.audioOnlyIcon}>🎧</Text>
          <Text style={styles.audioOnlyText}>Luyện nghe (Che phụ đề)</Text>
        </View>

        {/* Nút Play lớn ở giữa khi tạm dừng */}
        {!isPlaying && (
          <View style={styles.centerPlayOverlay}>
            <View style={styles.playCircle}>
              <Text style={styles.playIconGlyph}>▶</Text>
            </View>
          </View>
        )}

        {/* Nút nghe lại nhanh ở góc dưới */}
        <TouchableOpacity
          style={styles.replayButton}
          onPress={replayAudio}
          activeOpacity={0.8}
        >
          <Text style={styles.replayIcon}>🔁 Nghe lại câu</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH - 32,
    height: 190,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  touchableArea: {
    flex: 1,
    position: 'relative',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  audioOnlyBadge: {
    position: 'absolute',
    top: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    gap: 5,
  },
  audioOnlyIcon: {
    fontSize: 12,
  },
  audioOnlyText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  centerPlayOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  playIconGlyph: {
    color: '#4F46E5',
    fontSize: 24,
    marginLeft: 3,
  },
  replayButton: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  replayIcon: {
    color: '#F8FAFC',
    fontSize: 11.5,
    fontWeight: '700',
  },
});
