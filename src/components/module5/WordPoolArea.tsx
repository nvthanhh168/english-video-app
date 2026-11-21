import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { LinearTransition, SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { WordBlock } from '../../types/module5';

interface WordPoolProps {
  wordPool: WordBlock[];
  onSelect: (block: WordBlock) => void;
  disabled?: boolean;
}

export const WordPoolArea: React.FC<WordPoolProps> = ({
  wordPool,
  onSelect,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>CHỌN TỪ ĐỂ GHÉP VÀO Ô TRỐNG</Text>

      <Animated.View style={styles.poolWrapper} layout={LinearTransition}>
        {wordPool.map((block) => (
          <Animated.View
            key={block.id}
            layout={LinearTransition}
            entering={SlideInDown.duration(200)}
            exiting={SlideOutUp.duration(200)}
          >
            <TouchableOpacity
              style={styles.wordBlock}
              onPress={() => onSelect(block)}
              disabled={disabled}
              activeOpacity={0.75}
            >
              <Text style={styles.wordText}>{block.word}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 16,
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 14,
    textAlign: 'center',
  },
  poolWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    minHeight: 50,
  },
  wordBlock: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  wordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
