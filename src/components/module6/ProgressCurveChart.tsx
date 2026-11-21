import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { CefrMilestone } from '../../types/module6';
import { calculateProgressCurve } from '../../utils/curveCalculator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 36;
const CHART_HEIGHT = 220;

interface ProgressCurveChartProps {
  milestones: CefrMilestone[];
  currentLevel: string;
  motivationalTip: string;
}

export const ProgressCurveChart: React.FC<ProgressCurveChartProps> = ({
  milestones,
  currentLevel,
  motivationalTip,
}) => {
  // Tính toán đường cong và tọa độ
  const { points, svgPath, svgAreaPath, mascotAnchor } = useMemo(() => {
    return calculateProgressCurve(
      milestones,
      CARD_WIDTH,
      CHART_HEIGHT,
      currentLevel
    );
  }, [milestones, currentLevel]);

  return (
    <View style={styles.cardShadowWrapper}>
      <LinearGradient
        colors={['#1E40AF', '#4338CA', '#6D28D9']} // Gradient Xanh dương sang Tím nhạt
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        {/* 1. Hộp thông điệp (Tip Box bán trong suốt trên đỉnh thẻ) */}
        <View style={styles.tipBox}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>{motivationalTip}</Text>
        </View>

        {/* 2. Khung vẽ Biểu đồ đường cong SVG */}
        <View style={styles.chartWrapper}>
          <Svg width={CARD_WIDTH} height={CHART_HEIGHT}>
            <Defs>
              {/* Gradient bóng mờ phía dưới đường cong */}
              <SvgLinearGradient id="curveAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#4ADE80" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#4ADE80" stopOpacity="0.0" />
              </SvgLinearGradient>
            </Defs>

            {/* Các đường gióng dọc đứt nét (Dashed lines) từ mốc giờ */}
            {points.map((p, idx) => (
              <Line
                key={`dash_${idx}`}
                x1={p.x}
                y1={p.y}
                x2={p.x}
                y2={CHART_HEIGHT - 30}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

            {/* Vùng bóng mờ bên dưới đường cong (Area Fill) */}
            <Path d={svgAreaPath} fill="url(#curveAreaGrad)" />

            {/* Đường cong Bezier chính màu xanh neon / xanh lá mạ (#4ADE80) */}
            <Path
              d={svgPath}
              stroke="#4ADE80"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Các điểm Node CEFR (Chấm tròn màu trắng) */}
            {points.map((p, idx) => (
              <Circle
                key={`node_${idx}`}
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#22C55E"
                strokeWidth="2"
              />
            ))}

            {/* Nhãn CEFR trên mỗi Node (A1, A2, B1, B2, C1, C2) */}
            {points.map((p, idx) => (
              <SvgText
                key={`label_${idx}`}
                x={p.x}
                y={p.y - 12}
                fontSize="11"
                fontWeight="bold"
                fill="#FFFFFF"
                textAnchor="middle"
              >
                {p.level}
              </SvgText>
            ))}

            {/* Trục hoành X-axis: Mốc giờ học ngấm (h) */}
            {points.map((p, idx) => (
              <SvgText
                key={`axis_h_${idx}`}
                x={p.x}
                y={CHART_HEIGHT - 12}
                fontSize="9.5"
                fontWeight="600"
                fill="rgba(255, 255, 255, 0.65)"
                textAnchor="middle"
              >
                {p.hours >= 1200 ? '1200h+' : `${p.hours}h`}
              </SvgText>
            ))}
          </Svg>

          {/* Biểu tượng Ngôi sao vàng ở Node C2 */}
          {points.length > 0 && points[points.length - 1].icon === 'star' && (
            <View
              style={[
                styles.starBadge,
                {
                  left: points[points.length - 1].x - 10,
                  top: points[points.length - 1].y - 32,
                },
              ]}
            >
              <Text style={styles.starText}>⭐</Text>
            </View>
          )}

          {/* 3. Avatar Mascot người dùng neo chính xác trên node hiện tại */}
          {mascotAnchor && (
            <View
              style={[
                styles.mascotPinContainer,
                {
                  left: mascotAnchor.x - 24,
                  top: mascotAnchor.y - 56,
                },
              ]}
            >
              <View style={styles.mascotSpeechBubble}>
                <Text style={styles.mascotLevelText}>Level {currentLevel}</Text>
              </View>
              <View style={styles.mascotAvatarCircle}>
                <Text style={styles.mascotEmoji}>🐧</Text>
              </View>
              <View style={styles.mascotPinPointer} />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadowWrapper: {
    marginHorizontal: 18,
    borderRadius: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    marginVertical: 12,
  },
  gradientCard: {
    borderRadius: 24,
    paddingTop: 16,
    paddingBottom: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)', // Bán trong suốt
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 8,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  chartWrapper: {
    position: 'relative',
    height: CHART_HEIGHT,
  },
  starBadge: {
    position: 'absolute',
    zIndex: 10,
  },
  starText: {
    fontSize: 16,
  },
  mascotPinContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
    width: 48,
  },
  mascotSpeechBubble: {
    backgroundColor: '#10B981', // Xanh ngọc
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 2,
  },
  mascotLevelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  mascotAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38BDF8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  mascotEmoji: {
    fontSize: 18,
  },
  mascotPinPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#38BDF8',
  },
});
