import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { SubtitleSize } from '../../types/video';

interface DisplaySettingsSheetProps {
  visible: boolean;
  fontSize: SubtitleSize;
  onClose: () => void;
  onSelectFontSize: (size: SubtitleSize) => void;
}

export const DisplaySettingsSheet: React.FC<DisplaySettingsSheetProps> = ({
  visible,
  fontSize,
  onClose,
  onSelectFontSize,
}) => {
  const options: { label: string; value: SubtitleSize; desc: string }[] = [
    { label: 'Tiêu chuẩn', value: 'normal', desc: 'Cỡ chữ chuẩn 21px' },
    { label: 'Lớn', value: 'large', desc: 'Dễ đọc hơn 25px' },
    { label: 'Cực lớn', value: 'extra-large', desc: 'Tối ưu quan sát 29px' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.sheetContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.dragHandle} />
          <View style={styles.header}>
            <Text style={styles.title}>Cài đặt cỡ chữ phụ đề</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsList}>
            {options.map((opt) => {
              const isSelected = fontSize === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.optionItem, isSelected && styles.selectedOptionItem]}
                  onPress={() => {
                    onSelectFontSize(opt.value);
                    onClose();
                  }}
                >
                  <View>
                    <Text style={[styles.optionLabel, isSelected && styles.selectedOptionLabel]}>
                      {opt.label}
                    </Text>
                    <Text style={styles.optionDesc}>{opt.desc}</Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.selectedRadio]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
    alignSelf: 'center',
    marginBottom: 16,
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
  closeText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOptionItem: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: '#38BDF8',
  },
  optionLabel: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedOptionLabel: {
    color: '#38BDF8',
  },
  optionDesc: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#38BDF8',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#38BDF8',
  },
});
