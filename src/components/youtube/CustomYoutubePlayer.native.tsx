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
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Haptics from 'expo-haptics';

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

export interface CustomYoutubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  playbackRate: number; // 0.5, 0.75, 1.0, 1.25
  subtitles?: SubtitleItem[]; // Mảng phụ đề
  isLoadingSubtitles?: boolean; // Cờ báo phụ đề đang được tải / gọi API
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
      getCurrentTime: async () => {
        try {
          if (playerRef.current?.getCurrentTime) {
            return await playerRef.current.getCurrentTime();
          }
        } catch {}
        return 0;
      },
    }));

    // Vòng lặp cập nhật thời gian phát hiện tại từ Iframe (200ms/lần = 0.2s) theo YÊU CẦU 2
    // YÊU CẦU 3: getCurrentTime() trả về giây (vd: 1.5s), nhân 1000 để đổi ra mili-giây trước khi so sánh
    useEffect(() => {
      let isMounted = true;
      let isQuerying = false;

      const interval = setInterval(async () => {
        if (!playerRef.current || !isPlaying || isQuerying) return;

        isQuerying = true;
        try {
          const timeSec = await playerRef.current.getCurrentTime();
          if (isMounted && typeof timeSec === 'number' && !isNaN(timeSec)) {
            // Cập nhật giây ra ngoài cho component cha
            onTimeUpdate(timeSec);

            // Nhân 1000 để đổi ra mili-giây (ms)
            const currentTimeMs = timeSec * 1000;

            // YÊU CẦU 3: Logic tìm phụ đề đang nói với findIndex
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
        } catch {
          // Bỏ qua lỗi ngầm khi iframe chưa sẵn sàng hoặc đang delay
        } finally {
          isQuerying = false;
        }
      }, 200);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }, [isPlaying, onTimeUpdate, subtitles, onSubtitleIndexChange]);

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

    // Kiểm tra xem phụ đề đã có dữ liệu chưa (length > 0)
    const hasSubtitlesData = Array.isArray(subtitles) && subtitles.length > 0;

    return (
      <View style={styles.container}>
        {/* 
          YÊU CẦU 1: CHẶN NATIVE FULLSCREEN & ÉP CHẠY INLINE
          1. webViewProps={{ allowsInlineMediaPlayback: true }} ép WKWebView trên iOS không bung AVPlayer fullscreen.
          2. initialPlayerParams={{ playsinline: 1, preventFullScreen: true, controls: 0, modestbranding: 1 }}
          3. Thẻ bọc có chiều cao cố định (height: 250), không dùng flex: 1 để chừa khoảng trống cho phụ đề bên dưới.
          4. pointerEvents="none" chặn mọi click trực tiếp vào Iframe gốc của YouTube.
        */}
        <View style={styles.videoWrapper} pointerEvents="none">
          <YoutubePlayer
            ref={playerRef}
            height={250}
            width={SCREEN_WIDTH}
            play={isPlaying}
            videoId={videoId}
            webViewProps={{
              allowsInlineMediaPlayback: true,
            }}
            initialPlayerParams={{
              playsinline: 1,
              preventFullScreen: true,
              controls: 0,
              modestbranding: 1,
              rel: false,
              iv_load_policy: 3,
            } as any}
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
          - Đảm bảo rằng mảng subtitles đã thực sự có dữ liệu (length > 0) trước khi render phụ đề.
          - Nếu subtitles đang rỗng (đang chờ API gọi) hoặc isLoadingSubtitles = true,
            hiện một vòng xoay <ActivityIndicator/> và dòng chữ "Đang tải phụ đề..." ở khu vực trống bên dưới video.
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
    height: 250, // YÊU CẦU 1: Chiều cao cố định (height: 250), không dùng flex: 1 để chừa khoảng trống cho phụ đề bên dưới
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoWrapper: {
    width: '100%',
    height: 250, // Cố định 250px cho video inline
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
    zIndex: 9999, // YÊU CẦU 2: elevation: 99 và zIndex: 9999 để chắc chắn luôn nổi lên trên cùng
  },
  inVideoSubtitleCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // YÊU CẦU 2: Background bán trong suốt rgba(0,0,0,0.6) để chữ trắng không bị chìm
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
  // YÊU CẦU 4: Loading state cho phụ đề
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
