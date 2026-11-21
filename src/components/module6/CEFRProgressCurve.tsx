import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { Milestone } from '../../types/module6';

interface Props {
  motivationalTip: string;
  milestones: Milestone[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = 400;

export const CEFRProgressCurve: React.FC<Props> = ({
  motivationalTip,
  milestones,
}) => {
  // Tọa độ tính toán động theo tỷ lệ CARD_WIDTH
  // Giúp biểu đồ co giãn mượt mà trên mọi kích thước màn hình
  const scaleX = (val: number) => (val / 375) * CARD_WIDTH;

  const nodes = [
    { x: scaleX(40),  y: 310 }, // A1
    { x: scaleX(95),  y: 275 }, // A2 (Current)
    { x: scaleX(165), y: 220 }, // B1
    { x: scaleX(235), y: 155 }, // B2
    { x: scaleX(295), y: 95 },  // C1
    { x: scaleX(345), y: 55 },  // C2
  ];

  // Vẽ đường cong Bezier mềm mại đi qua tất cả 6 điểm
  const pathData = `M ${nodes[0].x} ${nodes[0].y} 
                    Q ${scaleX(65)} 295, ${nodes[1].x} ${nodes[1].y} 
                    T ${nodes[2].x} ${nodes[2].y} 
                    T ${nodes[3].x} ${nodes[3].y} 
                    T ${nodes[4].x} ${nodes[4].y} 
                    T ${nodes[5].x} ${nodes[5].y}`;

  const currentIndex = milestones.findIndex((m) => m.isCurrent);
  const currentCoord = nodes[currentIndex] || nodes[1];

  return (
    <LinearGradient
      colors={['#6A74FF', '#8352FF']} // Tông màu Gradient Xanh tím
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      {/* Khối Tip Truyền cảm hứng */}
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>{motivationalTip}</Text>
      </View>

      <Svg width={CARD_WIDTH} height={CARD_HEIGHT} style={styles.svgLayer}>
        {/* Đường cong đồ thị (Curve) màu xanh ngọc phát sáng nhẹ */}
        <Path
          d={pathData}
          fill="none"
          stroke="#A7F3D0"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Trục hoành đứt nét dọc từ đáy lên các Node */}
        {nodes.map((node, index) => (
          <Line
            key={`line-${index}`}
            x1={node.x}
            y1={node.y}
            x2={node.x}
            y2={CARD_HEIGHT - 35}
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}

        {/* Các chấm Node Trắng tròn */}
        {nodes.map((node, index) => (
          <Circle
            key={`circle-${index}`}
            cx={node.x}
            cy={node.y}
            r="6"
            fill="#FFFFFF"
          />
        ))}
      </Svg>

      {/* Hiển thị Avatar Chim Cánh Cụt tại Node hiện tại (isCurrent = true) */}
      {currentCoord && (
        <View
          style={[
            styles.mascotWrapper,
            { left: currentCoord.x - 24, top: currentCoord.y - 24 },
          ]}
        >
          <View style={styles.mascotCircle}>
            <Text style={styles.penguinEmoji}>🐧</Text>
          </View>
          <View style={styles.mascotBadge}>
            <Text style={styles.mascotBadgeText}>Bạn ở đây</Text>
          </View>
        </View>
      )}

      {/* Render Text Label A1, A2... và số giờ 60, 160... */}
      {nodes.map((node, index) => {
        const item = milestones[index];
        if (!item) return null;

        return (
          <View key={`label-${index}`} pointerEvents="none">
            {/* Nhãn CEFR Level */}
            <Text
              style={[
                styles.levelLabel,
                { left: node.x - 12, top: node.y - 28 },
                item.isCurrent && styles.levelLabelCurrent,
              ]}
            >
              {item.level}
            </Text>

            {/* Số giờ tích lũy */}
            <Text
              style={[
                styles.hourLabel,
                { left: node.x - 16, top: CARD_HEIGHT - 30 },
              ]}
            >
              {item.hours}
            </Text>

            {/* Ngôi sao đặc biệt ở mốc C2 */}
            {item.hasStar && (
              <Text
                style={[
                  styles.starIcon,
                  { left: node.x + 10, top: node.y - 32 },
                ]}
              >
                🌟
              </Text>
            )}
          </View>
        );
      })}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 16,
    position: 'relative',
    shadowColor: '#8352FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  tipBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    margin: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
  },
  svgLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mascotWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
  },
  mascotCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#FDE047',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  penguinEmoji: {
    fontSize: 28,
  },
  mascotBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: -6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  mascotBadgeText: {
    color: '#A7F3D0',
    fontSize: 9,
    fontWeight: '800',
  },
  levelLabel: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  levelLabelCurrent: {
    color: '#FDE047',
    fontSize: 16,
  },
  hourLabel: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11.5,
    fontWeight: '600',
    width: 36,
    textAlign: 'center',
  },
  starIcon: {
    position: 'absolute',
    fontSize: 15,
  },
});
