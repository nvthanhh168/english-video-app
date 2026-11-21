import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CustomYoutubePlayerRef {
  seekTo: (seconds: number) => void;
}

interface CustomYoutubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  playbackRate: number; // 0.5, 0.75, 1.0
  onTogglePlayPause: () => void;
  onTimeUpdate: (currentTimeSec: number) => void;
}

export const CustomYoutubePlayer = forwardRef<CustomYoutubePlayerRef, CustomYoutubePlayerProps>(
  (
    { videoId, isPlaying, playbackRate, onTogglePlayPause, onTimeUpdate },
    ref
  ) => {
    const playerRef = useRef<any>(null);
    const [showPlayOverlay, setShowPlayOverlay] = useState(false);

    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        try {
          if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds, true);
          }
        } catch (err) {
          console.warn('[CustomYoutubePlayer] Seek error:', err);
        }
      },
    }));

    // Vòng lặp cập nhật thời gian phát hiện tại từ Iframe (200ms/lần)
    useEffect(() => {
      const interval = setInterval(async () => {
        if (playerRef.current && isPlaying) {
          try {
            const currentTime = await playerRef.current.getCurrentTime();
            if (typeof currentTime === 'number') {
              onTimeUpdate(currentTime);
            }
          } catch {
            // Bỏ qua lỗi ngầm khi iframe chưa sẵn sàng
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }, [isPlaying, onTimeUpdate]);

    // Đồng bộ tốc độ phát video
    useEffect(() => {
      if (playerRef.current) {
        try {
          playerRef.current.setPlaybackRate?.(playbackRate);
        } catch {}
      }
    }, [playbackRate]);

    const handleTapScreen = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onTogglePlayPause();
      setShowPlayOverlay(true);
      setTimeout(() => setShowPlayOverlay(false), 700);
    };

    return (
      <View style={styles.container}>
        {/* 
          Thủ thuật Chặn UI & Quảng cáo YouTube: 
          1. pointerEvents="none" chặn mọi click trực tiếp vào Iframe gốc của YouTube (chặn click quảng cáo, gợi ý, logo).
          2. playerVars ẩn controls, rel=0, modestbranding=1, iv_load_policy=3
        */}
        <View style={styles.videoWrapper} pointerEvents="none">
          <YoutubePlayer
            ref={playerRef}
            height={220}
            width={SCREEN_WIDTH}
            play={isPlaying}
            videoId={videoId}
            initialPlayerParams={{
              preventFullScreen: true,
              controls: false, // Ẩn hoàn toàn thanh điều khiển gốc của YouTube
              rel: false,      // Không hiện video đề xuất
              modestbranding: true,
              iv_load_policy: 3, // Ẩn chú thích và banner pop-up
            }}
          />
        </View>

        {/* Lớp phủ tương tác chạm (Touch Overlay) của App */}
        <TouchableOpacity
          style={styles.touchOverlay}
          activeOpacity={1}
          onPress={handleTapScreen}
        >
          {/* Badge Không Quảng Cáo */}
          <View style={styles.adFreeBadge}>
            <Text style={styles.adFreeIcon}>🛡️</Text>
            <Text style={styles.adFreeText}>Ad-Free Clean Player</Text>
          </View>

          {/* Play/Pause feedback icon */}
          {showPlayOverlay && (
            <View style={styles.playPauseCenterIcon}>
              <View style={styles.circleIcon}>
                <Text style={styles.glyph}>{isPlaying ? '▶' : '⏸'}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoWrapper: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  adFreeBadge: {
    position: 'absolute',
    top: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    gap: 4,
  },
  adFreeIcon: {
    fontSize: 10,
  },
  adFreeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  playPauseCenterIcon: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  circleIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  glyph: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});
