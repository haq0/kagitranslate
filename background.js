// Add context menu item once during installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'translate',
      title: 'Translate',
      contexts: ['selection']
    });
  });
});

// Extension icon click handler
chrome.action.onClicked.addListener(async (tab) => {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString().trim()
    });

    const baseUrl = 'https://translate.kagi.com/';
    const translatedUrl = result?.result 
      ? `${baseUrl}?text=${encodeURIComponent(result.result)}`
      : `${baseUrl}?url=${encodeURIComponent(tab.url)}`;

    chrome.tabs.create({ url: translatedUrl });
  } catch (error) {
    console.error('Error handling translation request:', error);
  }
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'translate') {
    const selection = info.selectionText?.trim();
    const baseUrl = 'https://translate.kagi.com/';
    const translatedUrl = selection
      ? `${baseUrl}?text=${encodeURIComponent(selection)}`
      : `${baseUrl}?url=${encodeURIComponent(tab.url)}`;

    chrome.tabs.create({ url: translatedUrl });
  }
});
