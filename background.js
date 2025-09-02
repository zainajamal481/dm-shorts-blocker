// YouTube Shorts Blocker - Background Script
chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Shorts Blocker установлен');
  
  // Устанавливаем настройки по умолчанию
  chrome.storage.sync.set({
    shortsBlockerEnabled: true
  });
});

// Обрабатываем сообщения от content script и popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    // Получаем статус блокировки
    chrome.storage.sync.get(['shortsBlockerEnabled'], (result) => {
      sendResponse({ enabled: result.shortsBlockerEnabled !== false });
    });
    return true; // Асинхронный ответ
  }
  
  if (request.action === 'setStatus') {
    // Устанавливаем статус блокировки
    chrome.storage.sync.set({ shortsBlockerEnabled: request.enabled }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'reloadTab') {
    // Перезагружаем активную вкладку YouTube
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
    sendResponse({ success: true });
  }
});

// Обрабатываем навигацию на YouTube
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('youtube.com') && details.url.includes('/shorts/')) {
    // Если пользователь попал на страницу Shorts, перенаправляем на главную
    chrome.tabs.update(details.tabId, {
      url: 'https://www.youtube.com/'
    });
  }
});

// Обрабатываем клик по иконке расширения
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes('youtube.com')) {
    // Открываем popup
    chrome.action.setPopup({ popup: 'popup.html' });
  }
});
