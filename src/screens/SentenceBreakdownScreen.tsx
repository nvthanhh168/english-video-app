import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import { MOCK_SENTENCE_BREAKDOWN } from '../data/mockSentenceBreakdowns';
import { AiChatMessage } from '../types/module3';
import { SentenceBreakdownHeader } from '../components/module3/SentenceBreakdownHeader';
import { MeaningfulChunking } from '../components/module3/MeaningfulChunking';
import { KeyVocabularyList } from '../components/module3/KeyVocabularyList';
import { DifficultyAnalysis } from '../components/module3/DifficultyAnalysis';
import { AiQuestionInputBar } from '../components/module3/AiQuestionInputBar';

export const SentenceBreakdownScreen: React.FC = () => {
  const data = MOCK_SENTENCE_BREAKDOWN;
  const [chatMessages, setChatMessages] = useState<AiChatMessage[]>([]);

  // Xử lý gửi câu hỏi thắc mắc tới AI
  const handleSendQuestion = (question: string) => {
    const userMsg: AiChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: Date.now(),
    };

    // Giả lập câu trả lời tức thì từ AI Gemini
    const aiMsg: AiChatMessage = {
      id: `ai_${Date.now() + 1}`,
      sender: 'ai',
      text: `Đối với câu này, cấu trúc "want + tân ngữ + to V" là một cấu trúc rất phổ biến trong giao tiếp hàng ngày để thể hiện mong muốn lịch sự. Bạn có thể thay "you" bằng bất kỳ tân ngữ nào khác (him, her, them).`,
      timestamp: Date.now() + 1,
    };

    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Keyboard Avoiding View bọc toàn bộ màn hình */}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 1. Header cố định ở trên */}
        <SentenceBreakdownHeader />

        {/* 2. Nội dung cuộn ở giữa (Scrollable View) */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Khu vực 1: Meaningful Chunking */}
          <MeaningfulChunking data={data.chunking} />

          {/* Khu vực 2: Key Vocabulary */}
          <KeyVocabularyList items={data.keyVocabulary} />

          {/* Khu vực 3: Difficulty Analysis */}
          <DifficultyAnalysis
            paragraphs={data.difficultyAnalysis}
            onPressFeedback={() => alert('Cảm ơn bạn đã gửi phản hồi cho AI Tutor!')}
          />

          {/* Lịch sử tin nhắn hỏi đáp tương tác AI (nếu có) */}
          {chatMessages.length > 0 && (
            <View style={styles.chatSection}>
              <Text style={styles.chatSectionTitle}>Hỏi đáp cùng AI</Text>
              {chatMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.chatBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text style={styles.chatSender}>
                    {msg.sender === 'user' ? 'Bạn' : 'AI Helper'}
                  </Text>
                  <Text style={styles.chatText}>{msg.text}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* 3. Khung chat cố định ở đáy (Fixed Bottom) */}
        <AiQuestionInputBar onSendQuestion={handleSendQuestion} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Background chuẩn Dark Mode
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  chatSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 16,
    gap: 10,
  },
  chatSectionTitle: {
    color: '#A855F7',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 14,
    maxWidth: '90%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3730A3', // Indigo 800
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1E22',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  chatSender: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  chatText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    lineHeight: 20,
  },
});
