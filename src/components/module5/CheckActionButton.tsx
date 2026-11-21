import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ExerciseStatus } from '../../types/module5';

interface CheckActionButtonProps {
  isAllFilled: boolean;
  status: ExerciseStatus;
  onPressCheck: () => void;
  onPressContinue: () => void;
}

export const CheckActionButton: React.FC<CheckActionButtonProps> = ({
  isAllFilled,
  status,
  onPressCheck,
  onPressContinue,
}) => {
  const isCorrect = status === 'correct';

  const handlePress = () => {
    if (isCorrect) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPressContinue();
    } else if (isAllFilled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onPressCheck();
    }
  };

  const getButtonStyle = () => {
    if (isCorrect) return styles.btnCorrect;
    if (isAllFilled) return styles.btnActive;
    return styles.btnDisabled;
  };

  const getButtonLabel = () => {
    if (isCorrect) return 'TIẾP TỤC →';
    if (status === 'checking') return 'ĐANG KIỂM TRA...';
    return 'KIỂM TRA ĐÁP ÁN';
  };

  return (
    <View style={styles.fixedBottomContainer}>
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={!isAllFilled && !isCorrect}
        onPress={handlePress}
        style={[styles.baseButton, getButtonStyle()]}
      >
        <Text style={[styles.btnText, !isAllFilled && !isCorrect && styles.btnTextDisabled]}>
          {getButtonLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedBottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: '#0A0E1A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  baseButton: {
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDisabled: {
    backgroundColor: '#1E293B', // Mờ khi chưa đủ từ
    opacity: 0.5,
  },
  btnActive: {
    backgroundColor: '#4F46E5', // Xanh tím sáng khi đã điền kín các ô
    shadowColor: '#4F46E5',
    shadowOpacity: 0.5,
  },
  btnCorrect: {
    backgroundColor: '#10B981', // Xanh lá cây khi đúng
    shadowColor: '#10B981',
    shadowOpacity: 0.5,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  btnTextDisabled: {
    color: '#64748B',
  },
});
