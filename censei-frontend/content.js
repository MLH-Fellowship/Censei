// Increments the number of words censored in chrome storage to display on extension popup
const incrementCounter = () => {
    chrome.storage.sync.get(["wordsCensored"], function({wordsCensored}){
    if (wordsCensored) {
        let newValue = wordsCensored + 1;
        chrome.storage.sync.set({"wordsCensored": newValue})
    } else {
        chrome.storage.sync.set({ "wordsCensored": 1 });
    }
    });
};

// Get text from body
const getBodyText = () => {
    const bodyTextList = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
    return bodyTextList;
};

// create white and censor lists
let whiteList = [];
let censorList = [];

// callback to set the whiteList after received from background.js
function setWhiteList(list){
  whiteList = list;
}

// callback to set the censorList to received from background.js
function setCensorList(list){
  censorList = list;
}


// Send text to backend and get censored text
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    bodyTextList = getBodyText();

    chrome.runtime.sendMessage({type: "listRequest"}, function(response) {
      setWhiteList(response.whiteList);
      setCensorList(response.censorList);
    });

    for (let i = 0; i < bodyTextList.length; i++) {
        let currentElementText = bodyTextList[i].innerHTML;
        fetch('https://censei-backend-twfbr3tmoq-uc.a.run.app/censorText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: currentElementText})
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const newText = json.censored_text.slice(1); // Removes whitespace from start

            if (currentElementText !== newText) {
                // Increment counter for wordsCensored
                incrementCounter();
            }
            bodyTextList[i].innerHTML = newText;
        })
    };

};

// Replace body text
const replaceBodyText = () => {
    sendToBackendAndWaitForResponse()

};


replaceBodyText();
