const counterElement = document.getElementById("counter");

chrome.storage.sync.get(["wordsCensored"], function({wordsCensored}){
    if (wordsCensored) {
        counterElement.innerText = wordsCensored
    }
})
