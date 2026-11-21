import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SelectedWordItem, ExerciseStatus } from '../../types/module5';

interface SentenceDropZoneProps {
  givenText: string;
  totalSlots: number;
  selectedWords: SelectedWordItem[];
  status: ExerciseStatus;
  shakeTranslateX: Animated.Value;
  onUndoWord: (selectedItem: SelectedWordItem) => void;
}

export const SentenceDropZone: React.FC<SentenceDropZoneProps> = ({
  givenText,
  totalSlots,
  selectedWords,
  status,
  shakeTranslateX,
  onUndoWord,
}) => {
  const handleUndo = (item: SelectedWordItem) => {
    if (status === 'checking') return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onUndoWord(item);
  };

  // Xác định màu sắc của khối từ dựa trên status
  const getWordBlockStyle = (isCorrect?: boolean) => {
    if (status === 'correct') {
      return styles.wordBlockCorrect;
    }
    if (status === 'wrong') {
      return styles.wordBlockWrong;
    }
    return styles.wordBlockNormal;
  };

  return (
    <Animated.View
      style={[
        styles.dropZoneContainer,
        { transform: [{ translateX: shakeTranslateX }] },
      ]}
    >
      <View style={styles.contentWrap}>
        {/* Phần đầu câu đã được điền sẵn (Given text) */}
        <View style={styles.givenTextBox}>
          <Text style={styles.givenTextString}>{givenText}</Text>
        </View>

        {/* Các ô trống hoặc các từ đã được điền */}
        {Array.from({ length: totalSlots }).map((_, index) => {
          const filledWord = selectedWords.find((w) => w.slotIndex === index);

          if (filledWord) {
            return (
              <TouchableOpacity
                key={`slot_filled_${index}`}
                activeOpacity={0.7}
                onPress={() => handleUndo(filledWord)}
                style={[
                  styles.filledWordBlock,
                  getWordBlockStyle(filledWord.isCorrect),
                ]}
              >
                <Text style={styles.filledWordText}>{filledWord.text}</Text>
              </TouchableOpacity>
            );
          }

          // Ô trống nét đứt (Dashed border slot)
          return (
            <View key={`slot_empty_${index}`} style={styles.emptyDashedSlot}>
              <View style={styles.dashedLinePlaceholder} />
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dropZoneContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 120,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
  },
  contentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  givenTextBox: {
    paddingVertical: 6,
    paddingRight: 4,
  },
  givenTextString: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  emptyDashedSlot: {
    minWidth: 54,
    height: 38,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#475569', // Slate 600
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dashedLinePlaceholder: {
    width: 20,
    height: 2,
    backgroundColor: '#334155',
    borderRadius: 1,
  },
  filledWordBlock: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  wordBlockNormal: {
    backgroundColor: '#374151', // Gray 700
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  wordBlockCorrect: {
    backgroundColor: '#10B981', // Emerald 500
    borderColor: '#34D399',
    borderWidth: 1.5,
  },
  wordBlockWrong: {
    backgroundColor: '#EF4444', // Red 500
    borderColor: '#F87171',
    borderWidth: 1.5,
  },
  filledWordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
