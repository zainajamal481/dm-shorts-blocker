// YouTube Shorts Blocker - Content Script
class YouTubeShortsBlocker {
  constructor() {
    this.isEnabled = true;
    this.observer = null;
    this.blockedUrls = new Set();
    this.init();
  }

  init() {
    // Загружаем настройки
    this.loadSettings();
    
    // Запускаем блокировку
    this.startBlocking();
    
    // Слушаем изменения в DOM
    this.observeDOM();
    
    // Слушаем навигацию
    this.handleNavigation();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['shortsBlockerEnabled']);
      this.isEnabled = result.shortsBlockerEnabled !== false; // По умолчанию включено
    } catch (error) {
      console.log('YouTube Shorts Blocker: Ошибка загрузки настроек:', error);
    }
  }

  startBlocking() {
    if (!this.isEnabled) return;
    
    // Блокируем текущую страницу
    this.blockShortsPage();
    
    // Скрываем блоки с Shorts
    this.hideShortsBlocks();
    
    // Блокируем ссылки на Shorts
    this.blockShortsLinks();
  }

  blockShortsPage() {
    const currentUrl = window.location.href;
    
    // Проверяем, является ли текущая страница Shorts
    if (this.isShortsUrl(currentUrl)) {
      this.redirectFromShorts();
    }
  }

  isShortsUrl(url) {
    return url.includes('/shorts/') || 
           url.includes('youtube.com/shorts') ||
           url.includes('youtube.com/feed/trending') ||
           url.includes('youtube.com/feed/explore');
  }

  redirectFromShorts() {
    // Перенаправляем на главную страницу YouTube
    if (window.location.pathname.startsWith('/shorts/')) {
      window.location.href = 'https://www.youtube.com/';
    }
  }

  hideShortsBlocks() {
    // Скрываем блоки с Shorts на главной странице
    const shortsSelectors = [
      'ytd-rich-section-renderer:has(span:contains("Shorts"))',
      'ytd-rich-section-renderer:has(a[href*="/shorts/"])',
      'ytd-rich-section-renderer:has(span:contains("Короткие видео"))',
      'ytd-rich-section-renderer:has(span:contains("Short videos"))',
      'ytd-rich-grid-row:has(ytd-rich-item-renderer a[href*="/shorts/"])',
      'ytd-rich-grid-row:has(ytd-rich-item-renderer:has(span:contains("Shorts")))',
      'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
      'ytd-guide-entry-renderer:has(yt-formatted-string:contains("Shorts"))',
      'ytd-reel-shelf-renderer',
      'ytd-guide-entry-renderer a[title="Shorts"]',
      '.ytChipShapeChip:contains("Shorts")'
    ];

    shortsSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && !el.dataset.shortsBlocked) {
            el.style.display = 'none';
            el.dataset.shortsBlocked = 'true';
          }
        });
      } catch (error) {
        // Игнорируем ошибки с невалидными селекторами
      }
    });

    // Скрываем отдельные видео Shorts
    const shortsVideos = document.querySelectorAll('ytd-rich-item-renderer a[href*="/shorts/"]');
    shortsVideos.forEach(video => {
      const container = video.closest('ytd-rich-item-renderer');
      if (container && !container.dataset.shortsBlocked) {
        container.style.display = 'none';
        container.dataset.shortsBlocked = 'true';
      }
    });
  }

  blockShortsLinks() {
    // Блокируем клики по ссылкам на Shorts
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && this.isShortsUrl(link.href)) {
        e.preventDefault();
        e.stopPropagation();
        
        // Показываем уведомление
        this.showNotification('Доступ к Shorts заблокирован');
        
        return false;
      }
    }, true);
  }

  showNotification(message) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    `;

    // Добавляем CSS анимацию
    if (!document.getElementById('shorts-blocker-styles')) {
      const style = document.createElement('style');
      style.id = 'shorts-blocker-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  observeDOM() {
    // Создаем наблюдатель за изменениями в DOM
    this.observer = new MutationObserver((mutations) => {
      if (!this.isEnabled) return;
      
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        // Небольшая задержка для стабилизации DOM
        setTimeout(() => {
          this.hideShortsBlocks();
        }, 100);
      }
    });

    // Начинаем наблюдение
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  handleNavigation() {
    // Слушаем изменения URL
    let currentUrl = window.location.href;
    
    const checkUrl = () => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        
        if (this.isEnabled) {
          setTimeout(() => {
            this.startBlocking();
          }, 500);
        }
      }
    };

    // Проверяем URL каждые 100ms
    setInterval(checkUrl, 100);
  }

  // Методы для управления блокировкой
  enable() {
    this.isEnabled = true;
    this.startBlocking();
    chrome.storage.sync.set({ shortsBlockerEnabled: true });
  }

  disable() {
    this.isEnabled = false;
    chrome.storage.sync.set({ shortsBlockerEnabled: false });
    
    // Показываем скрытые элементы
    const hiddenElements = document.querySelectorAll('[data-shorts-blocked="true"]');
    hiddenElements.forEach(el => {
      el.style.display = '';
      delete el.dataset.shortsBlocked;
    });
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
}

// Инициализируем блокировщик после загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new YouTubeShortsBlocker();
  });
} else {
  new YouTubeShortsBlocker();
}

// Экспортируем для доступа из popup
window.YouTubeShortsBlocker = YouTubeShortsBlocker;
