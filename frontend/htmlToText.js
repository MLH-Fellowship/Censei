/* 
Steps:
    1) Get all text from body
    2) send resulting text to backend
    3) Receive the updated text from backend
    4) Replace body text with the new text
*/


// Get text from body
const getBodyText = () => {
    const bodyText = document.body.innerHTML;
    return bodyText;
};

// Send text to backend
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    let newBodyText = '';
    bodyText = getBodyText();

    // fetch('http://localhost:8080/ping', {
    // })
    // .then(response => response.text())
    // .then(txt => console.log(txt));

    return fetch('http://localhost:8080/censorText', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: bodyText})
    })
    .then((response) => {
        // Resulting clean text is collected here
        console.log('Response from backend = ', response)
        return response.json()
    })
    .then(json => {
        console.log(json.censored_text)
        newBodyText = json.censored_text;
        return newBodyText;
    })
    .catch((err) => {
        console.log('Error: ', err);
        return;
    });
    
};

// Replace body text
const replaceBodyText = () => {
    sendToBackendAndWaitForResponse()
    .then(censoredText => {
        document.body.innerHTML = censoredText;
    })
    
};

let censorButton = document.getElementById('censorButton');
censorButton.addEventListener('click', replaceBodyText);