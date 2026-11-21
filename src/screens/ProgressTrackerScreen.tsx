import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { PathHeader } from '../components/module6/PathHeader';
import { CEFRProgressCurve } from '../components/module6/CEFRProgressCurve';
import { SocialProofSection } from '../components/module6/SocialProofSection';
import { GeneratePlanCTA } from '../components/module6/GeneratePlanCTA';
import { mockProgressData } from '../data/mockProgressPath';

export const ProgressTrackerScreen: React.FC = () => {
  const handleGeneratePlan = () => {
    Alert.alert(
      'Kế hoạch Cá nhân hóa',
      'AI đã khởi tạo lộ trình tối ưu cho bạn:\n• Mục tiêu: 15 phút mỗi ngày\n• Tập trung: Re-listening & Phân tích cấu trúc câu B1\n• Dự kiến đạt mốc B1 sau 60 ngày tiếp theo!',
      [{ text: 'Bắt đầu học ngay', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header truyền cảm hứng */}
        <PathHeader title={mockProgressData.headerText} />

        {/* 2. Thẻ Gradient chính chứa đồ thị Curve SVG và Mascot Chim cánh cụt */}
        <CEFRProgressCurve
          motivationalTip={mockProgressData.motivationalTip}
          milestones={mockProgressData.milestones}
        />

        {/* 3. Khối Social Proof tin cậy */}
        <SocialProofSection
          text={mockProgressData.socialProofText}
          avatars={mockProgressData.socialAvatars}
        />

        {/* Khoảng đệm để đẩy nút CTA */}
        <View style={{ height: 20 }} />

        {/* 4. Nút bấm Tạo Kế Hoạch Cá Nhân Hóa */}
        <GeneratePlanCTA
          label={mockProgressData.ctaText}
          onPress={handleGeneratePlan}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
