import { Platform } from 'react-native';
import { CustomYoutubePlayer as WebPlayer } from './CustomYoutubePlayer.web';

export type { CustomYoutubePlayerRef } from './CustomYoutubePlayer.web';

let PlayerComponent: any;

if (Platform.OS === 'web') {
  PlayerComponent = WebPlayer;
} else {
  try {
    PlayerComponent = require('./CustomYoutubePlayer.native').CustomYoutubePlayer;
  } catch {
    PlayerComponent = WebPlayer;
  }
}

export const CustomYoutubePlayer = PlayerComponent;
