import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ClipSubtitles, TargetPhrase } from '../../types/module4';

interface ContextualBottomSubtitlesProps {
  subtitles: ClipSubtitles;
  targetPhrase: TargetPhrase;
  onToggleLoop?: () => void;
  onToggleBookmark?: () => void;
  isLooping?: boolean;
  isBookmarked?: boolean;
}

export const ContextualBottomSubtitles: React.FC<ContextualBottomSubtitlesProps> = ({
  subtitles,
  targetPhrase,
  onToggleLoop,
  onToggleBookmark,
  isLooping = false,
  isBookmarked = false,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');

  // Highlight cụm từ khóa mục tiêu trong câu tiếng Anh
  const renderHighlightedSubtitle = () => {
    const { en } = subtitles;
    const target = targetPhrase.english;

    // Tách chuỗi theo cụm từ khóa
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = en.split(regex);

    return (
      <Text
        style={[
          styles.textEn,
          fontSizeLevel === 'large' ? styles.textEnLarge : styles.textEnNormal,
        ]}
      >
        {parts.map((part, index) => {
          if (part.toLowerCase() === target.toLowerCase()) {
            return (
              <Text
                key={index}
                style={[
                  styles.targetHighlight,
                  { color: targetPhrase.colorCode || '#A7F3D0' },
                ]}
              >
                {part}
              </Text>
            );
          }
          return <Text key={index}>{part}</Text>;
        })}
      </Text>
    );
  };

  const cycleFontSize = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFontSizeLevel((prev) => (prev === 'normal' ? 'large' : 'normal'));
  };

  return (
    <View style={styles.container}>
      {/* 1. Thẻ phụ đề song ngữ */}
      <View style={styles.subtitlesCard}>
        {renderHighlightedSubtitle()}
        <Text style={styles.textVi}>{subtitles.vi}</Text>
      </View>

      {/* 2. Thanh công cụ học tập cơ bản ở dưới cùng */}
      <View style={styles.toolbarRow}>
        {/* Nút 1: Đổi font chữ [Aa] */}
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={cycleFontSize}
          activeOpacity={0.7}
        >
          <View style={styles.toolIconBox}>
            <Text style={styles.toolIconAa}>Aa</Text>
          </View>
          <Text style={styles.toolLabel}>Cỡ chữ</Text>
        </TouchableOpacity>

        {/* Nút 2: Vòng lặp [🔁] */}
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={onToggleLoop}
          activeOpacity={0.7}
        >
          <View
            style={[styles.toolIconBox, isLooping && styles.toolIconBoxActive]}
          >
            <Text style={styles.toolGlyph}>🔁</Text>
          </View>
          <Text style={[styles.toolLabel, isLooping && styles.toolLabelActive]}>
            {isLooping ? 'Đang Lặp' : 'Lặp câu'}
          </Text>
        </TouchableOpacity>

        {/* Nút 3: Bookmark [🔖] */}
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={onToggleBookmark}
          activeOpacity={0.7}
        >
          <View
            style={[styles.toolIconBox, isBookmarked && styles.toolIconBoxBookmark]}
          >
            <Text style={styles.toolGlyph}>{isBookmarked ? '🔖' : '🏷️'}</Text>
          </View>
          <Text
            style={[styles.toolLabel, isBookmarked && styles.toolLabelBookmark]}
          >
            {isBookmarked ? 'Đã lưu' : 'Lưu cụm'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
  },
  subtitlesCard: {
    backgroundColor: '#0F172A', // Slate 900 Dark Mode
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  textEn: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 6,
  },
  textEnNormal: {
    fontSize: 18,
    lineHeight: 26,
  },
  textEnLarge: {
    fontSize: 22,
    lineHeight: 30,
  },
  targetHighlight: {
    fontWeight: '800',
    backgroundColor: 'rgba(167, 243, 208, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 4,
    textDecorationLine: 'underline',
  },
  textVi: {
    color: '#94A3B8', // Slate 400
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '400',
  },
  toolbarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  toolBtn: {
    alignItems: 'center',
    paddingVertical: 4,
    minWidth: 60,
  },
  toolIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  toolIconAa: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  toolGlyph: {
    fontSize: 16,
  },
  toolIconBoxActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderColor: '#38BDF8',
    borderWidth: 1.5,
  },
  toolLabelActive: {
    color: '#38BDF8',
    fontWeight: 'bold',
  },
  toolIconBoxBookmark: {
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderColor: '#10B981',
    borderWidth: 1.5,
  },
  toolLabelBookmark: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  toolLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '500',
  },
});
