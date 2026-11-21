import { YoutubeVideoItem, YoutubeSubtitleSegment } from '../types/youtube';

const STORAGE_KEY = '@english_video_app_saved_videos';

/**
 * Đọc danh sách video đã lưu từ localStorage (hoặc bộ nhớ web)
 */
export function getSavedVideos(): YoutubeVideoItem[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi đọc video đã lưu:', error);
  }
  return [];
}

/**
 * Lưu một video vào bộ nhớ bền vững (không bị mất khi F5 hoặc mở lại web)
 */
export function saveVideoToStorage(video: YoutubeVideoItem): YoutubeVideoItem[] {
  try {
    const current = getSavedVideos();
    // Đưa video mới lên đầu danh sách, loại bỏ trùng lặp nếu có
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
    }
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
    }
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
    }
    return updated;
  } catch (error) {
    console.warn('[savedVideosStorage] Lỗi khi cập nhật phụ đề:', error);
    return [];
  }
}
