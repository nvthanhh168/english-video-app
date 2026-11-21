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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CustomYoutubePlayerRef {
  seekTo: (seconds: number) => void;
  getCurrentTime?: () => Promise<number>;
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
    const iframeRef = useRef<any>(null);
    const [showPlayOverlay, setShowPlayOverlay] = useState(false);
    const currentTimeRef = useRef<number>(0);

    // Gửi lệnh YouTube IFrame API qua postMessage
    const sendCommand = (func: string, args: any[] = []) => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func, args }),
            '*'
          );
        }
      } catch (e) {
        // Bỏ qua lỗi cross-origin
      }
    };

    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        currentTimeRef.current = seconds;
        onTimeUpdate(seconds);
        sendCommand('seekTo', [seconds, true]);
      },
      getCurrentTime: async () => {
        return currentTimeRef.current;
      },
    }));

    // Cập nhật trạng thái Play/Pause trên Web
    useEffect(() => {
      if (isPlaying) {
        sendCommand('playVideo');
      } else {
        sendCommand('pauseVideo');
      }
    }, [isPlaying]);

    // Cập nhật tốc độ phát trên Web
    useEffect(() => {
      sendCommand('setPlaybackRate', [playbackRate]);
    }, [playbackRate]);

    // Vòng lặp cập nhật thời gian phát mô phỏng mượt mà cho Web (250ms/lần)
    useEffect(() => {
      if (!isPlaying) return;

      const interval = setInterval(() => {
        currentTimeRef.current += 0.25 * playbackRate;
        onTimeUpdate(currentTimeRef.current);
      }, 250);

      return () => clearInterval(interval);
    }, [isPlaying, playbackRate, onTimeUpdate]);

    const handleTapScreen = () => {
      onTogglePlayPause();
      setShowPlayOverlay(true);
      setTimeout(() => setShowPlayOverlay(false), 700);
    };

    // Embed URL chuẩn YouTube No-Cookie: Ẩn controls, ẩn đề xuất, ẩn logo
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;

    return (
      <View style={styles.container}>
        {/* Khung IFrame Web chặn hoàn toàn thao tác click vào video gốc */}
        <View style={styles.videoWrapper} pointerEvents="none">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title="Clean YouTube Player"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#000000',
              pointerEvents: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
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
