import AsyncStorage from '@react-native-async-storage/async-storage';
import { YoutubeVideoItem, YoutubeSubtitleSegment } from '../types/youtube';

export const IMPORTED_VIDEOS_STORAGE_KEY = 'imported_videos';

export interface ImportedVideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
  platform: 'youtube' | string;
  importedAt: string; // ISO Date String
  subtitles: YoutubeSubtitleSegment[];
  channelTitle?: string;
  duration?: string;
  durationSec?: number;
  level?: string;
  views?: string;
}

/**
 * Đọc toàn bộ danh sách video đã nhập từ mảng 'imported_videos' trong AsyncStorage
 */
export async function getImportedVideos(): Promise<ImportedVideoItem[]> {
  try {
    const raw = await AsyncStorage.getItem(IMPORTED_VIDEOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('[importedVideosStorage] Lỗi AsyncStorage khi đọc:', error);
  }

  // Fallback kiểm tra thêm localStorage trên môi trường Web
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const webRaw = window.localStorage.getItem(IMPORTED_VIDEOS_STORAGE_KEY);
      if (webRaw) {
        const parsed = JSON.parse(webRaw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch {}

  return [];
}

/**
 * Lưu video mới nhập vào mảng 'imported_videos' trong AsyncStorage
 * Lưu trữ đầy đủ: { videoId, title, thumbnail, platform, importedAt, subtitles, ... }
 * Đảm bảo người dùng có thể học lại video cũ mà không cần dán link lại và không phải gọi API dịch lại!
 */
export async function saveImportedVideo(videoData: {
  videoId: string;
  title: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  platform?: string;
  importedAt?: string;
  subtitles?: YoutubeSubtitleSegment[];
  channelTitle?: string;
  duration?: string;
  durationSec?: number;
  level?: any;
  views?: string;
}): Promise<ImportedVideoItem[]> {
  try {
    const current = await getImportedVideos();

    const newItem: ImportedVideoItem = {
      videoId: videoData.videoId,
      title: videoData.title || `YouTube Video (${videoData.videoId})`,
      thumbnail:
        videoData.thumbnail ||
        videoData.thumbnailUrl ||
        `https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg`,
      platform: videoData.platform || 'youtube',
      importedAt: videoData.importedAt || new Date().toISOString(),
      subtitles: videoData.subtitles || [],
      channelTitle: videoData.channelTitle || 'YouTube Creator',
      duration: videoData.duration || '10:00',
      durationSec: videoData.durationSec || 600,
      level: videoData.level || 'B2',
      views: videoData.views || 'Đã lưu',
    };

    // Đưa video mới nhất lên đầu, lọc bỏ video trùng videoId
    const updated = [newItem, ...current.filter((item) => item.videoId !== newItem.videoId)];

    const serialized = JSON.stringify(updated);
    await AsyncStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);

    // Đồng bộ thêm vào localStorage trên Web để đảm bảo khả năng tương thích tuyệt đối
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);
    }

    return updated;
  } catch (error) {
    console.warn('[importedVideosStorage] Lỗi khi lưu video vào AsyncStorage:', error);
    return [];
  }
}

/**
 * Xóa một video khỏi lịch sử 'imported_videos' trong AsyncStorage
 */
export async function removeImportedVideo(videoId: string): Promise<ImportedVideoItem[]> {
  try {
    const current = await getImportedVideos();
    const updated = current.filter((item) => item.videoId !== videoId);

    const serialized = JSON.stringify(updated);
    await AsyncStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);
    }

    return updated;
  } catch (error) {
    console.warn('[importedVideosStorage] Lỗi khi xóa video:', error);
    return [];
  }
}

/**
 * Cập nhật phụ đề cho video đã lưu trong AsyncStorage
 */
export async function updateImportedVideoSubtitles(
  videoId: string,
  newSubtitles: YoutubeSubtitleSegment[]
): Promise<ImportedVideoItem[]> {
  try {
    const current = await getImportedVideos();
    const updated = current.map((item) => {
      if (item.videoId === videoId) {
        return {
          ...item,
          subtitles: newSubtitles,
        };
      }
      return item;
    });

    const serialized = JSON.stringify(updated);
    await AsyncStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(IMPORTED_VIDEOS_STORAGE_KEY, serialized);
    }

    return updated;
  } catch (error) {
    console.warn('[importedVideosStorage] Lỗi khi cập nhật phụ đề:', error);
    return [];
  }
}

/**
 * Chuyển đổi định dạng ImportedVideoItem sang YoutubeVideoItem để tương thích UI Player
 */
export function importedToYoutubeVideo(item: ImportedVideoItem): YoutubeVideoItem {
  return {
    id: item.videoId,
    title: item.title,
    channelTitle: item.channelTitle || 'YouTube Creator',
    thumbnailUrl: item.thumbnail,
    duration: item.duration || '10:00',
    durationSec: item.durationSec || 600,
    level: (item.level as any) || 'B2',
    views: item.views || 'Đã lưu',
    subtitles: item.subtitles || [],
    isCustomImported: true,
    savedAt: item.importedAt,
  };
}
