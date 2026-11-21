import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { YoutubeVideoItem } from '../../types/youtube';

interface SavedVideosSectionProps {
  videos: YoutubeVideoItem[];
  onSelectVideo: (video: YoutubeVideoItem) => void;
  onDeleteVideo: (videoId: string) => void;
}

export const SavedVideosSection: React.FC<SavedVideosSectionProps> = ({
  videos,
  onSelectVideo,
  onDeleteVideo,
}) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  const handleDelete = (video: YoutubeVideoItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (typeof window !== 'undefined' && window.confirm) {
      const ok = window.confirm(`Bạn có chắc muốn xóa video "${video.title}" khỏi danh sách đã lưu?`);
      if (ok) {
        onDeleteVideo(video.id);
      }
    } else {
      Alert.alert(
        'Xóa video đã lưu',
        `Bạn có chắc muốn xóa video "${video.title}"?`,
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Xóa', style: 'destructive', onPress: () => onDeleteVideo(video.id) },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWithBadge}>
          <Text style={styles.sectionTitle}>🎬 VIDEO ĐÃ LƯU CỦA BẠN</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{videos.length}</Text>
          </View>
        </View>
        <Text style={styles.subNote}>Lưu vĩnh viễn trên web</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {videos.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelectVideo(item);
              }}
            >
              {/* Thumbnail */}
              <View style={styles.thumbWrapper}>
                <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.savedPill}>
                  <Text style={styles.savedPillText}>✓ ĐÃ LƯU</Text>
                </View>
                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>{item.duration || 'Video'}</Text>
                </View>
              </View>

              {/* Thông tin video */}
              <View style={styles.infoWrapper}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.channelName} numberOfLines={1}>
                  {item.channelTitle}
                </Text>

                <View style={styles.metaFooter}>
                  <View style={styles.subCountBadge}>
                    <Text style={styles.subCountText}>
                      💬 {item.subtitles?.length || 0} câu phụ đề
                    </Text>
                  </View>

                  {/* Nút xóa */}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.deleteBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.8,
  },
  countBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  countText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  subNote: {
    color: '#94A3B8',
    fontSize: 11,
  },
  scrollList: {
    gap: 14,
    paddingRight: 16,
  },
  cardContainer: {
    width: 240,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbWrapper: {
    width: '100%',
    height: 130,
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  savedPill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  savedPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  durationTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  infoWrapper: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 18,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 8,
  },
  metaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  subCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  subCountText: {
    fontSize: 10,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  deleteBtnText: {
    fontSize: 12,
  },
});
