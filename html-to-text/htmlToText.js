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
// TODO: Create function to send text to backend

// Receive updated text
// TODO: Create function to receive updated text

// Replace body text
const replaceBodyText = () => {
    const newBodyText = "PLACEHOLDER TEXT";
    document.body.innerText = newBodyText;
};