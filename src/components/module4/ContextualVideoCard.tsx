import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as Haptics from 'expo-haptics';
import { ContextualClip } from '../../types/module4';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ContextualVideoCardProps {
  clip: ContextualClip;
  isActive: boolean;
}

export const ContextualVideoCard: React.FC<ContextualVideoCardProps> = ({
  clip,
  isActive,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const player = useVideoPlayer(clip.video_url, (p) => {
    p.loop = true;
    p.muted = false;
  });

  // Tự động phát khi item đang active
  useEffect(() => {
    if (player) {
      if (isActive) {
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, player]);

  const togglePlayPause = () => {
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

  // Xác định nhãn bối cảnh theo `video_type`
  const getContextBadge = () => {
    switch (clip.video_type) {
      case 'zoom_call_grid':
        return { label: '💻 Zoom Meeting (4-Grid)', color: '#38BDF8' };
      case 'animation':
        return { label: '🎨 Whiteboard Animation', color: '#F59E0B' };
      case 'interview':
        return { label: '🎙️ TV Talkshow Interview', color: '#EC4899' };
      default:
        return { label: '📹 Vlog / Solo Speaker', color: '#10B981' };
    }
  };

  const contextInfo = getContextBadge();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={togglePlayPause}
        style={styles.touchableArea}
      >
        {/* 1. Trình phát Video hỗ trợ đa bối cảnh */}
        <VideoView
          style={styles.videoPlayer}
          player={player}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          contentFit="cover" // Tránh méo hình
        />

        {/* Lưới giả lập 4 camera nếu là dạng zoom_call_grid */}
        {clip.video_type === 'zoom_call_grid' && (
          <View style={styles.zoomGridOverlay}>
            <View style={styles.zoomGridLineH} />
            <View style={styles.zoomGridLineV} />
            <View style={styles.zoomSpeakerBadge}>
              <Text style={styles.zoomSpeakerText}>Speaker Active</Text>
            </View>
          </View>
        )}

        {/* Badge thông tin bối cảnh & giọng điệu */}
        <View style={styles.contextBadgeRow}>
          <View style={[styles.contextBadge, { borderColor: contextInfo.color }]}>
            <Text style={[styles.contextBadgeText, { color: contextInfo.color }]}>
              {contextInfo.label}
            </Text>
          </View>

          {clip.speakerAccent && (
            <View style={styles.accentBadge}>
              <Text style={styles.accentBadgeText}>{clip.speakerAccent}</Text>
            </View>
          )}
        </View>

        {/* Icon Pause khi tạm dừng */}
        {!isPlaying && (
          <View style={styles.pauseOverlay}>
            <View style={styles.pauseCircle}>
              <Text style={styles.pauseIcon}>⏸</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH - 28,
    height: SCREEN_HEIGHT * 0.42, // Chiếm khoảng 42% màn hình trung tâm
    alignSelf: 'center',
    borderRadius: 20, // Bo góc mềm mại theo yêu cầu Phần 1
    overflow: 'hidden',
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  touchableArea: {
    flex: 1,
    position: 'relative',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomGridOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    pointerEvents: 'none',
  },
  zoomGridLineH: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  zoomGridLineV: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  zoomSpeakerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  zoomSpeakerText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  contextBadgeRow: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 10,
  },
  contextBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  contextBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  accentBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  accentBadgeText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: 'bold',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pauseIcon: {
    color: '#FFFFFF',
    fontSize: 22,
  },
});
