import React, { useState, useRef, useCallback } from 'react';
import {
  FlatList,
  ViewToken,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { VideoReel } from '../../types/video';
import { VideoReelItem } from './VideoReelItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoFeedProps {
  videos: VideoReel[];
  onOpenBreakdown?: () => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  onOpenBreakdown,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  // Xử lý xác định video nào đang hiển thị trên màn hình để Play/Pause
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveVideoIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70, // Khi video chiếm >= 70% khung nhìn thì kích hoạt
  }).current;

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
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <VideoReelItem
            reel={item}
            isActive={index === activeVideoIndex}
            onOpenBreakdown={onOpenBreakdown}
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
    backgroundColor: '#000000',
  },
});
