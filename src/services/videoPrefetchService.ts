/**
 * Video Prefetching & Caching Strategy Service
 * Giúp tải trước (buffer trước) các video liền kề (index + 1) để tránh
 * màn hình đen / lag khi người dùng vuốt nhanh (Swipe up/down).
 */

class VideoPrefetchService {
  private prefetchedUrls: Set<string> = new Set();
  private maxCacheSize: number = 5;

  /**
   * Tải trước video tiếp theo vào bộ đệm
   */
  public prefetchNextClips(urls: string[], currentIndex: number): void {
    // Tải trước video kế tiếp (currentIndex + 1) và kế tiếp nữa (currentIndex + 2)
    const nextUrls = [
      urls[currentIndex + 1],
      urls[currentIndex + 2],
    ].filter(Boolean);

    nextUrls.forEach((url) => {
      if (!this.prefetchedUrls.has(url)) {
        this.preloadVideoUrl(url);
      }
    });

    // Giải phóng các URL quá xa khỏi vị trí hiện tại để tiết kiệm RAM
    if (this.prefetchedUrls.size > this.maxCacheSize) {
      this.evictDistantUrls(urls, currentIndex);
    }
  }

  private preloadVideoUrl(url: string): void {
    try {
      // Trong môi trường Web hoặc Native, gửi request HTTP HEAD hoặc Range bytes 0-102400 (100KB)
      // để thiết lập socket kết nối CDN và kích hoạt bộ đệm Disk Cache
      fetch(url, {
        method: 'GET',
        headers: { Range: 'bytes=0-204800' }, // Tải trước 200KB đầu tiên
      })
        .then(() => {
          this.prefetchedUrls.add(url);
        })
        .catch(() => {
          // Xử lý fail âm thầm không ảnh hưởng UI
        });
    } catch {
      // Bỏ qua lỗi mạng nền
    }
  }

  private evictDistantUrls(urls: string[], currentIndex: number): void {
    const keepWindow = new Set([
      urls[currentIndex - 1],
      urls[currentIndex],
      urls[currentIndex + 1],
      urls[currentIndex + 2],
    ]);

    this.prefetchedUrls.forEach((url) => {
      if (!keepWindow.has(url)) {
        this.prefetchedUrls.delete(url);
      }
    });
  }
}

export const videoPrefetchService = new VideoPrefetchService();
