// Add a listener for when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString().trim()
  });

  const baseUrl = 'https://translate.kagi.com/';
  let translatedUrl;

  if (result.result) {
    translatedUrl = `${baseUrl}?text=${encodeURIComponent(result.result)}`;
  } else {
    translatedUrl = `${baseUrl}?url=${encodeURIComponent(tab.url)}`;
  }

  chrome.tabs.create({ url: translatedUrl });
});

// Add a context menu item for translating selected text
chrome.contextMenus.create({
  id: 'translate',
  title: 'Translate',
  contexts: ['selection']
});

// Add a listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'translate') {
    const selection = info.selectionText;
    const baseUrl = 'https://translate.kagi.com/';
    const translatedUrl = `${baseUrl}?text=${encodeURIComponent(selection)}`;

    // Call translateText function here if you want to perform actual translations using an API or similar method
    // For now, it directly opens a new tab with the URL
    chrome.tabs.create({ url: translatedUrl });
  }
});

// Define the translateText function here if you want to use it instead of directly opening a new tab
function translateText(text, sourceLang, targetLang) {
  // You can use an API like Google Translate or Microsoft Translator Text API here to perform actual translations
}
