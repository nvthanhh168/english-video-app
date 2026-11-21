import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface YoutubeStudyToolbarProps {
  isPlaying: boolean;
  playbackRate: number;
  isLoopingSentence: boolean;
  onTogglePlayPause: () => void;
  onChangeSpeed: () => void;
  onToggleLoop: () => void;
  onOpenBreakdown: () => void;
  onCloseStudy: () => void;
}

export const YoutubeStudyToolbar: React.FC<YoutubeStudyToolbarProps> = ({
  isPlaying,
  playbackRate,
  isLoopingSentence,
  onTogglePlayPause,
  onChangeSpeed,
  onToggleLoop,
  onOpenBreakdown,
  onCloseStudy,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Nút Đổi Video / Thoát */}
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onCloseStudy();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.toolIcon}>✕</Text>
          <Text style={styles.toolLabel}>Đổi video</Text>
        </TouchableOpacity>

        {/* Nút Điều chỉnh Tốc độ (Speed) */}
        <TouchableOpacity
          style={styles.toolBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onChangeSpeed();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.speedBadge}>
            <Text style={styles.speedText}>{playbackRate}x</Text>
          </View>
          <Text style={styles.toolLabel}>Tốc độ</Text>
        </TouchableOpacity>

        {/* Nút Phát / Tạm dừng Chính (Play/Pause) */}
        <TouchableOpacity
          style={styles.mainPlayBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onTogglePlayPause();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.mainPlayIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        {/* Nút Lặp lại câu hiện tại (A-B Repeat) */}
        <TouchableOpacity
          style={[styles.toolBtn, isLoopingSentence && styles.toolBtnActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onToggleLoop();
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.toolIcon, isLoopingSentence && styles.toolIconActive]}>
            🔁
          </Text>
          <Text style={[styles.toolLabel, isLoopingSentence && styles.toolLabelActive]}>
            {isLoopingSentence ? 'Đang lặp' : 'Lặp câu'}
          </Text>
        </TouchableOpacity>

        {/* Nút Trợ lý AI Phân tích */}
        <TouchableOpacity
          style={styles.aiBreakdownBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            onOpenBreakdown();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.aiBreakdownIcon}>✨</Text>
          <Text style={styles.aiBreakdownLabel}>AI Phân tích</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0A0F1D',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  toolBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  toolBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  toolIcon: {
    color: '#94A3B8',
    fontSize: 18,
    marginBottom: 2,
  },
  toolIconActive: {
    color: '#10B981',
  },
  toolLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  toolLabelActive: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  speedBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 2,
  },
  speedText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  mainPlayBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  mainPlayIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aiBreakdownBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  aiBreakdownIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  aiBreakdownLabel: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
