import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { MOCK_MODULE5_EXERCISES } from '../data/mockModule5Exercises';
import { useSentenceGame } from '../hooks/useSentenceGame';
import { ExerciseHeader } from '../components/module5/ExerciseHeader';
import { NoSubVideoPlayer } from '../components/module5/NoSubVideoPlayer';
import { DropZoneArea } from '../components/module5/DropZoneArea';
import { WordPoolArea } from '../components/module5/WordPoolArea';
import { CheckActionCTA } from '../components/module5/CheckActionCTA';

export const BuildSentenceGameScreen: React.FC = () => {
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const currentExercise = MOCK_MODULE5_EXERCISES[exerciseIndex];

  // Khởi tạo hook quản lý game
  const {
    wordPool,
    selectedWords,
    gameState,
    handleSelectWord,
    handleDeselectWord,
    handleCheckAnswer,
    isReadyToCheck,
  } = useSentenceGame(
    currentExercise.shuffledPool,
    currentExercise.correctOrder
  );

  const handleActionPress = () => {
    if (gameState === 'success') {
      // Chuyển sang bài tập tiếp theo
      setExerciseIndex((prev) => (prev + 1) % MOCK_MODULE5_EXERCISES.length);
    } else {
      handleCheckAnswer();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
      <View style={styles.screenContainer}>
        {/* 1. Thanh tiến trình và Tiêu đề */}
        <ExerciseHeader
          currentStep={exerciseIndex + 1}
          totalSteps={MOCK_MODULE5_EXERCISES.length}
          instruction={currentExercise.instruction}
        />

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 2. Trình phát video (Ẩn hoàn toàn phụ đề) */}
          <NoSubVideoPlayer videoUrl={currentExercise.videoUrl} />

          {/* 3. Khu vực các ô đứt nét (Drop Zone) */}
          <DropZoneArea
            givenText={currentExercise.givenText}
            selectedWords={selectedWords}
            totalSlots={currentExercise.correctOrder.length}
            onDeselect={handleDeselectWord}
            isError={gameState === 'error'}
            isSuccess={gameState === 'success'}
          />

          {/* 4. Khu vực chứa các khối từ vựng xáo trộn (Word Pool) */}
          <WordPoolArea
            wordPool={wordPool}
            onSelect={handleSelectWord}
            disabled={gameState === 'checking' || gameState === 'success'}
          />
        </ScrollView>

        {/* 5. Nút Check đổi trạng thái Disabled -> Active -> Continue */}
        <CheckActionCTA
          isReady={isReadyToCheck}
          onPress={handleActionPress}
          gameState={gameState}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    justifyContent: 'space-between',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
});
