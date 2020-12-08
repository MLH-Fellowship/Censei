chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({password: -1}, function() {
  });
  chrome.storage.sync.set({censorList: []}, function() {
  });
  chrome.storage.sync.set({whiteList: []}, function() {
  });


});
