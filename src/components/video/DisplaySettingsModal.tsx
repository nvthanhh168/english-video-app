import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { SubtitleFontSize, SubtitleFontFamily } from '../../types/video';

interface DisplaySettingsModalProps {
  visible: boolean;
  fontSize: SubtitleFontSize;
  fontFamily: SubtitleFontFamily;
  onClose: () => void;
  onSelectFontSize: (size: SubtitleFontSize) => void;
  onSelectFontFamily: (family: SubtitleFontFamily) => void;
}

export const DisplaySettingsModal: React.FC<DisplaySettingsModalProps> = ({
  visible,
  fontSize,
  fontFamily,
  onClose,
  onSelectFontSize,
  onSelectFontFamily,
}) => {
  const fontSizes: { label: string; value: SubtitleFontSize }[] = [
    { label: 'Nhỏ', value: 'small' },
    { label: 'Vừa', value: 'medium' },
    { label: 'Lớn', value: 'large' },
  ];

  const fontFamilies: { label: string; value: SubtitleFontFamily }[] = [
    { label: 'Hiện đại (Sans)', value: 'system' },
    { label: 'Cổ điển (Serif)', value: 'serif' },
    { label: 'Rộng (Monospace)', value: 'monospace' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>Cài đặt hiển thị phụ đề</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 1. Kích thước font chữ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Cỡ chữ Tiếng Anh:</Text>
            <View style={styles.row}>
              {fontSizes.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.optionPill,
                    fontSize === item.value && styles.activePill,
                  ]}
                  onPress={() => onSelectFontSize(item.value)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      fontSize === item.value && styles.activePillText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 2. Kiểu font chữ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Kiểu chữ phụ đề:</Text>
            <View style={styles.column}>
              {fontFamilies.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.fontFamilyRow,
                    fontFamily === item.value && styles.activeFontFamilyRow,
                  ]}
                  onPress={() => onSelectFontFamily(item.value)}
                >
                  <Text
                    style={[
                      styles.fontFamilyText,
                      fontFamily === item.value && styles.activeFontFamilyText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {fontFamily === item.value && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F172A', // Slate 900
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
  },
  closeBtnText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    gap: 8,
  },
  optionPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activePill: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3B82F6',
  },
  pillText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  activePillText: {
    color: '#60A5FA',
  },
  fontFamilyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  activeFontFamilyRow: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    borderWidth: 1,
  },
  fontFamilyText: {
    color: '#E2E8F0',
    fontSize: 15,
  },
  activeFontFamilyText: {
    color: '#38BDF8',
    fontWeight: '600',
  },
  checkMark: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
