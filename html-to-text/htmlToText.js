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

