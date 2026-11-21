import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { LinearTransition, SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { WordBlock } from '../../types/module5';

interface DropZoneProps {
  givenText: string;
  selectedWords: WordBlock[];
  totalSlots: number;
  onDeselect: (block: WordBlock) => void;
  isError: boolean;
  isSuccess?: boolean;
}

export const DropZoneArea: React.FC<DropZoneProps> = ({
  givenText,
  selectedWords,
  totalSlots,
  onDeselect,
  isError,
  isSuccess = false,
}) => {
  return (
    <View style={styles.dropZoneContainer}>
      <Text style={styles.givenText}>{givenText}</Text>

      <View style={styles.slotsWrapper}>
        {/* Render placeholders đứt nét */}
        {Array.from({ length: totalSlots }).map((_, index) => (
          <View key={`slot-${index}`} style={styles.emptySlot} />
        ))}

        {/* Render khối chữ bay lấp vào bằng Reanimated */}
        <Animated.View style={styles.absoluteLayer} layout={LinearTransition}>
          {selectedWords.map((block) => (
            <Animated.View
              key={block.id}
              layout={LinearTransition}
              entering={SlideInDown.duration(200)}
              exiting={SlideOutUp.duration(200)}
            >
              <TouchableOpacity
                style={[
                  styles.wordBlock,
                  isError && styles.wordBlockError,
                  isSuccess && styles.wordBlockSuccess,
                ]}
                onPress={() => onDeselect(block)}
                activeOpacity={0.8}
              >
                <Text style={styles.wordText}>{block.word}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropZoneContainer: {
    padding: 20,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  givenText: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  slotsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 52,
    position: 'relative',
  },
  emptySlot: {
    height: 42,
    minWidth: 56,
    borderWidth: 1.5,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  absoluteLayer: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wordBlock: {
    backgroundColor: '#374151',
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wordBlockError: {
    backgroundColor: '#EF4444', // Đỏ khi sai
    borderColor: '#F87171',
  },
  wordBlockSuccess: {
    backgroundColor: '#10B981', // Xanh lá khi đúng
    borderColor: '#34D399',
  },
  wordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
