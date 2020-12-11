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

let whiteList = [];
let censorList = [];

// callback to set the whiteList to return to content.js
function setWhiteList(data){
  whiteList = data.whiteList;
}

// callback to set the censorList to return to content.js
function setCensorList(data){
  censorList = data.censorList;
}

// wait for content.js's message and return lists
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "listRequest"){
      chrome.storage.sync.get('whiteList', setWhiteList);
      chrome.storage.sync.get('censorList', setCensorList);
      sendResponse({whiteList: whiteList, censorList: censorList});
    }
  }
);
