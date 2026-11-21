import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  isReady: boolean;
  onPress: () => void;
  gameState: 'playing' | 'checking' | 'success' | 'error';
}

export const CheckActionCTA: React.FC<Props> = ({ isReady, onPress, gameState }) => {
  const getButtonStyle = () => {
    if (gameState === 'success') return styles.buttonSuccess;
    if (gameState === 'error') return styles.buttonError;
    return isReady ? styles.buttonReady : styles.buttonDisabled;
  };

  return (
    <TouchableOpacity
      style={[styles.buttonBase, getButtonStyle()]}
      disabled={!isReady && gameState !== 'success'}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.buttonText}>
        {gameState === 'success' ? 'Continue →' : 'Check'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    margin: 20,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  buttonReady: {
    backgroundColor: '#6366F1', // Tím chủ đạo
    shadowColor: '#6366F1',
    shadowOpacity: 0.5,
  },
  buttonSuccess: {
    backgroundColor: '#10B981', // Xanh lá
    shadowColor: '#10B981',
    shadowOpacity: 0.5,
  },
  buttonError: {
    backgroundColor: '#EF4444', // Đỏ
    shadowColor: '#EF4444',
    shadowOpacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
