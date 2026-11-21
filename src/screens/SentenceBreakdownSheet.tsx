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
  TouchableOpacity,
} from 'react-native';
import { MOCK_MODULE3_BREAKDOWN } from '../data/mockModule3Breakdown';
import { BreakdownHeader } from '../components/module3/BreakdownHeader';
import { MeaningfulChunking } from '../components/module3/MeaningfulChunking';
import { KeyVocabularyList } from '../components/module3/KeyVocabularyList';
import { DifficultyAnalysis } from '../components/module3/DifficultyAnalysis';
import { AiChatInputBar } from '../components/module3/AiChatInputBar';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface SentenceBreakdownSheetProps {
  onClose?: () => void;
  sentence?: {
    textEn: string;
    textVi: string;
  };
}

export const SentenceBreakdownSheet: React.FC<SentenceBreakdownSheetProps> = ({
  onClose,
  sentence,
}) => {
  const baseData = MOCK_MODULE3_BREAKDOWN;

  // Nếu có custom sentence truyền vào (ví dụ từ YouTube Subtitle), tùy biến dữ liệu hiển thị
  const data = sentence
    ? {
        ...baseData,
        meaningfulChunking: {
          chunks: [
            { text: sentence.textEn, color: '#22C55E' },
          ],
          translation: sentence.textVi,
        },
      }
    : baseData;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = (msgText: string) => {
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: msgText,
    };

    // Phản hồi giả lập thông minh từ AI Tutor
    const aiMsg: ChatMessage = {
      id: `ai_${Date.now() + 1}`,
      sender: 'ai',
      text: sentence
        ? `Trong câu "${sentence.textEn}", các cấu trúc ngữ pháp và từ vựng cốt lõi đều được bản địa hóa tự nhiên theo ngữ cảnh giao tiếp thực tế.`
        : 'Cấu trúc "want + tân ngữ + to V" là cấu trúc phổ biến nhất để thể hiện mong muốn ai đó làm gì trong tiếng Anh giao tiếp đời sống.',
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header với Drag indicator & Tiêu đề "Sentence Breakdown" */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <BreakdownHeader />
          </View>
          {onClose && (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Nội dung cuộn mượt mà */}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Khu vực 1: Meaningful Chunking đa màu xen kẽ */}
          <MeaningfulChunking
            chunks={data.meaningfulChunking.chunks}
            translation={data.meaningfulChunking.translation}
          />

          {/* Khu vực 2: Key Vocabulary danh sách từ vựng in đậm */}
          <KeyVocabularyList items={data.keyVocabulary} />

          {/* Khu vực 3: Difficulty Analysis phân tích ngữ pháp */}
          <DifficultyAnalysis paragraphs={data.difficultyAnalysis} />

          {/* Lịch sử hỏi đáp tức thì cùng AI Tutor (nếu có) */}
          {messages.length > 0 && (
            <View style={styles.chatHistorySection}>
              <Text style={styles.chatSectionTitle}>Hỏi đáp cùng AI</Text>
              {messages.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.chatBubble,
                    m.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text style={styles.senderLabel}>
                    {m.sender === 'user' ? 'Bạn' : 'AI Helper'}
                  </Text>
                  <Text style={styles.bubbleText}>{m.text}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Khung chat "Feel free to ask questions" cố định đáy */}
        <AiChatInputBar onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerRow: {
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  chatHistorySection: {
    paddingHorizontal: 20,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 16,
    gap: 10,
  },
  chatSectionTitle: {
    color: '#8B5CF6',
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
    backgroundColor: '#4F46E5',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1E22',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  senderLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    lineHeight: 20,
  },
});
