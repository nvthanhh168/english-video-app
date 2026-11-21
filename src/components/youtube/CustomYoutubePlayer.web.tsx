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

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface CustomYoutubePlayerRef {
  seekTo: (seconds: number) => void;
  getCurrentTime?: () => Promise<number>;
}

interface CustomYoutubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  playbackRate: number; // 0.5, 0.75, 1.0, 1.25
  onTogglePlayPause: () => void;
  onTimeUpdate: (currentTimeSec: number) => void;
}

export const CustomYoutubePlayer = forwardRef<CustomYoutubePlayerRef, CustomYoutubePlayerProps>(
  (
    { videoId, isPlaying, playbackRate, onTogglePlayPause, onTimeUpdate },
    ref
  ) => {
    const containerId = useRef(`yt-player-${Math.random().toString(36).substring(2, 9)}`).current;
    const playerInstanceRef = useRef<any>(null);
    const [isApiReady, setIsApiReady] = useState<boolean>(false);
    const [showPlayOverlay, setShowPlayOverlay] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        try {
          if (playerInstanceRef.current && typeof playerInstanceRef.current.seekTo === 'function') {
            playerInstanceRef.current.seekTo(seconds, true);
            onTimeUpdate(seconds);
          }
        } catch (e) {
          console.warn('[CustomYoutubePlayer] Lỗi seekTo:', e);
        }
      },
      getCurrentTime: async () => {
        try {
          if (playerInstanceRef.current && typeof playerInstanceRef.current.getCurrentTime === 'function') {
            return playerInstanceRef.current.getCurrentTime() || 0;
          }
        } catch {}
        return 0;
      },
    }));

    // 1. Tải YouTube IFrame Player API Script nếu chưa có trên Web
    useEffect(() => {
      if (typeof window === 'undefined') return;

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        const prevCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevCallback) prevCallback();
          setIsApiReady(true);
        };
      } else if (window.YT && window.YT.Player) {
        setIsApiReady(true);
      } else {
        const interval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            setIsApiReady(true);
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }, []);

    // 2. Khởi tạo YT.Player khi API sẵn sàng
    useEffect(() => {
      if (!isApiReady || typeof window === 'undefined') return;

      try {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.destroy();
        }

        playerInstanceRef.current = new window.YT.Player(containerId, {
          videoId: videoId,
          height: '220',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,        // Ẩn thanh điều khiển gốc
            rel: 0,             // Không hiện video liên quan
            modestbranding: 1,  // Ẩn logo YouTube
            iv_load_policy: 3,  // Ẩn chú thích và pop-up
            playsinline: 1,
            enablejsapi: 1,
            disablekb: 1,       // Vô hiệu hóa phím tắt của YouTube
            fs: 0,              // Tắt nút toàn màn hình mặc định
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.setPlaybackRate(playbackRate);
                if (isPlaying) {
                  event.target.playVideo();
                } else {
                  event.target.pauseVideo();
                }
              } catch {}
            },
            onStateChange: (event: any) => {
              // 1: PLAYING, 2: PAUSED
              if (event.data === 1 && !isPlaying) {
                // đồng bộ khi player tự động phát
              }
            },
          },
        });
      } catch (err) {
        console.warn('[CustomYoutubePlayer] Không thể tạo YT.Player:', err);
      }

      return () => {
        try {
          if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
            playerInstanceRef.current.destroy();
          }
        } catch {}
      };
    }, [isApiReady, videoId]);

    // 3. Đồng bộ Play / Pause thực tế
    useEffect(() => {
      const p = playerInstanceRef.current;
      if (!p) return;

      try {
        if (isPlaying && typeof p.playVideo === 'function') {
          p.playVideo();
        } else if (!isPlaying && typeof p.pauseVideo === 'function') {
          p.pauseVideo();
        }
      } catch {}
    }, [isPlaying]);

    // 4. Đồng bộ Tốc độ phát thực tế
    useEffect(() => {
      const p = playerInstanceRef.current;
      if (!p) return;

      try {
        if (typeof p.setPlaybackRate === 'function') {
          p.setPlaybackRate(playbackRate);
        }
      } catch {}
    }, [playbackRate]);

    // 5. VÒNG LẶP ĐỒNG BỘ THỜI GIAN CHÍNH XÁC 100% TỪ YOUTUBE PLAYER
    useEffect(() => {
      const interval = setInterval(() => {
        const p = playerInstanceRef.current;
        if (p && typeof p.getCurrentTime === 'function') {
          try {
            const realTime = p.getCurrentTime();
            if (typeof realTime === 'number' && !isNaN(realTime)) {
              onTimeUpdate(realTime);
            }
          } catch {}
        }
      }, 200);

      return () => clearInterval(interval);
    }, [onTimeUpdate]);

    const handleTapScreen = () => {
      onTogglePlayPause();
      setShowPlayOverlay(true);
      setTimeout(() => setShowPlayOverlay(false), 700);
    };

    return (
      <View style={styles.container}>
        {/* Khung chứa Iframe được bọc pointerEvents="none" chặn hoàn toàn click ngoài */}
        <View style={styles.videoWrapper} pointerEvents="none">
          <div
            id={containerId}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#000000',
              pointerEvents: 'none',
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
