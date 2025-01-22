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

