import { CefrMilestone, CurvePoint } from '../types/module6';

export interface CurveCalculationResult {
  points: CurvePoint[];
  svgPath: string;
  svgAreaPath: string;
  mascotAnchor: { x: number; y: number } | null;
}

/**
 * Hàm tính toán tọa độ đường cong thăng tiến (The Progress Curve)
 * và xác định vị trí neo Avatar Mascot chính xác trên node hiện tại.
 */
export function calculateProgressCurve(
  milestones: CefrMilestone[],
  chartWidth: number,
  chartHeight: number,
  currentLevel: string
): CurveCalculationResult {
  if (!milestones || milestones.length === 0) {
    return { points: [], svgPath: '', svgAreaPath: '', mascotAnchor: null };
  }

  const paddingLeft = 32;
  const paddingRight = 32;
  const paddingTop = 46;
  const paddingBottom = 42;

  const usableWidth = chartWidth - paddingLeft - paddingRight;
  const usableHeight = chartHeight - paddingTop - paddingBottom;
  const count = milestones.length;

  // 1. Tính toán tọa độ (x, y) cho từng mốc CEFR
  const points: CurvePoint[] = milestones.map((m, index) => {
    // Phân bổ trục X đều theo từng bậc tiến độ
    const t = count > 1 ? index / (count - 1) : 0;
    const x = paddingLeft + t * usableWidth;

    // Đường cong lũy tiến tự nhiên (uốn lượn đi lên từ góc trái dưới lên góc phải trên)
    const curveT = Math.pow(t, 1.25);
    const y = chartHeight - paddingBottom - curveT * usableHeight;

    return {
      level: m.level,
      hours: m.hours,
      isReached: m.isReached,
      icon: m.icon,
      x,
      y,
    };
  });

  // 2. Tạo đường dẫn SVG Bezier mượt mà (Cubic Bezier Spline)
  let svgPath = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const pCurrent = points[i];
    const pNext = points[i + 1];

    const cp1x = pCurrent.x + (pNext.x - pCurrent.x) * 0.5;
    const cp1y = pCurrent.y;
    const cp2x = pCurrent.x + (pNext.x - pCurrent.x) * 0.5;
    const cp2y = pNext.y;

    svgPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pNext.x} ${pNext.y}`;
  }

  // 3. Tạo đường dẫn Area Gradient phủ dưới đường cong
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const groundY = chartHeight - paddingBottom + 12;

  const svgAreaPath = `${svgPath} L ${lastPoint.x} ${groundY} L ${firstPoint.x} ${groundY} Z`;

  // 4. Tìm tọa độ neo Mascot của người dùng
  const targetNode = points.find((p) => p.level === currentLevel) || points[1]; // Mặc định A2
  const mascotAnchor = {
    x: targetNode.x,
    y: targetNode.y,
  };

  return {
    points,
    svgPath,
    svgAreaPath,
    mascotAnchor,
  };
}
