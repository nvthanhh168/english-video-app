import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  currentStep: number;
  totalSteps: number;
  instruction?: string;
}

export const ExerciseHeader: React.FC<Props> = ({
  currentStep,
  totalSteps,
  instruction = 'Build the Sentence',
}) => {
  const progressRatio = Math.min(Math.max(currentStep / totalSteps, 0), 1);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.progressRow}>
        <View style={styles.progressBarTrack}>
          <View
            style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]}
          />
        </View>
        <Text style={styles.progressCounterText}>
          {currentStep}/{totalSteps}
        </Text>
      </View>

      <Text style={styles.titleText}>{instruction}</Text>
      <Text style={styles.subtitleText}>Nghe âm thanh và ghép câu hoàn chỉnh</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: '#0A0E1A',
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  progressCounterText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitleText: {
    color: '#64748B',
    fontSize: 12.5,
    marginTop: 2,
    textAlign: 'center',
  },
});
