import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  FlatList,
  ViewToken,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { ContextualPlaylistSession } from '../../types/module4';
import { ContextualReelPage } from './ContextualReelPage';
import { videoPrefetchService } from '../../services/videoPrefetchService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ContextualVideoFeedProps {
  session: ContextualPlaylistSession;
  onActiveIndexChange: (index: number) => void;
  onUserSwiped?: () => void;
}

export const ContextualVideoFeed: React.FC<ContextualVideoFeedProps> = ({
  session,
  onActiveIndexChange,
  onUserSwiped,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const hasTriggeredFirstSwipe = useRef(false);

  // Kích hoạt prefetch cho video tiếp theo khi activeIndex thay đổi
  useEffect(() => {
    const urls = session.playlist.map((c) => c.video_url);
    videoPrefetchService.prefetchNextClips(urls, activeIndex);
    onActiveIndexChange(activeIndex);
  }, [activeIndex, session.playlist, onActiveIndexChange]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const newIndex = viewableItems[0].index;
        setActiveIndex(newIndex);

        if (!hasTriggeredFirstSwipe.current && newIndex > 0) {
          hasTriggeredFirstSwipe.current = true;
          onUserSwiped?.();
        }
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 65,
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
        data={session.playlist}
        keyExtractor={(item) => `clip_${item.clip_index}`}
        renderItem={({ item, index }) => (
          <ContextualReelPage
            clip={item}
            targetPhrase={session.target_phrase}
            isActive={index === activeIndex}
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
        onScrollBeginDrag={() => {
          if (!hasTriggeredFirstSwipe.current) {
            hasTriggeredFirstSwipe.current = true;
            onUserSwiped?.();
          }
        }}
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
