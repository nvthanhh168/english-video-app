import { useState, useCallback, useMemo } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { PlayerSettings, PlaybackSpeed, SentenceSegment, VideoReel } from '../types/video';

interface UseVideoPlayerProps {
  reel: VideoReel;
  onSentenceComplete?: (sentence: SentenceSegment) => void;
}

export function useVideoPlayer({ reel, onSentenceComplete }: UseVideoPlayerProps) {
  const [currentPositionMs, setCurrentPositionMs] = useState<number>(0);
  const [settings, setSettings] = useState<PlayerSettings>({
    playbackRate: 1.0,
    isLooping: false,
    isBlindListening: false,
    fontSize: 'medium',
    fontFamily: 'system',
    isBookmarked: false,
    isFavorite: false,
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Xác định câu phụ đề đang phát dựa trên timestamp hiện tại
  const currentSentence = useMemo(() => {
    const found = reel.sentences.find(
      (s) => currentPositionMs >= s.startTimeMs && currentPositionMs <= s.endTimeMs
    );
    return found || reel.sentences[0];
  }, [reel.sentences, currentPositionMs]);

  // 1. Chuyển đổi chế độ Nghe mù (Blind Listening)
  const toggleBlindListening = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSettings((prev) => ({
      ...prev,
      isBlindListening: !prev.isBlindListening,
    }));
  }, []);

  // 2. Chuyển đổi tốc độ chậm (Snail Icon: 1.0x -> 0.75x -> 0.5x -> 1.0x)
  const cyclePlaybackSpeed = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSettings((prev) => {
      let nextSpeed: PlaybackSpeed = 1.0;
      if (prev.playbackRate === 1.0) nextSpeed = 0.75;
      else if (prev.playbackRate === 0.75) nextSpeed = 0.5;
      else nextSpeed = 1.0;
      return { ...prev, playbackRate: nextSpeed };
    });
  }, []);

  // 3. Bật/tắt lặp lại câu (Loop)
  const toggleLoop = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSettings((prev) => ({
      ...prev,
      isLooping: !prev.isLooping,
    }));
  }, []);

  // 4. Sao chép câu thoại vào Clipboard
  const copyCurrentSentence = useCallback(async () => {
    if (!currentSentence) return;
    const content = `${currentSentence.textEn}\n(${currentSentence.textVi})`;
    await Clipboard.setStringAsync(content);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  }, [currentSentence]);

  // 5. Lưu câu / Bookmark
  const toggleBookmark = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSettings((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  }, []);

  // 6. Yêu thích / Thả sao
  const toggleFavorite = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSettings((prev) => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }));
  }, []);

  // Cập nhật cài đặt hiển thị (Font, Size)
  const updateDisplaySettings = useCallback((newSettings: Partial<PlayerSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return {
    settings,
    currentSentence,
    currentPositionMs,
    setCurrentPositionMs,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    copiedNotification,
    toggleBlindListening,
    cyclePlaybackSpeed,
    toggleLoop,
    copyCurrentSentence,
    toggleBookmark,
    toggleFavorite,
    updateDisplaySettings,
  };
}
