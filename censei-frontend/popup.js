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
let censorDiv = document.getElementById("censorList");
let incorrect = document.getElementById("incorrect");

chrome.storage.sync.get('password', function(data) {
  if (data.password != -1){
    passwordSend.innerText = "Enter Password";
  }
});

passwordSend.onclick = function(element){
  chrome.storage.sync.get('password', function(data) {
    let toCompare = "";
    let reveal = false;
    console.log("" + digit1.value + digit2.value + digit3.value + digit4.value);
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
      censorDiv.style.display = 'block';
    } else {
      incorrect.style.display = 'block';
    }




  });


  element.innerText = "Enter Password";

}
