import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { YoutubeSubtitleSegment } from '../../types/youtube';

interface CustomSubtitleModalProps {
  visible: boolean;
  onClose: () => void;
  currentSubtitles: YoutubeSubtitleSegment[];
  onSaveSubtitles: (newSubtitles: YoutubeSubtitleSegment[]) => void;
}

export const CustomSubtitleModal: React.FC<CustomSubtitleModalProps> = ({
  visible,
  onClose,
  currentSubtitles,
  onSaveSubtitles,
}) => {
  const [activeTab, setActiveTab] = useState<'quick_paste' | 'manual_edit'>('quick_paste');
  const [pasteText, setPasteText] = useState<string>('');

  // Chuyển đổi văn bản dạng "English | Tiếng Việt" hoặc từng dòng thành danh sách phụ đề
  const handleParseAndApply = () => {
    if (!pasteText.trim()) {
      Alert.alert('Chưa có nội dung', 'Vui lòng dán các câu thoại tiếng Anh và tiếng Việt.');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const lines = pasteText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsed: YoutubeSubtitleSegment[] = [];
    let currentTime = 0;
    const defaultDuration = 4.5; // Mỗi câu mặc định 4.5 giây

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Dạng 1: "English sentence | Bản dịch tiếng Việt"
      if (line.includes('|')) {
        const parts = line.split('|');
        const en = parts[0].trim();
        const vi = parts[1] ? parts[1].trim() : en;

        parsed.push({
          id: `custom_sub_${i + 1}`,
          start: Math.round(currentTime * 10) / 10,
          end: Math.round((currentTime + defaultDuration) * 10) / 10,
          textEn: en,
          textVi: vi,
          keyWords: [],
        });
        currentTime += defaultDuration;
      }
      // Dạng 2: Dòng chẵn là Tiếng Anh, dòng lẻ là Tiếng Việt
      else if (i + 1 < lines.length && !lines[i + 1].includes('|')) {
        const en = line;
        const vi = lines[i + 1];
        parsed.push({
          id: `custom_sub_${Math.floor(i / 2) + 1}`,
          start: Math.round(currentTime * 10) / 10,
          end: Math.round((currentTime + defaultDuration) * 10) / 10,
          textEn: en,
          textVi: vi,
          keyWords: [],
        });
        currentTime += defaultDuration;
        i++; // Nhảy qua dòng tiếng Việt
      }
      // Dạng 3: Chỉ có câu tiếng Anh
      else {
        parsed.push({
          id: `custom_sub_${i + 1}`,
          start: Math.round(currentTime * 10) / 10,
          end: Math.round((currentTime + defaultDuration) * 10) / 10,
          textEn: line,
          textVi: line,
          keyWords: [],
        });
        currentTime += defaultDuration;
      }
    }

    if (parsed.length > 0) {
      onSaveSubtitles(parsed);
      Alert.alert('Thành công', `Đã cập nhật ${parsed.length} câu phụ đề mới cho video!`);
      onClose();
    } else {
      Alert.alert('Lỗi', 'Không thể phân tích định dạng văn bản.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tùy chỉnh & Dán Phụ đề</Text>
          <TouchableOpacity onPress={handleParseAndApply} style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.guideTitle}>💡 Hướng dẫn dán phụ đề nhanh:</Text>
          <Text style={styles.guideText}>
            Bạn có thể dán lời bài hát hoặc kịch bản video theo định dạng:{'\n'}
            <Text style={styles.codeText}>Câu tiếng Anh | Bản dịch tiếng Việt</Text>
            {'\n'}
            Ví dụ:{'\n'}
            • Welcome to our talk today | Chào mừng đến với bài nói hôm nay{'\n'}
            • We will solve a big problem together | Chúng ta sẽ cùng nhau giải quyết vấn đề lớn
          </Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={10}
              placeholder="Dán nội dung phụ đề tiếng Anh và tiếng Việt vào đây..."
              placeholderTextColor="#64748B"
              value={pasteText}
              onChangeText={setPasteText}
            />
          </View>

          <View style={styles.currentSubsSection}>
            <Text style={styles.currentSubsTitle}>
              Danh sách phụ đề hiện tại ({currentSubtitles.length} câu):
            </Text>
            {currentSubtitles.map((sub, index) => (
              <View key={sub.id} style={styles.subItem}>
                <Text style={styles.subTime}>
                  #{index + 1} ({sub.start}s - {sub.end}s)
                </Text>
                <Text style={styles.subEn}>{sub.textEn}</Text>
                <Text style={styles.subVi}>{sub.textVi}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  closeBtn: {
    padding: 6,
  },
  closeBtnText: {
    color: '#94A3B8',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  guideTitle: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  guideText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  codeText: {
    color: '#F8FAFC',
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  inputCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: 20,
  },
  textInput: {
    color: '#F8FAFC',
    fontSize: 13,
    minHeight: 140,
    textAlignVertical: 'top',
  },
  currentSubsSection: {
    marginBottom: 40,
  },
  currentSubsTitle: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  subItem: {
    backgroundColor: '#131D31',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#38BDF8',
  },
  subTime: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  subEn: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  subVi: {
    color: '#94A3B8',
    fontSize: 11,
  },
});
