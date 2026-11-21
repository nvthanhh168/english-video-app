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
  ActivityIndicator,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SubtitleItem {
  id?: string;
  startTime?: number; // ms
  duration?: number;  // ms
  start?: number;     // s
  end?: number;       // s
  textEn?: string;
  textVi?: string;
  english?: string;
  vietnamese?: string;
}

export interface CustomYoutubePlayerRef {
  seekTo: (seconds: number) => void;
  getCurrentTime?: () => Promise<number>;
}

interface CustomYoutubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  playbackRate: number; // 0.5, 0.75, 1.0, 1.25
  subtitles?: SubtitleItem[]; // Mảng phụ đề
  isLoadingSubtitles?: boolean; // Cờ báo đang tải phụ đề
  activeSubtitle?: {
    textEn: string;
    textVi: string;
  } | null;
  showInVideoSubtitle?: boolean;
  onTogglePlayPause: () => void;
  onTimeUpdate: (currentTimeSec: number) => void;
  onSubtitleIndexChange?: (index: number) => void;
}

export const CustomYoutubePlayer = forwardRef<CustomYoutubePlayerRef, CustomYoutubePlayerProps>(
  (
    {
      videoId,
      isPlaying,
      playbackRate,
      subtitles = [],
      isLoadingSubtitles = false,
      activeSubtitle,
      showInVideoSubtitle = true,
      onTogglePlayPause,
      onTimeUpdate,
      onSubtitleIndexChange,
    },
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

    // 2. Khởi tạo hoặc cập nhật YT.Player khi API sẵn sàng và videoId thay đổi
    useEffect(() => {
      if (!isApiReady || typeof window === 'undefined') return;

      // Nếu player đã tồn tại, dùng loadVideoById để chuyển video mượt mà, không hủy DOM
      if (playerInstanceRef.current && typeof playerInstanceRef.current.loadVideoById === 'function') {
        try {
          playerInstanceRef.current.loadVideoById(videoId);
          if (isPlaying) {
            playerInstanceRef.current.playVideo?.();
          } else {
            playerInstanceRef.current.pauseVideo?.();
          }
          return;
        } catch (e) {
          console.warn('[CustomYoutubePlayer] Lỗi loadVideoById, khởi tạo lại:', e);
        }
      }

      try {
        const containerElem = document.getElementById(containerId);
        if (!containerElem) return;

        playerInstanceRef.current = new window.YT.Player(containerId, {
          videoId: videoId,
          height: '250',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,        // Ẩn thanh điều khiển gốc
            rel: 0,             // Không hiện video liên quan
            modestbranding: 1,  // Ẩn logo YouTube
            iv_load_policy: 3,  // Ẩn chú thích và pop-up
            playsinline: 1,     // Ép buộc phát inline
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
            },
          },
        });
      } catch (err) {
        console.warn('[CustomYoutubePlayer] Không thể tạo YT.Player:', err);
      }
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

    // 5. VÒNG LẶP ĐỒNG BỘ THỜI GIAN CHÍNH XÁC 100% TỪ YOUTUBE PLAYER (200ms / lần theo YÊU CẦU 2 & 3)
    useEffect(() => {
      const interval = setInterval(() => {
        const p = playerInstanceRef.current;
        if (p && typeof p.getCurrentTime === 'function') {
          try {
            const realTime = p.getCurrentTime();
            if (typeof realTime === 'number' && !isNaN(realTime)) {
              onTimeUpdate(realTime);

              // YÊU CẦU 3: Nhân 1000 để đổi ra mili-giây trước khi so sánh
              const currentTimeMs = realTime * 1000;

              if (subtitles && subtitles.length > 0) {
                const activeIdx = subtitles.findIndex((sub) => {
                  const startMs =
                    typeof sub.startTime === 'number'
                      ? sub.startTime
                      : Math.round((sub.start || 0) * 1000);
                  const durMs =
                    typeof sub.duration === 'number'
                      ? (sub.duration < 200 ? Math.round(sub.duration * 1000) : sub.duration)
                      : Math.round(((sub.end || 0) - (sub.start || 0)) * 1000);
                  return currentTimeMs >= startMs && currentTimeMs <= (startMs + durMs);
                });

                if (activeIdx !== -1) {
                  onSubtitleIndexChange?.(activeIdx);
                }
              }
            }
          } catch {}
        }
      }, 200);

      return () => clearInterval(interval);
    }, [onTimeUpdate, subtitles, onSubtitleIndexChange]);

    const handleTapScreen = () => {
      onTogglePlayPause();
      setShowPlayOverlay(true);
      setTimeout(() => setShowPlayOverlay(false), 700);
    };

    const hasSubtitlesData = Array.isArray(subtitles) && subtitles.length > 0;

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

        {/* 
          YÊU CẦU 4: KIỂM TRA LOADING STATE CỦA PHỤ ĐỀ
          - Đảm bảo rằng mảng subtitles đã thực sự có dữ liệu (length > 0) trước khi render.
          - Nếu subtitles đang rỗng (đang chờ API gọi) hoặc isLoadingSubtitles = true,
            hiện một vòng xoay <ActivityIndicator/> hoặc dòng chữ "Đang tải phụ đề..." ở khu vực trống bên dưới video.
        */}
        {!hasSubtitlesData || isLoadingSubtitles ? (
          <View style={styles.inVideoSubtitleContainer} pointerEvents="none">
            <View style={styles.loadingSubtitlesCard}>
              <ActivityIndicator size="small" color="#38BDF8" style={{ marginRight: 8 }} />
              <Text style={styles.loadingSubtitlesText}>Đang tải phụ đề...</Text>
            </View>
          </View>
        ) : (
          /* YÊU CẦU 2: SỬA LỖI TRÀN LAYOUT VÀ Z-INDEX (Z-INDEX FIX) */
          activeSubtitle && showInVideoSubtitle && (
            <View style={styles.inVideoSubtitleContainer} pointerEvents="none">
              <View style={styles.inVideoSubtitleCard}>
                <Text style={styles.inVideoTextEn} numberOfLines={2}>
                  {activeSubtitle.textEn}
                </Text>
                {activeSubtitle.textVi ? (
                  <Text style={styles.inVideoTextVi} numberOfLines={2}>
                    {activeSubtitle.textVi}
                  </Text>
                ) : null}
              </View>
            </View>
          )
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // Cố định 250px theo YÊU CẦU 1, không dùng flex: 1 để chừa khoảng trống cho phụ đề bên dưới
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoWrapper: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  inVideoSubtitleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 99,
    zIndex: 9999, // Chắc chắn nó luôn nổi lên trên cùng theo YÊU CẦU 2
  },
  inVideoSubtitleCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background bán trong suốt theo YÊU CẦU 2 để chữ trắng không bị chìm vào nền video
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: '92%',
    alignItems: 'center',
  },
  inVideoTextEn: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inVideoTextVi: {
    color: '#38BDF8',
    fontSize: 12.5,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  loadingSubtitlesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  loadingSubtitlesText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
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
