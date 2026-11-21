import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

export interface VideoSource {
  uri?: string;
  [key: string]: any;
}

export class WebVideoPlayerInstance {
  source: string | VideoSource;
  videoElement: HTMLVideoElement | null = null;
  listeners: { [key: string]: Function[] } = {};

  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 30; // Mặc định giả lập 30s
  playbackRate: number = 1.0;
  loop: boolean = false;
  muted: boolean = false;

  constructor(source: string | VideoSource, setupCallback?: (p: any) => void) {
    this.source = source;
    if (setupCallback) {
      setupCallback(this);
    }
  }

  _setElement(el: HTMLVideoElement | null) {
    this.videoElement = el;
    if (el) {
      el.loop = this.loop;
      el.muted = this.muted;
      el.playbackRate = this.playbackRate;

      el.onplay = () => {
        this.isPlaying = true;
        this.emit('playingChange', { isPlaying: true });
      };
      el.onpause = () => {
        this.isPlaying = false;
        this.emit('playingChange', { isPlaying: false });
      };
      el.ontimeupdate = () => {
        this.currentTime = el.currentTime;
        this.emit('timeUpdate', { currentTime: el.currentTime });
      };
      el.onloadedmetadata = () => {
        if (el.duration && !isNaN(el.duration)) {
          this.duration = el.duration;
        }
      };
    }
  }

  play() {
    this.isPlaying = true;
    if (this.videoElement) {
      this.videoElement.play().catch(() => {
        // Trình duyệt chặn autoplay có tiếng, tự động mute để phát mượt mà
        if (this.videoElement) {
          this.videoElement.muted = true;
          this.videoElement.play().catch(() => {});
        }
      });
    }
  }

  pause() {
    this.isPlaying = false;
    this.videoElement?.pause();
  }

  replace(newSource: string | VideoSource) {
    this.source = newSource;
    if (this.videoElement) {
      const srcUrl = typeof newSource === 'string' ? newSource : newSource?.uri || '';
      this.videoElement.src = srcUrl;
      this.videoElement.load();
    }
  }

  addListener(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return {
      remove: () => {
        this.removeListener(event, callback);
      },
    };
  }

  removeListener(event: string, callback: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(data));
    }
  }
}

/**
 * Hook useVideoPlayer giả lập tương thích 100% cho Web
 */
export function useVideoPlayer(
  source: string | VideoSource,
  setupCallback?: (player: any) => void
) {
  const player = useMemo(() => {
    return new WebVideoPlayerInstance(source, setupCallback);
  }, []);

  useEffect(() => {
    if (source) {
      player.replace(source);
    }
  }, [source, player]);

  return player;
}

/**
 * Component VideoView render thẻ HTML5 <video> siêu mượt trên Web
 */
export const VideoView: React.FC<any> = ({
  player,
  style,
  contentFit = 'cover',
  nativeControls = false,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && player) {
      player._setElement(videoRef.current);
    }
  }, [player]);

  const srcUrl =
    typeof player?.source === 'string'
      ? player.source
      : player?.source?.uri ||
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <View style={[styles.container, style]} {...props}>
      <video
        ref={videoRef}
        src={srcUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: contentFit === 'contain' ? 'contain' : 'cover',
          display: 'block',
          backgroundColor: '#000000',
        }}
        playsInline
        controls={nativeControls}
        autoPlay={player?.isPlaying}
        muted={player?.muted}
        loop={player?.loop}
      />
    </View>
  );
};

export const createVideoPlayer = (
  source: string | VideoSource,
  setupCallback?: (p: any) => void
) => {
  return new WebVideoPlayerInstance(source, setupCallback);
};

export class VideoPlayer extends WebVideoPlayerInstance {}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#000000',
    position: 'relative',
  },
});
