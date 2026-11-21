import { LearningPathData } from '../types/module6';

export const MOCK_LEARNING_PATH_DATA: LearningPathData = {
  user_id: 'u_12345',
  current_level: 'A2',
  current_hours: 160,
  header_text: 'Mastering English requires long-term, immersive input.',
  motivational_tip: 'A2 -> B1: Re-listening to familiar content makes reaching B1 easier.',
  cefr_milestones: [
    { level: 'A1', hours: 60, isReached: true },
    { level: 'A2', hours: 160, isReached: true },
    { level: 'B1', hours: 360, isReached: false },
    { level: 'B2', hours: 600, isReached: false },
    { level: 'C1', hours: 800, isReached: false },
    { level: 'C2', hours: 1200, isReached: false, icon: 'star' }
  ],
  social_proof: {
    text: 'The choice of millions of learners worldwide.',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    ]
  },
  cta_text: 'Generate My Plan'
};

// Hàm lấy thông điệp gợi ý động dựa theo level
export function getMotivationalTipByLevel(level: string): string {
  switch (level) {
    case 'A1':
      return 'A1 -> A2: Focusing on high-frequency vocabulary accelerates understanding.';
    case 'A2':
      return 'A2 -> B1: Re-listening to familiar content makes reaching B1 easier.';
    case 'B1':
      return 'B1 -> B2: Engaging with native podcasts bridges the gap to natural fluency.';
    case 'B2':
      return 'B2 -> C1: Unfiltered movie dialogues help master nuanced cultural idioms.';
    case 'C1':
      return 'C1 -> C2: Fine-tuning accents and public speaking completes total mastery.';
    default:
      return 'Consistent daily immersion is the key to lasting English fluency.';
  }
}
