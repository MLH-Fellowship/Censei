// Get text from body
const getBodyText = () => {
    const bodyTextList = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
    return bodyTextList;
};

// Send text to backend and get censored text
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    bodyTextList = getBodyText();

    for (let i = 0; i < bodyTextList.length; i++) {
        let currentElementText = bodyTextList[i].innerText;
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
            bodyTextList[i].innerText = json.censored_text;
        })
    };

};

// Replace body text
const replaceBodyText = () => {
    sendToBackendAndWaitForResponse()

};

replaceBodyText();
