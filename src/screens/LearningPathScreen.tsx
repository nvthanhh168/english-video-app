import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { MOCK_LEARNING_PATH_DATA, getMotivationalTipByLevel } from '../data/mockLearningPath';
import { InspiringHeader } from '../components/module6/InspiringHeader';
import { ProgressCurveChart } from '../components/module6/ProgressCurveChart';
import { SocialProofSection } from '../components/module6/SocialProofSection';
import { GeneratePlanButton } from '../components/module6/GeneratePlanButton';

export const LearningPathScreen: React.FC = () => {
  const data = MOCK_LEARNING_PATH_DATA;
  const [currentLevel, setCurrentLevel] = useState(data.current_level);

  // Dynamic tip based on level
  const dynamicTip = getMotivationalTipByLevel(currentLevel);

  const handleGeneratePlan = () => {
    Alert.alert(
      '🎉 Kế hoạch học tập AI đã sẵn sàng!',
      `Dựa trên trình độ hiện tại của bạn (${currentLevel} - 160h tích lũy):\n\n• Mục tiêu: Chinh phục cấp độ B1 trong 90 ngày\n• Thời lượng: 15 phút mỗi ngày (3 video/ngày)\n• Phương pháp: 80% Nghe ngấm (Comprehensible Input) + 20% Ôn từ vựng đa ngữ cảnh.`,
      [{ text: 'Bắt đầu học ngay', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header Truyền cảm hứng */}
          <InspiringHeader headerText={data.header_text} />

          {/* 2. Khung Biểu đồ Lộ trình (Main Gradient Card với Bezier Curve & Mascot Pin) */}
          <ProgressCurveChart
            milestones={data.cefr_milestones}
            currentLevel={currentLevel}
            motivationalTip={dynamicTip}
          />

          {/* 3. Khu vực Social Proof (Niềm tin cộng đồng) */}
          <SocialProofSection socialProof={data.social_proof} />
        </ScrollView>

        {/* 4. Khu vực Điều hướng (Nút Generate My Plan cố định ở đáy) */}
        <GeneratePlanButton
          ctaText={data.cta_text}
          onPress={handleGeneratePlan}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Tông màu sáng thanh lịch
    justifyContent: 'space-between',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
