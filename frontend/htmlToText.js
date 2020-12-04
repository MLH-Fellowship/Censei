/* 
Steps:
    1) Get all text from body
    2) send resulting text to backend
    3) Receive the updated text from backend
    4) Replace body text with the new text
*/


// Get text from body
const getBodyText = () => {
    const bodyText = document.body.innerText;
    return bodyText;
};

// Send text to backend
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    let newBodyText = '';
    bodyText = getBodyText();

    fetch('http://127.0.0.1:8080/post', {method: 'POST', body:bodyText})
    .then((response) => {
        // Resulting clean text is collected here
        console.log('Response from backend = ', response)
        newBodyText = response;
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

    return newBodyText;
    
};

// Replace body text
const replaceBodyText = () => {
    const newBodyText = sendToBackendAndWaitForResponse();
    document.body.innerText = newBodyText;
};