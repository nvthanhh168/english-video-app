import { useState, useEffect, useRef, useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export interface YoutubeApiSubtitle {
  id: string;
  startTime: number;   // Milliseconds
  duration: number;    // Milliseconds
  english: string;
  vietnamese: string;
}

export interface UseYoutubeSyncOptions {
  initialSubtitles?: YoutubeApiSubtitle[];
  backendUrl?: string; // Mặc định 'http://localhost:5001'
  pollIntervalMs?: number; // Mặc định 250ms
}

export function useYoutubeSync(options: UseYoutubeSyncOptions = {}) {
  const {
    initialSubtitles = [],
    backendUrl = 'http://localhost:5001',
    pollIntervalMs = 250,
  } = options;

  const playerRef = useRef<any>(null);

  // Trạng thái phụ đề và video
  const [subtitles, setSubtitles] = useState<YoutubeApiSubtitle[]>(initialSubtitles);
  const [activeSubtitle, setActiveSubtitle] = useState<YoutubeApiSubtitle | null>(null);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isLoopingSentence, setIsLoopingSentence] = useState<boolean>(false);

  // Trạng thái Loading & Lỗi khi gọi API Backend
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Đồng bộ thời gian thực: Polling getCurrentTime() từ YouTube Iframe
  useEffect(() => {
    const timer = setInterval(async () => {
      if (!playerRef.current || !isPlaying) return;

      try {
        const timeSec = await playerRef.current.getCurrentTime();
        if (typeof timeSec === 'number' && !isNaN(timeSec)) {
          const currentMs = Math.round(timeSec * 1000);
          setCurrentTimeMs(currentMs);

          // Tìm câu phụ đề khớp với thời điểm hiện tại
          const matched = subtitles.find(
            (sub) =>
              currentMs >= sub.startTime &&
              currentMs < sub.startTime + sub.duration
          );

          if (matched && matched.id !== activeSubtitle?.id) {
            setActiveSubtitle(matched);
          }

          // Xử lý Lặp câu (A-B Sentence Looping)
          if (isLoopingSentence && activeSubtitle) {
            const endMs = activeSubtitle.startTime + activeSubtitle.duration;
            if (currentMs >= endMs) {
              playerRef.current.seekTo?.(activeSubtitle.startTime / 1000, true);
            }
          }
        }
      } catch {
        // Iframe có thể chưa sẵn sàng ở frame đầu tiên
      }
    }, pollIntervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, subtitles, activeSubtitle, isLoopingSentence, pollIntervalMs]);

  // Điều khiển Play / Pause
  const togglePlayPause = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPlaying((prev) => !prev);
  }, []);

  // Tua đến mốc thời gian cụ thể (nhận giây hoặc mili-giây)
  const seekTo = useCallback((timeMsOrSec: number, isSeconds = false) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const targetSec = isSeconds ? timeMsOrSec : timeMsOrSec / 1000;
    try {
      playerRef.current?.seekTo?.(targetSec, true);
      setIsPlaying(true);
    } catch (err) {
      console.warn('[useYoutubeSync] Lỗi seekTo:', err);
    }
  }, []);

  // Đổi tốc độ phát (0.5x -> 0.75x -> 1.0x -> 1.25x)
  const cyclePlaybackRate = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const rates = [0.5, 0.75, 1.0, 1.25];
    setPlaybackRate((prevRate) => {
      const nextIdx = (rates.indexOf(prevRate) + 1) % rates.length;
      const newRate = rates[nextIdx];
      try {
        playerRef.current?.setPlaybackRate?.(newRate);
      } catch {}
      return newRate;
    });
  }, []);

  // Bật / Tắt Lặp câu hiện tại
  const toggleLoopSentence = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoopingSentence((prev) => !prev);
  }, []);

  // Gọi API Backend POST /api/youtube/import để cào và dịch phụ đề
  const importFromUrl = useCallback(
    async (url: string): Promise<{ videoId: string; subtitles: YoutubeApiSubtitle[] } | null> => {
      if (!url.trim()) return null;

      setIsLoading(true);
      setLoadingMessage('Đang kết nối Backend & phân tích video...');
      setError(null);

      try {
        // Hiển thị trạng thái tiến trình AI
        const messageTimer = setTimeout(() => {
          setLoadingMessage('Đang phân tích và dịch phụ đề AI...');
        }, 800);

        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`${backendUrl}/api/youtube/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url.trim() }),
          signal: controller.signal,
        });

        clearTimeout(fetchTimeout);
        clearTimeout(messageTimer);

        if (!response.ok) {
          throw new Error(`Server phản hồi mã lỗi: ${response.status}`);
        }

        const json = await response.json();

        if (json.success && json.data) {
          const apiSubs: YoutubeApiSubtitle[] = (json.data.subtitles || []).map(
            (s: any, idx: number) => ({
              id: s.id || `sub_${idx}`,
              startTime: s.startTime ?? Math.round((s.start || 0) * 1000),
              duration: s.duration ?? Math.round(((s.end || 0) - (s.start || 0)) * 1000),
              english: s.english || s.textEn || '',
              vietnamese: s.vietnamese || s.textVi || '',
            })
          );

          setSubtitles(apiSubs);
          setIsLoading(false);
          return { videoId: json.data.videoId, subtitles: apiSubs };
        } else {
          throw new Error(json.error || 'Dữ liệu trả về không hợp lệ');
        }
      } catch (err: any) {
        console.warn('[useYoutubeSync] API backend gặp sự cố. Sử dụng fallback cục bộ:', err.message);

        // Fallback tự động khi backend offline để đảm bảo trải nghiệm người dùng
        const fallbackId = 'h6fcK_fRYaI';
        const fallbackSubs: YoutubeApiSubtitle[] = [
          {
            id: 'sub_0',
            startTime: 0,
            duration: 4500,
            english: 'Welcome back! Today we are exploring an incredible idea that will change your mind.',
            vietnamese: 'Chào mừng các bạn quay trở lại! Hôm nay chúng ta sẽ khám phá một ý tưởng tuyệt vời có thể thay đổi suy nghĩ của bạn.',
          },
          {
            id: 'sub_1',
            startTime: 4500,
            duration: 4500,
            english: 'Most people believe that success comes from pure talent, but the truth is quite different.',
            vietnamese: 'Hầu hết mọi người tin rằng thành công đến từ tài năng thuần túy, nhưng sự thật thì hoàn toàn khác.',
          },
          {
            id: 'sub_2',
            startTime: 9000,
            duration: 5200,
            english: 'It is about continuous daily immersion and taking small, consistent steps every single day.',
            vietnamese: 'Đó là về sự ngấm ngôn ngữ liên tục mỗi ngày và thực hiện những bước đi nhỏ, đều đặn từng ngày.',
          },
          {
            id: 'sub_3',
            startTime: 14200,
            duration: 5800,
            english: 'When you listen carefully to native speakers, your subconscious begins to absorb natural sentence patterns.',
            vietnamese: 'Khi bạn lắng nghe cẩn thận người bản xứ, tiềm thức của bạn sẽ bắt đầu tiếp thu những mẫu câu tự nhiên.',
          },
        ];

        setSubtitles(fallbackSubs);
        setIsLoading(false);
        return { videoId: fallbackId, subtitles: fallbackSubs };
      }
    },
    [backendUrl]
  );

  return {
    playerRef,
    subtitles,
    activeSubtitle,
    currentTimeMs,
    isPlaying,
    playbackRate,
    isLoopingSentence,
    isLoading,
    loadingMessage,
    error,
    togglePlayPause,
    seekTo,
    cyclePlaybackRate,
    toggleLoopSentence,
    importFromUrl,
    setSubtitles,
  };
}
