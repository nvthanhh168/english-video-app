import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { YoutubeVideoItem, YoutubeSubtitleSegment } from '../types/youtube';
import { MOCK_YOUTUBE_LIBRARY } from '../data/mockYoutubeLibrary';
import { YoutubeURLInput } from '../components/youtube/YoutubeURLInput';
import { LevelVideoFeed } from '../components/youtube/LevelVideoFeed';
import { SavedVideosSection } from '../components/youtube/SavedVideosSection';
import { YoutubeStudyScreen } from './YoutubeStudyScreen';
import {
  extractVideoId,
  extractAndTranslateYoutubeSubtitles,
  fetchYoutubeVideoMeta,
} from '../services/youtubeExtractor';
import {
  getSavedVideos,
  saveVideoToStorage,
  removeSavedVideoFromStorage,
  updateVideoSubtitlesInStorage,
  saveImportedVideo,
  getImportedVideos,
  importedToYoutubeVideo,
} from '../services/savedVideosStorage';

export const YoutubeDiscoveryScreen: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoItem | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('Đang phân tích và dịch phụ đề AI...');
  const [savedVideos, setSavedVideos] = useState<YoutubeVideoItem[]>([]);

  // Tải danh sách video đã lưu từ mảng 'imported_videos' trong AsyncStorage khi khởi chạy
  const loadSavedVideos = async () => {
    try {
      const asyncItems = await getImportedVideos();
      if (asyncItems && asyncItems.length > 0) {
        setSavedVideos(asyncItems.map(importedToYoutubeVideo));
        return;
      }
    } catch {}
    setSavedVideos(getSavedVideos());
  };

  useEffect(() => {
    loadSavedVideos();
  }, []);

  const handleDeleteSavedVideo = (videoId: string) => {
    const updated = removeSavedVideoFromStorage(videoId);
    setSavedVideos(updated);
  };

  const handleUpdateSubtitles = (videoId: string, newSubs: YoutubeSubtitleSegment[]) => {
    const updated = updateVideoSubtitlesInStorage(videoId, newSubs);
    setSavedVideos(updated);
    if (selectedVideo && selectedVideo.id === videoId) {
      setSelectedVideo({
        ...selectedVideo,
        subtitles: newSubs,
      });
    }
  };

  // Xử lý khi người dùng dán link và nhấn "Học ngay"
  const handleImportUrl = async (url: string) => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      Alert.alert(
        'Link không hợp lệ',
        'Vui lòng nhập đường link YouTube chính xác (ví dụ: https://www.youtube.com/watch?v=... hoặc link rút gọn youtu.be).'
      );
      return;
    }

    try {
      setIsExtracting(true);
      setLoadingText('Đang phân tích video & lưu vào AsyncStorage...');

      // 1. Kiểm tra xem video này đã có sẵn trong lịch sử AsyncStorage chưa
      // Nếu đã có: load ngay lập tức mà không cần gọi API dịch lại!
      const existingInSaved = savedVideos.find((v) => v.id === videoId);
      if (existingInSaved) {
        setTimeout(() => {
          setIsExtracting(false);
          setSelectedVideo(existingInSaved);
        }, 300);
        return;
      }

      const existingInLib = MOCK_YOUTUBE_LIBRARY.find((v) => v.id === videoId);
      if (existingInLib) {
        await saveImportedVideo({
          videoId: existingInLib.id,
          title: existingInLib.title,
          thumbnail: existingInLib.thumbnailUrl,
          platform: 'youtube',
          importedAt: new Date().toISOString(),
          subtitles: existingInLib.subtitles,
          channelTitle: existingInLib.channelTitle,
          duration: existingInLib.duration,
          durationSec: existingInLib.durationSec,
          level: existingInLib.level,
        });
        const updated = saveVideoToStorage(existingInLib);
        setSavedVideos(updated);
        setTimeout(() => {
          setIsExtracting(false);
          setSelectedVideo(existingInLib);
        }, 300);
        return;
      }

      // 2. Lấy thông tin thật từ YouTube qua oEmbed (Tiêu đề thật, Kênh thật, Thumbnail)
      const meta = await fetchYoutubeVideoMeta(videoId);

      // 3. Trích xuất phụ đề (từ backend hoặc thư viện AI)
      const extractedSubtitles = await extractAndTranslateYoutubeSubtitles(videoId, meta.title);

      const customVideoItem: YoutubeVideoItem = {
        id: videoId,
        title: meta.title,
        channelTitle: meta.author,
        thumbnailUrl: meta.thumbnailUrl,
        duration: '10:00',
        durationSec: 600,
        level: 'B2',
        views: 'Đã lưu',
        subtitles: extractedSubtitles,
        isCustomImported: true,
        savedAt: new Date().toISOString(),
      };

      // 4. LƯU BỀN VỮNG VÀO ASYNCSTORAGE (Mảng 'imported_videos' theo YÊU CẦU 3)
      await saveImportedVideo({
        videoId,
        title: meta.title,
        thumbnail: meta.thumbnailUrl,
        platform: 'youtube',
        importedAt: new Date().toISOString(),
        subtitles: extractedSubtitles,
        channelTitle: meta.author,
        duration: '10:00',
        durationSec: 600,
        level: 'B2',
      });

      const updatedSaved = saveVideoToStorage(customVideoItem);
      setSavedVideos(updatedSaved);

      setIsExtracting(false);
      setSelectedVideo(customVideoItem);
    } catch (err) {
      setIsExtracting(false);
      Alert.alert('Lỗi', 'Không thể trích xuất phụ đề cho video này. Vui lòng kiểm tra lại link.');
    }
  };

  // Nếu người dùng đang học một video, render màn hình học tập
  if (selectedVideo) {
    return (
      <YoutubeStudyScreen
        video={selectedVideo}
        onBack={() => {
          // Khi quay lại danh sách, làm mới danh sách video đã lưu từ AsyncStorage
          loadSavedVideos();
          setSelectedVideo(null);
        }}
        onUpdateSubtitles={handleUpdateSubtitles}
      />
    );
  }

  // Kết hợp video đã lưu của người dùng và video thư viện mẫu (không trùng ID)
  const allVideos = [
    ...savedVideos,
    ...MOCK_YOUTUBE_LIBRARY.filter((mv) => !savedVideos.some((sv) => sv.id === mv.id)),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      {/* Header chính mang phong cách YouTube Red Dark Mode */}
      <View style={styles.headerBar}>
        <View style={styles.logoRow}>
          <View style={styles.ytRedIcon}>
            <Text style={styles.ytPlayGlyph}>▶</Text>
          </View>
          <Text style={styles.headerTitle}>YouTube Học Tập</Text>
        </View>
        <View style={styles.proBadge}>
          <Text style={styles.proBadgeText}>AD-FREE</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Khu vực 1: Nhập link tùy chọn */}
        <YoutubeURLInput
          onImport={handleImportUrl}
          isLoading={isExtracting}
        />

        {/* Khu vực 2: Thư viện video và Tab "Video đã nhập (History)" cạnh các Tab cấp độ (A1-C2) */}
        <LevelVideoFeed
          videos={allVideos}
          importedVideos={savedVideos}
          onSelectVideo={setSelectedVideo}
          onDeleteImportedVideo={handleDeleteSavedVideo}
        />
      </ScrollView>

      {/* Modal Loading AI khi đang cào & dịch phụ đề */}
      <Modal
        visible={isExtracting}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.loadingModalBackdrop}>
          <View style={styles.loadingCard}>
            <View style={styles.aiGlowCircle}>
              <ActivityIndicator size="large" color="#38BDF8" />
            </View>
            <Text style={styles.loadingTitle}>Đang tải bài học</Text>
            <Text style={styles.loadingSubtitle}>{loadingText}</Text>
            <View style={styles.loadingProgressBar}>
              <View style={styles.loadingProgressFill} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Alias thuận tiện cho cấu trúc thư mục
export const DiscoveryScreen = YoutubeDiscoveryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0F172A',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ytRedIcon: {
    width: 32,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  ytPlayGlyph: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  proBadge: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  proBadgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  aiGlowCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  loadingSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  loadingProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 2,
  },
});
