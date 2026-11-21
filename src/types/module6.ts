export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Milestone {
  level: CEFRLevel;
  hours: number | string; // VD: 60, 160, 360, 600, 800, '1200+'
  isCurrent: boolean;
  hasStar?: boolean;      // Dành cho mốc C2
}

export interface ProgressTrackerData {
  headerText: string;
  motivationalTip: string;
  milestones: Milestone[];
  socialProofText: string;
  socialAvatars: any[];   // Mảng chứa { uri: string } hoặc require('path/to/image')
  ctaText: string;
}

// Giữ lại các kiểu dữ liệu trước đó để tương thích ngược hoàn hảo
export interface CefrMilestone {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  hours: number;
  isReached: boolean;
  icon?: 'star';
}

export interface SocialProofData {
  text: string;
  avatars: string[];
}

export interface LearningPathData {
  user_id: string;
  current_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  current_hours: number;
  header_text: string;
  motivational_tip: string;
  cefr_milestones: CefrMilestone[];
  social_proof: SocialProofData;
  cta_text: string;
}

export interface CurvePoint {
  level: string;
  hours: number;
  isReached: boolean;
  icon?: string;
  x: number;
  y: number;
}
