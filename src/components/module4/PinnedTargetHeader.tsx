import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TargetPhrase } from '../../types/module4';

interface PinnedTargetHeaderProps {
  targetPhrase: TargetPhrase;
  currentIndex: number;
  totalClips: number;
  onClose?: () => void;
}

export const PinnedTargetHeader: React.FC<PinnedTargetHeaderProps> = ({
  targetPhrase,
  currentIndex,
  totalClips,
  onClose,
}) => {
  return (
    <View style={styles.pinnedHeaderContainer}>
      {/* 1. Thanh tiến trình dạng đoạn (Segmented Progress Bar) */}
      <View style={styles.progressRow}>
        <View style={styles.segmentsContainer}>
          {Array.from({ length: totalClips }).map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.segmentBar,
                idx <= currentIndex
                  ? styles.segmentBarActive
                  : styles.segmentBarInactive,
              ]}
            />
          ))}
        </View>

        {/* Con số hiển thị vị trí hiện tại (ví dụ: 1/10) */}
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {currentIndex + 1}/{totalClips}
          </Text>
        </View>

        {/* Nút đóng / Thoát */}
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2. Ghim cố định cụm từ đang học ở góc trái (Pinned Fixed) */}
      <View style={styles.pinnedPhraseBox}>
        <View style={styles.phraseHeaderLine}>
          <View style={styles.liveDot} />
          <Text style={styles.pinnedLabel}>CỤM TỪ MỤC TIÊU</Text>
        </View>

        <Text
          style={[
            styles.targetEnglish,
            { color: targetPhrase.colorCode || '#A7F3D0' },
          ]}
        >
          {targetPhrase.english}
        </Text>
        <Text style={styles.targetVietnamese}>{targetPhrase.vietnamese}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pinnedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50, // Luôn ghim cố định ở lớp trên cùng không bị cuộn
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'rgba(5, 8, 17, 0.85)', // Nền tối mờ che phủ nhẹ
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  segmentsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    height: 4,
  },
  segmentBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  segmentBarActive: {
    backgroundColor: '#A7F3D0', // Xanh mint
  },
  segmentBarInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  counterBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  counterText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pinnedPhraseBox: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.3)', // Viền xanh mint nhẹ
  },
  phraseHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  pinnedLabel: {
    color: '#94A3B8',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  targetEnglish: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  targetVietnamese: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
});
