import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AiMascotMessage } from '../../types/guided';

interface MascotHeaderProps {
  mascot: AiMascotMessage;
}

export const MascotHeader: React.FC<MascotHeaderProps> = ({ mascot }) => {
  return (
    <View style={styles.container}>
      {/* 1. Avatar chú chim cánh cụt đeo tai nghe (Mascot) */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.mascotEmoji}>🐧🎧</Text>
        </View>
        <View style={styles.onlineDot} />
      </View>

      {/* 2. Bong bóng chat (Chat Bubble) hiển thị câu thoại mở đầu */}
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleTail} />
        <View style={styles.bubbleCard}>
          <Text style={styles.mascotName}>
            {mascot.name || 'Penguin AI Tutor'}
          </Text>
          <Text style={styles.messageText}>{mascot.message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EEF2FF', // Indigo 50
    borderWidth: 2,
    borderColor: '#6366F1', // Indigo 500
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  mascotEmoji: {
    fontSize: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#10B981', // Emerald 500
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  bubbleWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    left: -8,
    top: 20,
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFFFFF',
    zIndex: 2,
  },
  bubbleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mascotName: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageText: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
});
