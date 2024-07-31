let pinnedWindowId = null;

chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(['pinned'], (result) => {
    const pinned = result.pinned || false;
    if (pinned) {
      if (pinnedWindowId) {
        chrome.windows.remove(pinnedWindowId);
        pinnedWindowId = null;
      }
      chrome.storage.local.set({ pinned: false });
    } else {
      chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',
        width: 300,
        height: 500,
        top: 100,
        left: 100
      }, (window) => {
        pinnedWindowId = window.id;
        chrome.storage.local.set({ pinned: true });
      });
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ pinned: false });
});
