import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

interface AiChatInputBarProps {
  onSendMessage?: (msg: string) => void;
}

export const AiChatInputBar: React.FC<AiChatInputBarProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onSendMessage) {
      onSendMessage(inputText.trim());
    }
    setInputText('');
  };

  const hasText = inputText.trim().length > 0;

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Feel free to ask questions"
          placeholderTextColor="#6B7280"
          value={inputText}
          onChangeText={setInputText}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />

        {/* Nút Gửi (Tím sáng khi có chữ) */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSend}
          disabled={!hasText}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.sendCircle,
              hasText ? styles.sendCircleActive : styles.sendCircleDisabled,
            ]}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </View>
        </TouchableOpacity>

        {/* Nút Sparkles / Magic Button màu tím */}
        <TouchableOpacity
          style={styles.magicButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setInputText('Tại sao câu này lại dùng cấu trúc want + you + to V?');
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.magicIcon}>✨</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 16,
    paddingBottom: 24, // Hỗ trợ iPhone home indicator
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#27272A',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 8,
    height: 48,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  actionButton: {
    marginLeft: 8,
  },
  sendCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendCircleDisabled: {
    backgroundColor: '#374151',
  },
  sendCircleActive: {
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -2,
  },
  magicButton: {
    marginLeft: 10,
    padding: 4,
  },
  magicIcon: {
    fontSize: 20,
  },
});
