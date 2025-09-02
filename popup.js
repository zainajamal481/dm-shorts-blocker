// YouTube Shorts Blocker - Popup Script
class PopupManager {
  constructor() {
    this.elements = {};
    this.stats = {
      blocked: 0,
      redirected: 0
    };
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadStatus();
    this.loadStats();
  }

  cacheElements() {
    this.elements = {
      statusValue: document.getElementById('statusValue'),
      toggleSwitch: document.getElementById('toggleSwitch'),
      toggleLabel: document.querySelector('.toggle-label'),
      blockedCount: document.getElementById('blockedCount'),
      redirectedCount: document.getElementById('redirectedCount'),
      reloadBtn: document.getElementById('reloadBtn'),
      settingsBtn: document.getElementById('settingsBtn')
    };
  }

  bindEvents() {
    // Переключатель блокировки
    this.elements.toggleSwitch.addEventListener('change', (e) => {
      this.toggleBlocking(e.target.checked);
    });

    // Кнопка обновления страницы
    this.elements.reloadBtn.addEventListener('click', () => {
      this.reloadTab();
    });

    // Кнопка настроек
    this.elements.settingsBtn.addEventListener('click', () => {
      this.openSettings();
    });
  }

  async loadStatus() {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
      this.updateStatus(response.enabled);
    } catch (error) {
      console.error('Ошибка загрузки статуса:', error);
      this.updateStatus(true); // По умолчанию включено
    }
  }

  updateStatus(enabled) {
    this.elements.toggleSwitch.checked = enabled;
    
    if (enabled) {
      this.elements.statusValue.textContent = 'Активна';
      this.elements.statusValue.className = 'status-value';
      this.elements.toggleLabel.textContent = 'Блокировка активна';
    } else {
      this.elements.statusValue.textContent = 'Отключена';
      this.elements.statusValue.className = 'status-value blocked';
      this.elements.toggleLabel.textContent = 'Блокировка отключена';
    }
  }

  async toggleBlocking(enabled) {
    try {
      await chrome.runtime.sendMessage({ 
        action: 'setStatus', 
        enabled: enabled 
      });
      
      this.updateStatus(enabled);
      
      // Отправляем сообщение в content script
      this.sendMessageToContentScript({
        action: enabled ? 'enable' : 'disable'
      });
      
      // Показываем уведомление
      this.showNotification(
        enabled ? 'Блокировка Shorts включена' : 'Блокировка Shorts отключена'
      );
      
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
      // Возвращаем переключатель в предыдущее состояние
      this.elements.toggleSwitch.checked = !enabled;
    }
  }

  async reloadTab() {
    try {
      await chrome.runtime.sendMessage({ action: 'reloadTab' });
      this.showNotification('Страница обновлена');
    } catch (error) {
      console.error('Ошибка обновления страницы:', error);
    }
  }

  openSettings() {
    // Открываем страницу настроек расширения
    chrome.runtime.openOptionsPage();
  }

  async loadStats() {
    try {
      // Загружаем статистику из storage
      const result = await chrome.storage.sync.get(['blockedCount', 'redirectedCount']);
      
      this.stats.blocked = result.blockedCount || 0;
      this.stats.redirected = result.redirectedCount || 0;
      
      this.updateStatsDisplay();
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  }

  updateStatsDisplay() {
    this.elements.blockedCount.textContent = this.stats.blocked;
    this.elements.redirectedCount.textContent = this.stats.redirected;
  }

  async sendMessageToContentScript(message) {
    try {
      const [tab] = await chrome.tabs.query({ 
        active: true, 
        currentWindow: true 
      });
      
      if (tab && tab.url && tab.url.includes('youtube.com')) {
        await chrome.tabs.sendMessage(tab.id, message);
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения в content script:', error);
    }
  }

  showNotification(message) {
    // Создаем временное уведомление
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #28a745;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: slideDown 0.3s ease-out;
    `;

    // Добавляем CSS анимацию
    if (!document.getElementById('popup-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'popup-notification-styles';
      style.textContent = `
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Удаляем уведомление через 2 секунды
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2000);
  }

  // Метод для обновления статистики
  updateStats(type, count = 1) {
    if (type === 'blocked') {
      this.stats.blocked += count;
      chrome.storage.sync.set({ blockedCount: this.stats.blocked });
    } else if (type === 'redirected') {
      this.stats.redirected += count;
      chrome.storage.sync.set({ redirectedCount: this.stats.redirected });
    }
    
    this.updateStatsDisplay();
  }
}

// Инициализируем popup после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});

// Слушаем сообщения от content script для обновления статистики
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateStats') {
    // Обновляем статистику в popup
    if (window.popupManager) {
      window.popupManager.updateStats(request.type, request.count);
    }
  }
});
