import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  VideoLearningScreen,
  GuidedLearningScreen,
  SentenceBreakdownSheet,
  ContextualMasteryScreen,
  BuildSentenceGameScreen,
  LearningPathScreen,
  ProgressTrackerScreen,
  YoutubeDiscoveryScreen,
} from './src/screens';

type ModuleKey = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('m7');

  const renderActiveScreen = () => {
    switch (activeModule) {
      case 'm1':
        return <VideoLearningScreen />;
      case 'm2':
        return <GuidedLearningScreen />;
      case 'm3':
        return <SentenceBreakdownSheet />;
      case 'm4':
        return <ContextualMasteryScreen />;
      case 'm5':
        return <BuildSentenceGameScreen />;
      case 'm6':
        return <ProgressTrackerScreen />;
      case 'm7':
        return <YoutubeDiscoveryScreen />;
      default:
        return <YoutubeDiscoveryScreen />;
    }
  };

  const tabs: { key: ModuleKey; label: string }[] = [
    { key: 'm1', label: 'M1 Video' },
    { key: 'm2', label: 'M2 Mascot' },
    { key: 'm3', label: 'M3 AI Câu' },
    { key: 'm4', label: 'M4 Ngữ cảnh' },
    { key: 'm5', label: 'M5 Bài tập' },
    { key: 'm6', label: 'M6 Lộ trình' },
    { key: 'm7', label: 'M7 YouTube' },
  ];

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.content}>{renderActiveScreen()}</View>

      {/* Thanh chuyển đổi nhanh 7 Module để tiện kiểm thử & phát triển */}
      <SafeAreaView style={styles.moduleSwitcherContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.switcherBar}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveModule(tab.key)}
              style={[
                styles.tabBtn,
                activeModule === tab.key && styles.tabBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeModule === tab.key && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  moduleSwitcherContainer: {
    backgroundColor: 'rgba(10, 15, 29, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  switcherBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 6,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabBtnActive: {
    backgroundColor: '#38BDF8',
  },
  tabLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#0F172A',
    fontWeight: 'bold',
  },
});
