import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface AiQuestionInputBarProps {
  onSendQuestion: (question: string) => void;
  onPressMagicWand?: () => void;
}

export const AiQuestionInputBar: React.FC<AiQuestionInputBarProps> = ({
  onSendQuestion,
  onPressMagicWand,
}) => {
  const [inputText, setInputText] = useState('');

  const hasText = inputText.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSendQuestion(inputText.trim());
    setInputText('');
  };

  return (
    <View style={styles.fixedBottomContainer}>
      <View style={styles.pillInputContainer}>
        {/* Khung nhập liệu Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Feel free to ask questions"
          placeholderTextColor="#71717A" // Zinc 500
          value={inputText}
          onChangeText={setInputText}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />

        {/* Cụm biểu tượng bên phải */}
        <View style={styles.actionIconsRow}>
          {/* Biểu tượng Cây đũa phép AI (Magic Wand) màu tím */}
          <TouchableOpacity
            style={styles.magicWandButton}
            onPress={onPressMagicWand}
            activeOpacity={0.7}
          >
            <Text style={styles.magicWandIcon}>🪄</Text>
          </TouchableOpacity>

          {/* Nút Gửi (Send Arrow Icon): Mờ khi chưa nhập chữ, Sáng màu tím khi có chữ */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              hasText ? styles.sendButtonActive : styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!hasText}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.sendArrowText,
                hasText ? styles.sendArrowActive : styles.sendArrowDisabled,
              ]}
            >
              ↑
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedBottomContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  pillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E22', // Nền pill xám đậm theo yêu cầu
    borderRadius: 26, // Bo tròn dạng viên thuốc (Pill shape)
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  actionIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  magicWandButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  magicWandIcon: {
    fontSize: 18,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    opacity: 0.35,
  },
  sendButtonActive: {
    backgroundColor: '#A855F7', // Màu tím sáng nổi bật
    opacity: 1,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  sendArrowText: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: -2,
  },
  sendArrowDisabled: {
    color: '#71717A',
  },
  sendArrowActive: {
    color: '#FFFFFF',
  },
});
