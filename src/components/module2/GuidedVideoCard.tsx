import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as Haptics from 'expo-haptics';
import { VideoCardData } from '../../types/module2';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GuidedVideoCardProps {
  video: VideoCardData;
}

export const GuidedVideoCard: React.FC<GuidedVideoCardProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const player = useVideoPlayer(video.videoUrl, (p) => {
    p.loop = true;
    p.muted = false;
  });

  const handleTogglePlay = () => {
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

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        setIsPlaying(player.isPlaying);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [player]);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleTogglePlay}
        style={styles.touchableArea}
      >
        <VideoView
          style={styles.videoPlayer}
          player={player}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          contentFit="cover"
        />

        {/* Nút Play mờ ở chính giữa (Translucent Play Button) */}
        {!isPlaying && (
          <View style={styles.playButtonWrapper}>
            <View style={styles.playButtonCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH - 40,
    height: 210,
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 20, // Bo góc mềm mại theo yêu cầu
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
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
  playButtonWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  playIcon: {
    fontSize: 22,
    color: '#4F46E5', // Indigo 600
    marginLeft: 3,
  },
});
