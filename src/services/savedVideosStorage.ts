import { YoutubeVideoItem, YoutubeSubtitleSegment } from '../types/youtube';
import {
  saveImportedVideo,
  getImportedVideos,
  removeImportedVideo,
  updateImportedVideoSubtitles,
  importedToYoutubeVideo,
  IMPORTED_VIDEOS_STORAGE_KEY,
  ImportedVideoItem,
} from './importedVideosStorage';

export {
  saveImportedVideo,
  getImportedVideos,
  removeImportedVideo,
  updateImportedVideoSubtitles,
  importedToYoutubeVideo,
  IMPORTED_VIDEOS_STORAGE_KEY,
};
export type { ImportedVideoItem };

const STORAGE_KEY = 'imported_videos';

/**
 * Đọc danh sách video đã lưu từ localStorage / AsyncStorage (đồng bộ)
 */
export function getSavedVideos(): YoutubeVideoItem[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data =
        window.localStorage.getItem(STORAGE_KEY) ||
        window.localStorage.getItem('@english_video_app_saved_videos');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            // Tương thích cả định dạng ImportedVideoItem (videoId) và YoutubeVideoItem (id)
            if (item.videoId && !item.id) {
              return importedToYoutubeVideo(item);
            }
            return item;
          });
        }
      }
    }
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi đọc video đã lưu:', error);
  }
  return [];
}

/**
 * Lưu một video vào bộ nhớ bền vững (AsyncStorage & localStorage)
 */
export function saveVideoToStorage(video: YoutubeVideoItem): YoutubeVideoItem[] {
  try {
    const current = getSavedVideos();
    const updated = [
      {
        ...video,
        isCustomImported: true,
        savedAt: new Date().toISOString(),
      },
      ...current.filter((v) => v.id !== video.id),
    ];

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.localStorage.setItem('@english_video_app_saved_videos', JSON.stringify(updated));
    }

    // Gọi thêm saveImportedVideo vào AsyncStorage
    saveImportedVideo({
      videoId: video.id,
      title: video.title,
      thumbnail: video.thumbnailUrl,
      platform: 'youtube',
      importedAt: new Date().toISOString(),
      subtitles: video.subtitles,
      channelTitle: video.channelTitle,
      duration: video.duration,
      durationSec: video.durationSec,
      level: video.level,
      views: video.views,
    }).catch(() => {});

    return updated;
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi lưu video:', error);
    return [];
  }
}

/**
 * Xóa một video khỏi danh sách đã lưu
 */
export function removeSavedVideoFromStorage(videoId: string): YoutubeVideoItem[] {
  try {
    const current = getSavedVideos();
    const updated = current.filter((v) => v.id !== videoId);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.localStorage.setItem('@english_video_app_saved_videos', JSON.stringify(updated));
    }

    removeImportedVideo(videoId).catch(() => {});

    return updated;
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi xóa video:', error);
    return [];
  }
}

/**
 * Cập nhật danh sách phụ đề cho một video đã lưu
 */
export function updateVideoSubtitlesInStorage(
  videoId: string,
  newSubtitles: YoutubeSubtitleSegment[]
): YoutubeVideoItem[] {
  try {
    const current = getSavedVideos();
    const updated = current.map((v) => {
      if (v.id === videoId) {
        return {
          ...v,
          subtitles: newSubtitles,
        };
      }
      return v;
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.localStorage.setItem('@english_video_app_saved_videos', JSON.stringify(updated));
    }

    updateImportedVideoSubtitles(videoId, newSubtitles).catch(() => {});

    return updated;
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi cập nhật phụ đề:', error);
    return [];
  }
}
