import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { PoolWordItem } from '../../types/module5';

interface WordPoolZoneProps {
  pool: PoolWordItem[];
  onSelectWord: (wordItem: PoolWordItem) => void;
  disabled?: boolean;
}

export const WordPoolZone: React.FC<WordPoolZoneProps> = ({
  pool,
  onSelectWord,
  disabled = false,
}) => {
  const handlePressWord = (item: PoolWordItem) => {
    if (disabled || item.isUsed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectWord(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>CHỌN TỪ ĐỂ GHÉP VÀO Ô TRỐNG</Text>

      <View style={styles.poolWrap}>
        {pool.map((item) => {
          if (item.isUsed) {
            // Khi từ đã được chọn lên Drop Zone, hiển thị ô placeholder mờ
            return (
              <View key={item.id} style={styles.usedPlaceholderBox}>
                <Text style={styles.usedPlaceholderText}>{item.text}</Text>
              </View>
            );
          }

          // Từ có sẵn để chạm chọn
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handlePressWord(item)}
              style={styles.activeWordBlock}
            >
              <Text style={styles.activeWordText}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 14,
    textAlign: 'center',
  },
  poolWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  activeWordBlock: {
    backgroundColor: '#1E293B', // Slate 800
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  activeWordText: {
    color: '#FFFFFF', // Chữ trắng nổi bật
    fontSize: 16,
    fontWeight: '700',
  },
  usedPlaceholderBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  usedPlaceholderText: {
    color: 'transparent', // Giữ nguyên kích thước nhưng ẩn chữ
    fontSize: 16,
    fontWeight: '700',
  },
});
