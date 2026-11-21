import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface BlindListeningToggleProps {
  isBlindListening: boolean;
  onToggle: () => void;
}

export const BlindListeningToggle: React.FC<BlindListeningToggleProps> = ({
  isBlindListening,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isBlindListening ? styles.activeButton : styles.inactiveButton,
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{isBlindListening ? '🎧' : '👁️'}</Text>
      </View>
      <Text
        style={[
          styles.text,
          isBlindListening ? styles.activeText : styles.inactiveText,
        ]}
      >
        {isBlindListening ? 'Nghe mù (Đang bật)' : 'Tắt phụ đề (Nghe mù)'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inactiveButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: 'rgba(37, 99, 235, 0.9)', // Blue 600
    borderColor: '#60A5FA',
  },
  iconContainer: {
    marginRight: 6,
  },
  icon: {
    fontSize: 14,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  inactiveText: {
    color: '#E2E8F0',
  },
  activeText: {
    color: '#FFFFFF',
  },
});
