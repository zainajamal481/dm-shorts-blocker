// YouTube Shorts Blocker - Background Script for Firefox
console.log('YouTube Shorts Blocker installed');

// Set default settings
browser.storage.sync.set({
  shortsBlockerEnabled: true
});

// Handle messages from content script and popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    // Get blocking status
    browser.storage.sync.get(['shortsBlockerEnabled']).then((result) => {
      sendResponse({ enabled: result.shortsBlockerEnabled !== false });
    });
    return true; // Async response
  }
  
  if (request.action === 'setStatus') {
    // Set blocking status
    browser.storage.sync.set({ shortsBlockerEnabled: request.enabled }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'reloadTab') {
    // Reload active YouTube tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
        browser.tabs.reload(tabs[0].id);
      }
    });
    sendResponse({ success: true });
  }
});

// Handle navigation to YouTube
browser.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('youtube.com') && details.url.includes('/shorts/')) {
    // If user lands on Shorts page, redirect to homepage
    browser.tabs.update(details.tabId, {
      url: 'https://www.youtube.com/'
    });
  }
});
