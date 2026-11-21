import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

interface GeneratePlanButtonProps {
  onPress: () => void;
  ctaText?: string;
}

export const GeneratePlanButton: React.FC<GeneratePlanButtonProps> = ({
  onPress,
  ctaText = 'Generate My Plan',
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  return (
    <View style={styles.fixedBottomContainer}>
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handlePress}
        style={styles.bigCtaButton}
      >
        <Text style={styles.ctaIcon}>✨</Text>
        <Text style={styles.ctaText}>{ctaText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedBottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bigCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5', // Xanh tím nổi bật
    height: 56,
    borderRadius: 18, // Bo góc tròn trịa
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  ctaIcon: {
    fontSize: 18,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
