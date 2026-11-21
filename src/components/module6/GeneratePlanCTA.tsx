import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

interface GeneratePlanCTAProps {
  label?: string;
  onPress?: () => void;
}

export const GeneratePlanCTA: React.FC<GeneratePlanCTAProps> = ({
  label = 'Generate My Plan',
  onPress,
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={styles.ctaButton}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <Text style={styles.ctaText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ctaButton: {
    backgroundColor: '#6366F1',
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 24,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
