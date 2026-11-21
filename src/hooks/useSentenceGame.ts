import { useState, useCallback, useEffect } from 'react';
import { WordBlock } from '../types/module5';
import * as Haptics from 'expo-haptics';

export const useSentenceGame = (initialPool: WordBlock[], correctOrder: string[]) => {
  const [wordPool, setWordPool] = useState<WordBlock[]>(initialPool);
  const [selectedWords, setSelectedWords] = useState<WordBlock[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'checking' | 'success' | 'error'>('playing');

  // Cập nhật lại state khi chuyển bài tập mới
  useEffect(() => {
    setWordPool(initialPool);
    setSelectedWords([]);
    setGameState('playing');
  }, [initialPool]);

  // Chạm vào từ ở Pool -> Đưa lên DropZone
  const handleSelectWord = useCallback((block: WordBlock) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWordPool((prev) => prev.filter((w) => w.id !== block.id));
    setSelectedWords((prev) => [...prev, block]);
  }, []);

  // Chạm vào từ ở DropZone -> Đưa về lại Pool
  const handleDeselectWord = useCallback((block: WordBlock) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedWords((prev) => prev.filter((w) => w.id !== block.id));
    setWordPool((prev) => [...prev, block]);
    if (gameState === 'error') setGameState('playing'); // Reset lỗi nếu user sửa lại
  }, [gameState]);

  const handleCheckAnswer = useCallback(() => {
    const isFull = selectedWords.length === correctOrder.length;
    if (!isFull) return;

    const currentAnswer = selectedWords.map((w) => w.word).join(' ');
    const correctAnswer = correctOrder.join(' ');

    if (currentAnswer === correctAnswer) {
      setGameState('success');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setGameState('error');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      // Tự động hoàn tác sau 1.5s nếu sai để người học xếp lại
      setTimeout(() => {
        setWordPool((prev) => [...prev, ...selectedWords]);
        setSelectedWords([]);
        setGameState('playing');
      }, 1500);
    }
  }, [selectedWords, correctOrder]);

  return {
    wordPool,
    selectedWords,
    gameState,
    handleSelectWord,
    handleDeselectWord,
    handleCheckAnswer,
    isReadyToCheck: selectedWords.length === correctOrder.length,
  };
};
