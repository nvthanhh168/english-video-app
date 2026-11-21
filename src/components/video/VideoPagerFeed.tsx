import React, { useState, useRef, useCallback } from 'react';
import {
  FlatList,
  ViewToken,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { VideoLessonItem } from '../../types/video';
import { Module1VideoCard } from './Module1VideoCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoPagerFeedProps {
  lessons: VideoLessonItem[];
}

export const VideoPagerFeed: React.FC<VideoPagerFeedProps> = ({ lessons }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<VideoLessonItem>>(null);

  // Xử lý xác định item nào đang chiếm đa số màn hình khi vuốt
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 65,
  }).current;

  // Tự động chuyển sang câu tiếp theo khi video phát xong (Loop Off)
  const handleAutoAdvance = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex < lessons.length - 1) {
        const nextIndex = prevIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      }
      return prevIndex;
    });
  }, [lessons.length]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Module1VideoCard
            lesson={item}
            isActive={index === activeIndex}
            onAutoAdvance={handleAutoAdvance}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
  },
});
