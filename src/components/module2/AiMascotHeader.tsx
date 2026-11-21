import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AiMascotData } from '../../types/module2';

interface AiMascotHeaderProps {
  mascot: AiMascotData;
}

export const AiMascotHeader: React.FC<AiMascotHeaderProps> = ({ mascot }) => {
  return (
    <View style={styles.container}>
      {/* 1. Avatar Trợ lý ảo (Chú chim cánh cụt đeo tai nghe) */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.mascotEmoji}>🐧🎧</Text>
        </View>
        <View style={styles.onlineBadge} />
      </View>

      {/* 2. Bong bóng chat (Chat Bubble) chứa câu thoại mở đầu */}
      <View style={styles.bubbleWrapper}>
        {/* Mũi nhọn tam giác chỉ vào Mascot */}
        <View style={styles.bubbleTail} />
        
        <View style={styles.bubbleCard}>
          <Text style={styles.mascotName}>Penguin AI Tutor</Text>
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
    paddingTop: 12,
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
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  mascotEmoji: {
    fontSize: 28,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
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
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 9,
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
    color: '#1E293B', // Slate 800
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
});
