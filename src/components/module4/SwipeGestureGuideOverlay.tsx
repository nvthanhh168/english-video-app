import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

interface SwipeGestureGuideOverlayProps {
  visible: boolean;
  onDismiss: () => void;
}

export const SwipeGestureGuideOverlay: React.FC<SwipeGestureGuideOverlayProps> = ({
  visible,
  onDismiss,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animation mô phỏng bàn tay lướt lên xuống liên tục
      const loopAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -35,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      );
      loopAnim.start();
      return () => loopAnim.stop();
    }
  }, [visible, translateY]);

  if (!visible) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onDismiss}
      style={styles.overlayContainer}
    >
      <View style={styles.contentCard}>
        {/* Biểu tượng bàn tay hoạt họa lướt lên xuống */}
        <Animated.View
          style={[
            styles.handIconContainer,
            { transform: [{ translateY }] },
          ]}
        >
          <Text style={styles.handEmoji}>👆</Text>
        </Animated.View>

        {/* Dòng hướng dẫn người dùng mới */}
        <Text style={styles.guideTitle}>Swipe up or down</Text>
        <Text style={styles.guideSubtitle}>to switch sentences</Text>
        <Text style={styles.touchHint}>Chạm vào màn hình để bắt đầu học</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 17, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Đè lên trên để hướng dẫn
  },
  contentCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    paddingVertical: 24,
    paddingHorizontal: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(167, 243, 208, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  handIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(167, 243, 208, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  handEmoji: {
    fontSize: 32,
  },
  guideTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  guideSubtitle: {
    color: '#A7F3D0',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  touchHint: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 12,
  },
});
