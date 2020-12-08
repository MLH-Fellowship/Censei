const counterElement = document.getElementById("counter");

chrome.storage.sync.get(["wordsCensored"], function({wordsCensored}){
    if (wordsCensored) {
        counterElement.innerText = wordsCensored;
    }
})

let passwordSend = document.getElementById("passwordSend");
let digit1 = document.getElementById("digit1");
let digit2 = document.getElementById("digit2");
let digit3 = document.getElementById("digit3");
let digit4 = document.getElementById("digit4");
let passwordDiv = document.getElementById("password");
let censorDiv = document.getElementById("censorInput");
let incorrect = document.getElementById("incorrect");
let listTitle = document.getElementById("listTitle");
let list = document.getElementById("added");
let censorButton = document.getElementById("censorButton");
let whiteListButton = document.getElementById("whiteListButton");
let wordInput = document.getElementById("wordInput");
let newCensorList = [];
let newWhiteList = [];

// Check for password
chrome.storage.sync.get('password', function(data) {
  if (data.password != -1){
    passwordSend.innerText = "Enter Password";
  }
});

// Let the user login or set a parental controls password
passwordSend.onclick = function(element){
  chrome.storage.sync.get('password', function(data) {
    let toCompare = "";
    let reveal = false;
    if ("" + data.password == "-1"){
      toCompare = "" + digit1.value + digit2.value + digit3.value + digit4.value;
      chrome.storage.sync.set({password: toCompare}, function() {
        });
      reveal = true;
    } else {
      toCompare = data.password;
      if (toCompare == "" + digit1.value + digit2.value + digit3.value + digit4.value){
        reveal = true
      }
    }

    passwordSend.innerText = "Enter Password";

    if (reveal){
      passwordDiv.style.display = 'none';
      chrome.storage.sync.get('censorList', function(data) {
        data.censorList.forEach(function(item, index){
          let li = document.createElement("li");
          let text = document.createTextNode("\"" + item + "\"" + " - censored");
          li.appendChild(text);
          list.appendChild(li);
          newCensorList.push(item);
        });
      });

      chrome.storage.sync.get('whiteList', function(data) {
        data.whiteList.forEach(function(item, index){
          let li = document.createElement("li");
          let text = document.createTextNode("\"" + item + "\"" + " - whitelisted");
          li.appendChild(text);
          list.appendChild(li);
          newWhiteList.push(item);
        });
      });
      listTitle.style.display = 'block';
      censorDiv.style.display = 'block';
      incorrect.style.display = 'none';
      list.style.display = 'block';
    } else {
      incorrect.innerText = "Your password is incorrect.";
      incorrect.style.display = 'block';
    }




  });


  element.innerText = "Enter Password";
}

// add a word to the censor list
censorButton.onclick = function(element){

  let word = wordInput.value;

  if (word === "") {
    incorrect.innerText = "Not a valid word.";
    incorrect.style.display = 'block';
  } else {
    incorrect.style.display = 'none';

    newCensorList.push(word);

    chrome.storage.sync.set({censorList: newCensorList}, function() {
      });


    let li = document.createElement("li");
    let text = document.createTextNode("\"" + word + "\"" + " - censored");
    li.appendChild(text);
    list.appendChild(li);
  }
  wordInput.value = "";


}

// add a word to the whitelist
whiteListButton.onclick = function(element){

  let word = wordInput.value;

  if (word === "") {
    incorrect.innerText = "Not a valid word.";
    incorrect.style.display = 'block';
  } else {
    incorrect.style.display = 'none';

    newWhiteList.push(word);

    chrome.storage.sync.set({whiteList: newWhiteList}, function() {
      });


    let li = document.createElement("li");
    let text = document.createTextNode("\"" + word + "\"" + " - whitelisted");
    li.appendChild(text);
    list.appendChild(li);
  }
  wordInput.value = "";


}
