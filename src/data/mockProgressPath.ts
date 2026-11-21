import { ProgressTrackerData } from '../types/module6';

export const mockProgressData: ProgressTrackerData = {
  headerText: 'Mastering English requires long-term, immersive input.',
  motivationalTip: 'A2 → B1: Re-listening to familiar content makes reaching B1 easier.',
  milestones: [
    { level: 'A1', hours: 60, isCurrent: false },
    { level: 'A2', hours: 160, isCurrent: true },
    { level: 'B1', hours: 360, isCurrent: false },
    { level: 'B2', hours: 600, isCurrent: false },
    { level: 'C1', hours: 800, isCurrent: false },
    { level: 'C2', hours: '1200+', isCurrent: false, hasStar: true },
  ],
  socialProofText: 'The choice of millions of learners worldwide.',
  socialAvatars: [
    { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  ],
  ctaText: 'Generate My Plan',
};
