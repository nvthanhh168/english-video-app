import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { SubtitlesData, KeyWordItem, SubtitleSize } from '../../types/video';

interface MiddleSubtitleSectionProps {
  subtitles: SubtitlesData;
  keyWords: KeyWordItem[];
  isBlindListening: boolean;
  fontSize: SubtitleSize;
  onToggleBlindListening: () => void;
  onPressKeyWord?: (word: string) => void;
}

export const MiddleSubtitleSection: React.FC<MiddleSubtitleSectionProps> = ({
  subtitles,
  keyWords,
  isBlindListening,
  fontSize,
  onToggleBlindListening,
  onPressKeyWord,
}) => {
  // Tính toán kích thước font chữ
  const enFontSize = fontSize === 'normal' ? 21 : fontSize === 'large' ? 25 : 29;
  const enLineHeight = fontSize === 'normal' ? 32 : fontSize === 'large' ? 38 : 44;
  const viFontSize = fontSize === 'normal' ? 15 : fontSize === 'large' ? 17 : 19;
  const viLineHeight = fontSize === 'normal' ? 22 : fontSize === 'large' ? 26 : 28;

  // Xử lý tách chuỗi và Highlight các Key words
  const renderHighlightedEnglish = () => {
    const { en } = subtitles;
    if (!keyWords || keyWords.length === 0) {
      return (
        <Text style={[styles.textEn, { fontSize: enFontSize, lineHeight: enLineHeight }]}>
          {en}
        </Text>
      );
    }

    // Escape ký tự đặc biệt cho Regex
    const escapedWords = keyWords.map((k) => k.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    const parts = en.split(regex);

    return (
      <Text style={[styles.textEn, { fontSize: enFontSize, lineHeight: enLineHeight }]}>
        {parts.map((part, index) => {
          const matched = keyWords.find((k) => k.word.toLowerCase() === part.toLowerCase());

          if (matched) {
            const highlightColor = matched.highlightColor || '#32CD32'; // Xanh lá / Mint
            return (
              <Text
                key={index}
                onPress={() => onPressKeyWord && onPressKeyWord(matched.word)}
                style={[
                  styles.highlightedWord,
                  {
                    color: highlightColor,
                    backgroundColor: 'rgba(50, 205, 50, 0.15)', // Nền xanh mint mờ
                  },
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

  return (
    <View style={styles.container}>
      <View style={styles.subtitleCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 1. Câu Tiếng Anh (Font to, in đậm, màu trắng, căn lề trái) */}
          {renderHighlightedEnglish()}

          {/* Khoảng cách nhỏ giữa 2 câu */}
          <View style={styles.separator} />

          {/* 2. Câu Tiếng Việt (Font nhỏ hơn, màu xám opacity 0.7, căn lề trái) */}
          <Text
            style={[
              styles.textVi,
              { fontSize: viFontSize, lineHeight: viLineHeight },
            ]}
          >
            {subtitles.vi}
          </Text>
        </ScrollView>

        {/* 3. Chế độ Nghe Mù (Blind Listening Blur Effect) */}
        {isBlindListening && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onToggleBlindListening}
            style={StyleSheet.absoluteFillObject}
          >
            <BlurView intensity={80} tint="dark" style={styles.blurCover}>
              <View style={styles.blindBadge}>
                <Text style={styles.blindIcon}>🎧</Text>
                <Text style={styles.blindTitle}>Listen without subtitles</Text>
                <Text style={styles.blindInstruction}>
                  (Chạm để hiển thị lại phụ đề)
                </Text>
              </View>
            </BlurView>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm trọn không gian giữa màn hình theo Phần 1
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  subtitleCard: {
    flex: 1,
    backgroundColor: '#0F172A', // Nền Dark Mode Slate 900
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textEn: {
    color: '#FFFFFF', // Màu trắng
    fontWeight: '700', // In đậm (bold)
    textAlign: 'left', // Căn lề trái nghiêm ngặt theo yêu cầu
    letterSpacing: 0.3,
  },
  highlightedWord: {
    fontWeight: '800',
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  separator: {
    height: 12,
  },
  textVi: {
    color: '#94A3B8', // Màu xám (Slate 400)
    opacity: 0.85,
    fontWeight: '400',
    textAlign: 'left', // Căn lề trái
    letterSpacing: 0.2,
  },
  blurCover: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  blindBadge: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  blindIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  blindTitle: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  blindInstruction: {
    color: '#60A5FA',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});
