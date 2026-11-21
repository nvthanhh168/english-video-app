import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { SentenceSegment, SubtitleFontSize, SubtitleFontFamily } from '../../types/video';

interface BilingualSubtitlesProps {
  sentence: SentenceSegment;
  isBlindListening: boolean;
  fontSize: SubtitleFontSize;
  fontFamily: SubtitleFontFamily;
  onPressKeyWord?: (word: string) => void;
  onPressRevealSubtitles?: () => void;
}

export const BilingualSubtitles: React.FC<BilingualSubtitlesProps> = ({
  sentence,
  isBlindListening,
  fontSize,
  fontFamily,
  onPressKeyWord,
  onPressRevealSubtitles,
}) => {
  // Xác định kích thước chữ Tiếng Anh & Tiếng Việt
  const enFontSize = fontSize === 'small' ? 18 : fontSize === 'medium' ? 22 : 26;
  const viFontSize = fontSize === 'small' ? 13 : fontSize === 'medium' ? 15 : 17;

  // Lấy font family tương ứng
  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'serif':
        return { fontFamily: 'serif' };
      case 'monospace':
        return { fontFamily: 'monospace' };
      default:
        return undefined; // System font
    }
  };

  // Render text tiếng Anh có tô màu nổi bật từ vựng chính (Key words)
  const renderHighlightedEnglishText = () => {
    const { textEn, keyWords } = sentence;
    if (!keyWords || keyWords.length === 0) {
      return <Text style={[styles.textEn, { fontSize: enFontSize }, getFontFamilyStyle()]}>{textEn}</Text>;
    }

    // Tạo regex gom tất cả các keyword
    const escapedWords = keyWords.map((kw) => kw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    const parts = textEn.split(regex);

    return (
      <Text style={[styles.textEn, { fontSize: enFontSize }, getFontFamilyStyle()]}>
        {parts.map((part, index) => {
          const matchedKw = keyWords.find(
            (kw) => kw.word.toLowerCase() === part.toLowerCase()
          );

          if (matchedKw) {
            return (
              <Text
                key={index}
                onPress={() => onPressKeyWord && onPressKeyWord(matchedKw.word)}
                style={[
                  styles.highlightedWord,
                  { color: matchedKw.highlightColor || '#22C55E' },
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
      <View style={styles.subtitlesCard}>
        {/* Nội dung phụ đề song ngữ */}
        <View style={styles.textContainer}>
          {renderHighlightedEnglishText()}
          <Text style={[styles.textVi, { fontSize: viFontSize }]}>
            {sentence.textVi}
          </Text>
        </View>

        {/* Chế độ Nghe Mù (Blind Listening Overlay Blur) */}
        {isBlindListening && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressRevealSubtitles}
            style={StyleSheet.absoluteFillObject}
          >
            <BlurView intensity={70} tint="dark" style={styles.blurCover}>
              <View style={styles.blindListeningBadge}>
                <Text style={styles.blindListeningIcon}>🎧</Text>
                <Text style={styles.blindListeningText}>Chế độ Nghe Mù đang bật</Text>
                <Text style={styles.blindListeningSubtext}>Tập trung vào âm thanh bản xứ</Text>
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
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  subtitlesCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)', // Slate 900 mờ
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  textContainer: {
    alignItems: 'center',
  },
  textEn: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  highlightedWord: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)', // Nền xanh ngọc nhẹ
    borderRadius: 4,
    paddingHorizontal: 2,
    textDecorationLine: 'underline',
  },
  textVi: {
    color: '#94A3B8', // Slate 400
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  blurCover: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  blindListeningBadge: {
    alignItems: 'center',
    padding: 10,
  },
  blindListeningIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  blindListeningText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 14,
  },
  blindListeningSubtext: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
});
