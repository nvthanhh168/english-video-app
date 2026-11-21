import React, { useState } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 44) / 2;

interface LevelVideoFeedProps {
  videos: YoutubeVideoItem[];
  onSelectVideo: (video: YoutubeVideoItem) => void;
}

export const LevelVideoFeed: React.FC<LevelVideoFeedProps> = ({
  videos,
  onSelectVideo,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('B1');

  const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const filteredVideos = videos.filter((v) => v.level === selectedLevel);

  const handleSelectLevel = (lvl: CefrLevel) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedLevel(lvl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>THƯ VIỆN VIDEO THEO TRÌNH ĐỘ CEFR</Text>

      {/* 1. Hàng Tab cuộn ngang mốc CEFR (A1 - C2) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {levels.map((lvl) => {
          const isActive = selectedLevel === lvl;
          return (
            <TouchableOpacity
              key={lvl}
              style={[styles.levelTab, isActive && styles.levelTabActive]}
              onPress={() => handleSelectLevel(lvl)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.levelTabText, isActive && styles.levelTabTextActive]}
              >
                Cấp độ {lvl}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. Lưới 2 cột (Grid) hiển thị video */}
      <View style={styles.gridContainer}>
        {filteredVideos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.videoCard}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onSelectVideo(item);
            }}
            activeOpacity={0.85}
          >
            {/* Thumbnail với Badge thời lượng và Level */}
            <View style={styles.thumbnailWrapper}>
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{item.level}</Text>
              </View>
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
                <Text style={styles.viewsText}>{item.views}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  sectionHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  levelTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  levelTabActive: {
    backgroundColor: '#DC2626', // Đỏ YouTube chủ đạo
    borderColor: '#EF4444',
  },
  levelTabText: {
    color: '#94A3B8',
    fontSize: 12.5,
    fontWeight: '700',
  },
  levelTabTextActive: {
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
    backgroundColor: '#2563EB',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
    color: '#64748B',
    fontSize: 10.5,
  },
});
