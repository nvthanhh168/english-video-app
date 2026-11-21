import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { YoutubeSubtitleSegment } from '../../types/youtube';

interface YoutubeSubtitleFeedProps {
  subtitles: YoutubeSubtitleSegment[];
  currentTimeSec: number;
  activeSubtitleId: string | null;
  isLoopingSentence: boolean;
  onSelectSegment: (segment: YoutubeSubtitleSegment) => void;
  onOpenBreakdown: (segment: YoutubeSubtitleSegment) => void;
  onToggleLoop: () => void;
}

export const YoutubeSubtitleFeed: React.FC<YoutubeSubtitleFeedProps> = ({
  subtitles,
  currentTimeSec,
  activeSubtitleId,
  isLoopingSentence,
  onSelectSegment,
  onOpenBreakdown,
  onToggleLoop,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<{ [key: string]: number }>({});

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Tự động cuộn đến câu đang phát (Auto-scroll to active sentence)
  useEffect(() => {
    if (activeSubtitleId && itemLayouts.current[activeSubtitleId] !== undefined) {
      const yPos = itemLayouts.current[activeSubtitleId];
      scrollRef.current?.scrollTo({
        y: Math.max(0, yPos - 80),
        animated: true,
      });
    }
  }, [activeSubtitleId]);

  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.feedTitle}>PHỤ ĐỀ ĐỒNG BỘ THỜI GIAN THỰC</Text>
          <Text style={styles.feedSubtitle}>
            Chạm vào câu để nghe lại • Nhấn AI để phân tích ngữ pháp
          </Text>
        </View>
        {isLoopingSentence && (
          <View style={styles.loopBadge}>
            <Text style={styles.loopBadgeText}>🔁 Đang lặp câu</Text>
          </View>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {subtitles.map((sub, index) => {
          const isActive = sub.id === activeSubtitleId;

          return (
            <View
              key={sub.id}
              onLayout={(e) => {
                itemLayouts.current[sub.id] = e.nativeEvent.layout.y;
              }}
              style={[
                styles.subtitleCard,
                isActive && styles.subtitleCardActive,
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onSelectSegment(sub);
                }}
              >
                {/* Dòng Header của từng câu: Thời gian + Nút hành động */}
                <View style={styles.subMetaRow}>
                  <View style={styles.timeTag}>
                    <Text style={[styles.timeText, isActive && styles.timeTextActive]}>
                      {formatSeconds(sub.start)} - {formatSeconds(sub.end)}
                    </Text>
                  </View>

                  <View style={styles.actionButtons}>
                    {/* Nút Phân tích câu bằng AI */}
                    <TouchableOpacity
                      style={[styles.aiBtn, isActive && styles.aiBtnActive]}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        onOpenBreakdown(sub);
                      }}
                    >
                      <Text style={styles.aiBtnSparkle}>✨</Text>
                      <Text style={[styles.aiBtnText, isActive && styles.aiBtnTextActive]}>
                        AI Phân tích
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Nội dung Tiếng Anh */}
                <Text
                  style={[
                    styles.textEn,
                    isActive && styles.textEnActive,
                  ]}
                >
                  {sub.textEn}
                </Text>

                {/* Nghĩa Tiếng Việt */}
                <Text
                  style={[
                    styles.textVi,
                    isActive && styles.textViActive,
                  ]}
                >
                  {sub.textVi}
                </Text>

                {/* Các từ vựng/cụm từ nổi bật nếu có */}
                {sub.keyWords && sub.keyWords.length > 0 && (
                  <View style={styles.keywordsContainer}>
                    {sub.keyWords.map((kw, kwIdx) => (
                      <View key={kwIdx} style={styles.keywordChip}>
                        <Text style={styles.keywordEn}>{kw.word}</Text>
                        {kw.meaningVi && (
                          <Text style={styles.keywordVi}>: {kw.meaningVi}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0F172A',
  },
  headerLeft: {
    flex: 1,
  },
  feedTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  feedSubtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  loopBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  loopBadgeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  subtitleCard: {
    backgroundColor: '#131D31',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  subtitleCardActive: {
    backgroundColor: '#1E293B',
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  subMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeTag: {
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  timeTextActive: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  aiBtnActive: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  aiBtnSparkle: {
    fontSize: 11,
  },
  aiBtnText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  aiBtnTextActive: {
    color: '#0F172A',
  },
  textEn: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  textEnActive: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16.5,
    lineHeight: 24,
  },
  textVi: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  textViActive: {
    color: '#94A3B8',
    fontSize: 13.5,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  keywordChip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.25)',
  },
  keywordEn: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '700',
  },
  keywordVi: {
    color: '#86EFAC',
    fontSize: 11,
  },
});
