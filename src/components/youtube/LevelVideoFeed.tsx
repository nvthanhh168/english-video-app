import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { CefrLevel, YoutubeVideoItem } from '../../types/youtube';
import {
  getImportedVideos,
  removeImportedVideo,
  importedToYoutubeVideo,
} from '../../services/importedVideosStorage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 44) / 2;

export type FeedTab = 'history' | CefrLevel;

interface LevelVideoFeedProps {
  videos: YoutubeVideoItem[];
  importedVideos?: YoutubeVideoItem[];
  initialTab?: FeedTab;
  onSelectVideo: (video: YoutubeVideoItem) => void;
  onDeleteImportedVideo?: (videoId: string) => void;
}

export const LevelVideoFeed: React.FC<LevelVideoFeedProps> = ({
  videos,
  importedVideos: propImportedVideos,
  initialTab = 'history',
  onSelectVideo,
  onDeleteImportedVideo,
}) => {
  const [selectedTab, setSelectedTab] = useState<FeedTab>(initialTab);
  const [historyVideos, setHistoryVideos] = useState<YoutubeVideoItem[]>(
    propImportedVideos || []
  );

  // Hàm load danh sách video đã nhập từ mảng 'imported_videos' trong AsyncStorage
  const loadHistoryFromAsyncStorage = useCallback(async () => {
    try {
      const items = await getImportedVideos();
      const mapped = items.map(importedToYoutubeVideo);
      setHistoryVideos(mapped);
    } catch (err) {
      console.warn('[LevelVideoFeed] Lỗi load imported_videos từ AsyncStorage:', err);
    }
  }, []);

  // Tự động load khi khởi chạy và khi prop thay đổi
  useEffect(() => {
    if (propImportedVideos && propImportedVideos.length > 0) {
      setHistoryVideos(propImportedVideos);
    } else {
      loadHistoryFromAsyncStorage();
    }
  }, [propImportedVideos, loadHistoryFromAsyncStorage]);

  // Cấu hình danh sách các Tab (Đặt tab "Video đã nhập (History)" cạnh các Tab A1-C2)
  const cefrLevels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleSelectTab = (tab: FeedTab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
    if (tab === 'history') {
      // Khi bấm vào tab "Video đã nhập (History)", load danh sách mới nhất từ AsyncStorage ra
      loadHistoryFromAsyncStorage();
    }
  };

  const handleDeleteHistoryItem = async (videoId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onDeleteImportedVideo) {
      onDeleteImportedVideo(videoId);
    }
    const updated = await removeImportedVideo(videoId);
    setHistoryVideos(updated.map(importedToYoutubeVideo));
  };

  // Lọc video hiển thị theo tab được chọn
  const displayVideos =
    selectedTab === 'history'
      ? historyVideos
      : videos.filter((v) => v.level === selectedTab);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionHeader}>KHÁM PHÁ & LỊCH SỬ VIDEO</Text>
        {selectedTab === 'history' && historyVideos.length > 0 && (
          <Text style={styles.itemCountText}>
            {historyVideos.length} video đã lưu
          </Text>
        )}
      </View>

      {/* 1. Hàng Tab cuộn ngang: Tab "Video đã nhập (History)" nằm ngay cạnh các Tab cấp độ (A1 - C2) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {/* Tab "Video đã nhập (History)" */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            styles.historyTab,
            selectedTab === 'history' && styles.historyTabActive,
          ]}
          onPress={() => handleSelectTab('history')}
          activeOpacity={0.7}
        >
          <Text style={styles.tabIcon}>⭐</Text>
          <Text
            style={[
              styles.tabText,
              styles.historyTabText,
              selectedTab === 'history' && styles.tabTextActive,
            ]}
          >
            Video đã nhập (History)
          </Text>
          {historyVideos.length > 0 && (
            <View
              style={[
                styles.badgePill,
                selectedTab === 'history' && styles.badgePillActive,
              ]}
            >
              <Text
                style={[
                  styles.badgePillText,
                  selectedTab === 'history' && styles.badgePillTextActive,
                ]}
              >
                {historyVideos.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Các Tab cấp độ (A1 - C2) */}
        {cefrLevels.map((lvl) => {
          const isActive = selectedTab === lvl;
          return (
            <TouchableOpacity
              key={lvl}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => handleSelectTab(lvl)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                Cấp độ {lvl}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. Hiển thị nội dung danh sách video */}
      {selectedTab === 'history' && historyVideos.length === 0 ? (
        // Empty state khi tab History chưa có video
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📥</Text>
          <Text style={styles.emptyTitle}>Chưa có video trong Lịch sử đã nhập</Text>
          <Text style={styles.emptyDesc}>
            Dán bất kỳ link YouTube nào vào ô "Dán link YouTube" phía trên và bấm "Học ngay". Video và toàn bộ phụ đề dịch sẽ được lưu vĩnh viễn tại đây để bạn học lại mà không cần dịch lại!
          </Text>
        </View>
      ) : (
        // Grid hiển thị video
        <View style={styles.gridContainer}>
          {displayVideos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.videoCard,
                selectedTab === 'history' && styles.historyCardBorder,
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                onSelectVideo(item);
              }}
              activeOpacity={0.85}
            >
              {/* Thumbnail với Badge thời lượng và Level/History */}
              <View style={styles.thumbnailWrapper}>
                <Image
                  source={{
                    uri:
                      item.thumbnailUrl ||
                      (item as any).thumbnail ||
                      `https://i.ytimg.com/vi/${item.id || (item as any).videoId}/hqdefault.jpg`,
                  }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                <View
                  style={[
                    styles.levelBadge,
                    selectedTab === 'history'
                      ? styles.historyBadgeBg
                      : styles.levelBadgeBg,
                  ]}
                >
                  <Text style={styles.levelBadgeText}>
                    {selectedTab === 'history' ? 'ĐÃ NHẬP' : item.level}
                  </Text>
                </View>

                {/* Nút xóa nhanh nếu ở Tab History */}
                {selectedTab === 'history' && (
                  <TouchableOpacity
                    style={styles.deleteHistoryBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteHistoryItem(item.id);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.deleteIconText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Thông tin Video */}
              <View style={styles.infoWrapper}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.channelRow}>
                  <Text style={styles.channelName} numberOfLines={1}>
                    {item.channelTitle}
                  </Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.viewsText}>
                    {selectedTab === 'history' ? 'Học ngay ⚡' : item.views}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  itemCountText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabItemActive: {
    backgroundColor: '#DC2626', // Đỏ YouTube
    borderColor: '#EF4444',
  },
  historyTab: {
    borderColor: 'rgba(56, 189, 248, 0.35)',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  historyTabActive: {
    backgroundColor: '#0284C7', // Xanh dương Cyan nổi bật
    borderColor: '#38BDF8',
  },
  tabIcon: {
    fontSize: 12,
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 12.5,
    fontWeight: '700',
  },
  historyTabText: {
    color: '#E0F2FE',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  badgePill: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 2,
  },
  badgePillActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgePillText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
  },
  badgePillTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  videoCard: {
    width: CARD_WIDTH,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  historyCardBorder: {
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  thumbnailWrapper: {
    width: '100%',
    height: 105,
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  levelBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  levelBadgeBg: {
    backgroundColor: '#2563EB',
  },
  historyBadgeBg: {
    backgroundColor: '#0284C7',
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  deleteHistoryBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  deleteIconText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  infoWrapper: {
    padding: 10,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    lineHeight: 17,
    marginBottom: 4,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  channelName: {
    color: '#94A3B8',
    fontSize: 11,
    flexShrink: 1,
  },
  dot: {
    color: '#64748B',
    fontSize: 10,
  },
  viewsText: {
    color: '#38BDF8',
    fontSize: 10.5,
    fontWeight: '600',
  },
  emptyContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 24,
    alignItems: 'center',
    marginVertical: 8,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyDesc: {
    color: '#94A3B8',
    fontSize: 12.5,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 320,
  },
});
