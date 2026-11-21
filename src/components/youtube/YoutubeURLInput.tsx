import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

interface YoutubeURLInputProps {
  onImport: (url: string) => void;
  isLoading?: boolean;
}

export const YoutubeURLInput: React.FC<YoutubeURLInputProps> = ({
  onImport,
  isLoading = false,
}) => {
  const [urlInput, setUrlInput] = useState('');

  const handlePaste = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const clipboardContent = await Clipboard.getStringAsync();
    if (clipboardContent) {
      setUrlInput(clipboardContent);
    }
  };

  const handleStartStudy = () => {
    if (!urlInput.trim() || isLoading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onImport(urlInput.trim());
  };

  const handleQuickSample = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    onImport(sampleUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>HỌC VỚI YOUTUBE CỦA BẠN</Text>
      <Text style={styles.headerSubtitle}>
        Dán link video bất kỳ để tự động trích xuất phụ đề song ngữ và học không quảng cáo.
      </Text>

      {/* Khung dán link + Nút Học ngay */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.ytIcon}>▶</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Dán link YouTube vào đây..."
            placeholderTextColor="#64748B"
            value={urlInput}
            onChangeText={setUrlInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Nút Dán nhanh từ bộ nhớ tạm */}
          <TouchableOpacity
            style={styles.pasteBtn}
            onPress={handlePaste}
            activeOpacity={0.7}
          >
            <Text style={styles.pasteText}>📋 Dán</Text>
          </TouchableOpacity>
        </View>

        {/* Nút Học ngay */}
        <TouchableOpacity
          style={[styles.studyBtn, (!urlInput.trim() || isLoading) && styles.studyBtnDisabled]}
          onPress={handleStartStudy}
          disabled={!urlInput.trim() || isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.studyBtnText}>Học ngay</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Gợi ý Video mẫu phổ biến */}
      <View style={styles.sampleChipsRow}>
        <Text style={styles.sampleLabel}>Gợi ý nhanh:</Text>
        <TouchableOpacity
          style={styles.chip}
          onPress={() => handleQuickSample('https://www.youtube.com/watch?v=h6fcK_fRYaI')}
        >
          <Text style={styles.chipText}>Kurzgesagt (B1)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chip}
          onPress={() => handleQuickSample('https://www.youtube.com/watch?v=UF8uR6Z6KLc')}
        >
          <Text style={styles.chipText}>Steve Jobs (B2)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    padding: 18,
    borderRadius: 22,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    color: '#F43F5E', // Đỏ YouTube
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  ytIcon: {
    color: '#EF4444',
    fontSize: 14,
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13.5,
    paddingVertical: 8,
  },
  pasteBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 6,
  },
  pasteText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  studyBtn: {
    backgroundColor: '#DC2626', // Đỏ YouTube nổi bật
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  studyBtnDisabled: {
    backgroundColor: '#475569',
    opacity: 0.6,
  },
  studyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  sampleChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
    flexWrap: 'wrap',
  },
  sampleLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  chipText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '500',
  },
});
