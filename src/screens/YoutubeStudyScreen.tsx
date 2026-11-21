import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { YoutubeSubtitleSegment, YoutubeVideoItem } from '../types/youtube';
import {
  CustomYoutubePlayer,
  CustomYoutubePlayerRef,
} from '../components/youtube/CustomYoutubePlayer';
import { YoutubeSubtitleFeed } from '../components/youtube/YoutubeSubtitleFeed';
import { YoutubeStudyToolbar } from '../components/youtube/YoutubeStudyToolbar';
import { SentenceBreakdownSheet } from './SentenceBreakdownSheet';
import { CustomSubtitleModal } from '../components/youtube/CustomSubtitleModal';

interface YoutubeStudyScreenProps {
  video: YoutubeVideoItem;
  onBack: () => void;
  onUpdateSubtitles?: (videoId: string, newSubs: YoutubeSubtitleSegment[]) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25];

export const YoutubeStudyScreen: React.FC<YoutubeStudyScreenProps> = ({
  video,
  onBack,
  onUpdateSubtitles,
}) => {
  const playerRef = useRef<CustomYoutubePlayerRef>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRateIndex, setPlaybackRateIndex] = useState<number>(2); // Default 1.0x
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isLoopingSentence, setIsLoopingSentence] = useState<boolean>(false);
  const [subtitles, setSubtitles] = useState<YoutubeSubtitleSegment[]>(video.subtitles);
  const [customSubModalVisible, setCustomSubModalVisible] = useState<boolean>(false);
  const [showInVideoSubtitle, setShowInVideoSubtitle] = useState<boolean>(true); // Phụ đề nổi đè lên video zIndex 9999

  useEffect(() => {
    setSubtitles(video.subtitles);
  }, [video.subtitles]);

  const handleSaveSubtitles = (newSubs: YoutubeSubtitleSegment[]) => {
    setSubtitles(newSubs);
    onUpdateSubtitles?.(video.id, newSubs);
  };

  // Modal phân tích AI Module 3
  const [breakdownVisible, setBreakdownVisible] = useState<boolean>(false);
  const [selectedSentence, setSelectedSentence] = useState<{
    textEn: string;
    textVi: string;
  } | null>(null);

  const playbackRate = SPEED_OPTIONS[playbackRateIndex];

  // YÊU CẦU 3: ĐỒNG BỘ ĐƠN VỊ THỜI GIAN (SECONDS vs MILLISECONDS)
  // getCurrentTime() trả về giây (vd: 1.5s), nhân 1000 để đổi ra mili-giây trước khi so sánh
  const currentTimeMs = Math.round(currentTimeSec * 1000);

  // LOGIC SO KHỚP KHOẢNG THỜI GIAN THEO YÊU CẦU 3:
  const activeIndex = subtitles.findIndex((sub) => {
    const startMs =
      typeof (sub as any).startTime === 'number'
        ? (sub as any).startTime
        : Math.round((sub.start || 0) * 1000);

    const durMs =
      typeof (sub as any).duration === 'number'
        ? ((sub as any).duration < 200 ? Math.round((sub as any).duration * 1000) : (sub as any).duration)
        : Math.round((((sub.end || 0) - (sub.start || 0))) * 1000);

    return currentTimeMs >= startMs && currentTimeMs <= (startMs + durMs);
  });

  const activeSubtitle =
    (activeIndex !== -1 ? subtitles[activeIndex] : null) ||
    [...subtitles].reverse().find((sub) => {
      const startMs =
        typeof (sub as any).startTime === 'number'
          ? (sub as any).startTime
          : Math.round((sub.start || 0) * 1000);
      return currentTimeMs >= startMs;
    }) ||
    (subtitles.length > 0 ? subtitles[0] : null);

  // Xử lý logic lặp lại câu (A-B Looping)
  useEffect(() => {
    if (isLoopingSentence && activeSubtitle) {
      const startTime =
        typeof activeSubtitle.start === 'number'
          ? activeSubtitle.start
          : typeof (activeSubtitle as any).startTime === 'number'
          ? (activeSubtitle as any).startTime / 1000
          : 0;

      const duration =
        typeof (activeSubtitle as any).duration === 'number'
          ? ((activeSubtitle as any).duration > 500 ? (activeSubtitle as any).duration / 1000 : (activeSubtitle as any).duration)
          : typeof activeSubtitle.end === 'number'
          ? activeSubtitle.end - startTime
          : 0;

      const endTime = startTime + duration;
      if (currentTimeSec >= endTime) {
        playerRef.current?.seekTo(startTime);
      }
    }
  }, [currentTimeSec, isLoopingSentence, activeSubtitle]);

  // Đổi tốc độ phát
  const handleChangeSpeed = () => {
    setPlaybackRateIndex((prev) => (prev + 1) % SPEED_OPTIONS.length);
  };

  // Bật/tắt Play/Pause
  const handleTogglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Chạm vào 1 câu phụ đề -> Tua video đến câu đó
  const handleSelectSegment = (segment: YoutubeSubtitleSegment) => {
    playerRef.current?.seekTo(segment.start);
    setIsPlaying(true);
  };

  // Mở Bottom Sheet / Modal phân tích AI
  const handleOpenBreakdown = (segment?: YoutubeSubtitleSegment) => {
    const target = segment || activeSubtitle;
    if (target) {
      setSelectedSentence({
        textEn: target.textEn,
        textVi: target.textVi,
      });
      setIsPlaying(false); // Tạm dừng phát khi mở phân tích
      setBreakdownVisible(true);
    }
  };

  const handleCloseBreakdown = () => {
    setBreakdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* 1. Header trên cùng của Player: Tiêu đề video & Nút quay lại */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onBack();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.videoMetaHeader}>
          <Text style={styles.videoTitleText} numberOfLines={1}>
            {video.title}
          </Text>
          <Text style={styles.channelMetaText}>
            {video.channelTitle} • {video.level}
          </Text>
        </View>

        {/* Nút bật/tắt Phụ đề nổi đè lên video (Z-Index 9999 CC Overlay) */}
        <TouchableOpacity
          style={[styles.ccToggleBtn, showInVideoSubtitle && styles.ccToggleBtnActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowInVideoSubtitle((prev) => !prev);
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.ccToggleText, showInVideoSubtitle && styles.ccToggleTextActive]}>
            {showInVideoSubtitle ? '💬 CC Trên' : '💬 CC Tắt'}
          </Text>
        </TouchableOpacity>

        {/* Nút tùy chỉnh / dán phụ đề */}
        <TouchableOpacity
          style={styles.editSubsTopBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCustomSubModalVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.editSubsTopBtnText}>✏️ Sửa phụ đề</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Trình phát YouTube Không Quảng Cáo (Clean Player) kèm Subtitle Overlay zIndex: 9999 */}
      <CustomYoutubePlayer
        ref={playerRef}
        videoId={video.id}
        isPlaying={isPlaying}
        playbackRate={playbackRate}
        subtitles={subtitles}
        activeSubtitle={activeSubtitle}
        showInVideoSubtitle={showInVideoSubtitle}
        onTogglePlayPause={handleTogglePlayPause}
        onTimeUpdate={setCurrentTimeSec}
      />

      {/* 3. Danh sách Phụ đề Song ngữ đồng bộ: Bọc trong View có flex: 1 nằm ngay dưới khung Video theo YÊU CẦU 2 */}
      <View style={styles.subtitlesContainer}>
        <YoutubeSubtitleFeed
          subtitles={subtitles}
          currentTimeSec={currentTimeSec}
          activeSubtitleId={activeSubtitle?.id || null}
          activeIndex={activeIndex}
          isLoopingSentence={isLoopingSentence}
          onSelectSegment={handleSelectSegment}
          onOpenBreakdown={handleOpenBreakdown}
          onToggleLoop={() => setIsLoopingSentence((prev) => !prev)}
        />
      </View>

      {/* 4. Thanh Công cụ Điều khiển Học tập phía đáy */}
      <YoutubeStudyToolbar
        isPlaying={isPlaying}
        playbackRate={playbackRate}
        isLoopingSentence={isLoopingSentence}
        onTogglePlayPause={handleTogglePlayPause}
        onChangeSpeed={handleChangeSpeed}
        onToggleLoop={() => setIsLoopingSentence((prev) => !prev)}
        onOpenBreakdown={() => handleOpenBreakdown()}
        onCloseStudy={onBack}
      />

      {/* 5. Modal Phân Tích Chuyên Sâu Bằng AI (Module 3 Sentence Breakdown) */}
      <Modal
        visible={breakdownVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseBreakdown}
      >
        <SentenceBreakdownSheet
          onClose={handleCloseBreakdown}
          sentence={selectedSentence || undefined}
        />
      </Modal>

      {/* 6. Modal Tùy chỉnh / Dán Phụ đề */}
      <CustomSubtitleModal
        visible={customSubModalVisible}
        onClose={() => setCustomSubModalVisible(false)}
        currentSubtitles={subtitles}
        onSaveSubtitles={handleSaveSubtitles}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  ccToggleBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ccToggleBtnActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  ccToggleText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '700',
  },
  ccToggleTextActive: {
    color: '#4ADE80',
  },
  editSubsTopBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editSubsTopBtnText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 28,
    marginTop: -2,
  },
  videoMetaHeader: {
    flex: 1,
  },
  videoTitleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  channelMetaText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  subtitlesContainer: {
    flex: 1, // Bọc trong View có flex: 1 nằm ngay dưới khung Video theo YÊU CẦU 2
    backgroundColor: '#0A0F1D',
    overflow: 'hidden',
  },
});
