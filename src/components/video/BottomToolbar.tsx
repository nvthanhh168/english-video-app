import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PlaybackRate } from '../../types/video';

interface BottomToolbarProps {
  playbackRate: PlaybackRate;
  isLooping: boolean;
  isBookmarked: boolean;
  isStarred: boolean;
  onPressFontSettings: () => void;
  onToggleLoop: () => void;
  onCyclePlaybackRate: () => void;
  onCopyEnglishText: () => void;
  onToggleBookmark: () => void;
  onToggleStar: () => void;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  playbackRate,
  isLooping,
  isBookmarked,
  isStarred,
  onPressFontSettings,
  onToggleLoop,
  onCyclePlaybackRate,
  onCopyEnglishText,
  onToggleBookmark,
  onToggleStar,
}) => {
  const isSlow = playbackRate < 1.0;

  return (
    <View style={styles.fixedContainer}>
      <View style={styles.toolbarRow}>
        {/* Nút 1: Cài đặt hiển thị (Icon chữ A) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressFontSettings}
          activeOpacity={0.7}
        >
          <View style={styles.iconBox}>
            <Text style={styles.fontAaText}>Aa</Text>
          </View>
          <Text style={styles.actionLabel}>Cỡ chữ</Text>
        </TouchableOpacity>

        {/* Nút 2: Vòng lặp (Icon Loop) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleLoop}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, isLooping && styles.activeIconBoxBlue]}>
            <Text style={[styles.iconGlyph, isLooping && styles.activeGlyph]}>
              🔁
            </Text>
          </View>
          <Text style={[styles.actionLabel, isLooping && styles.activeLabelBlue]}>
            {isLooping ? 'Đang Lặp' : 'Tự chuyển'}
          </Text>
        </TouchableOpacity>

        {/* Nút 3: Tốc độ chậm (Icon Con rùa / Snail: 1.0x -> 0.75x -> 0.5x -> 1.0x) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCyclePlaybackRate}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, isSlow && styles.activeIconBoxAmber]}>
            <Text style={styles.iconGlyph}>🐢</Text>
            {isSlow && (
              <View style={styles.speedBadge}>
                <Text style={styles.speedBadgeText}>{playbackRate}x</Text>
              </View>
            )}
          </View>
          <Text style={[styles.actionLabel, isSlow && styles.activeLabelAmber]}>
            {playbackRate === 1.0 ? '1.0x' : `${playbackRate}x`}
          </Text>
        </TouchableOpacity>

        {/* Nút 4: Copy (Icon 2 tờ giấy) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCopyEnglishText}
          activeOpacity={0.7}
        >
          <View style={styles.iconBox}>
            <Text style={styles.iconGlyph}>📑</Text>
          </View>
          <Text style={styles.actionLabel}>Copy</Text>
        </TouchableOpacity>

        {/* Nút 5: Lưu từ/câu (Icon Bookmark: outline <-> filled) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleBookmark}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, isBookmarked && styles.activeIconBoxEmerald]}>
            <Text style={styles.iconGlyph}>
              {isBookmarked ? '🔖' : '🏷️'}
            </Text>
          </View>
          <Text style={[styles.actionLabel, isBookmarked && styles.activeLabelEmerald]}>
            {isBookmarked ? 'Đã lưu' : 'Lưu câu'}
          </Text>
        </TouchableOpacity>

        {/* Nút 6: Yêu thích (Icon Ngôi sao: outline <-> filled) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleStar}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, isStarred && styles.activeIconBoxYellow]}>
            <Text style={styles.iconGlyph}>
              {isStarred ? '⭐' : '☆'}
            </Text>
          </View>
          <Text style={[styles.actionLabel, isStarred && styles.activeLabelYellow]}>
            {isStarred ? 'Đã thích' : 'Yêu thích'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#050811', // Dark Mode đồng nhất
  },
  toolbarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Dàn trải đều theo yêu cầu Phần 1
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  fontAaText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 16,
  },
  iconGlyph: {
    fontSize: 18,
  },
  activeGlyph: {
    transform: [{ scale: 1.15 }],
  },
  activeIconBoxBlue: {
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  activeLabelBlue: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  activeIconBoxAmber: {
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  activeLabelAmber: {
    color: '#F59E0B',
    fontWeight: '700',
  },
  speedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  speedBadgeText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '900',
  },
  activeIconBoxEmerald: {
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  activeLabelEmerald: {
    color: '#10B981',
    fontWeight: '700',
  },
  activeIconBoxYellow: {
    backgroundColor: 'rgba(234, 179, 8, 0.25)',
    borderWidth: 1.5,
    borderColor: '#EAB308',
  },
  activeLabelYellow: {
    color: '#EAB308',
    fontWeight: '700',
  },
  actionLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '500',
  },
});
