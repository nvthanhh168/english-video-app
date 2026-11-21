import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { VideoView, VideoPlayer } from 'expo-video';
import { TopicInfo } from '../../types/video';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoTopSectionProps {
  player: VideoPlayer;
  topic: TopicInfo;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
}

export const VideoTopSection: React.FC<VideoTopSectionProps> = ({
  player,
  topic,
  isPlaying,
  onTogglePlayPause,
}) => {
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  const handleTapVideo = () => {
    onTogglePlayPause();
    // Hiển thị icon play/pause trong 800ms
    setShowPlayIcon(true);
    setTimeout(() => {
      setShowPlayIcon(false);
    }, 700);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={handleTapVideo}
        style={styles.touchableArea}
      >
        {/* Luồng phát video sắc nét */}
        <VideoView
          style={styles.videoPlayer}
          player={player}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          contentFit="cover"
        />

        {/* Lớp bóng mờ nhẹ ở góc trên để chữ Topic luôn nổi bật */}
        <View style={styles.topGradient} />

        {/* Badge hiển thị Topic cụm từ đang học ở góc trên */}
        <View style={styles.topicBadge}>
          <Text style={styles.topicEnglish}>{topic.en}</Text>
          <Text style={styles.topicDivider}>/</Text>
          <Text style={styles.topicVietnamese}>{topic.vi}</Text>
        </View>

        {/* Feedback Icon Play/Pause xuất hiện khi chạm vào màn hình */}
        {showPlayIcon && (
          <View style={styles.playPauseOverlay}>
            <View style={styles.playPauseCircle}>
              <Text style={styles.playPauseIcon}>{isPlaying ? '⏸' : '▶'}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 24, // Cách lề 12px mỗi bên tạo bo góc nổi bật
    height: SCREEN_HEIGHT * 0.44, // Chiếm khoảng 44% chiều cao màn hình
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20, // Bo góc mềm mại theo yêu cầu Phần 1
    overflow: 'hidden',
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  touchableArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topicBadge: {
    position: 'absolute',
    top: 12,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
    zIndex: 10,
  },
  topicEnglish: {
    color: '#38BDF8', // Sky 400
    fontWeight: '700',
    fontSize: 13,
  },
  topicDivider: {
    color: '#64748B',
    fontSize: 12,
  },
  topicVietnamese: {
    color: '#E2E8F0',
    fontWeight: '500',
    fontSize: 13,
  },
  playPauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  playPauseCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playPauseIcon: {
    color: '#FFFFFF',
    fontSize: 26,
  },
});
