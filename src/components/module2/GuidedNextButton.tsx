import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

interface GuidedNextButtonProps {
  onPress: () => void;
  label?: string;
}

export const GuidedNextButton: React.FC<GuidedNextButtonProps> = ({
  onPress,
  label = 'Tiếp tục',
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={styles.pillButton}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
        <View style={styles.arrowCircle}>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5', // Xanh tím (Indigo 600)
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 9999, // Hình viên thuốc (Pill shape)
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    gap: 12,
    minWidth: 180,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    marginTop: -2,
  },
});
