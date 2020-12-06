
// Get text from body
const getBodyText = () => {
    const bodyText = document.body.innerHTML;
    return bodyText;

};

// Send text to backend and get censored text
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    let newBodyText = '';
    bodyText = getBodyText();

    return fetch('http://127.0.0.1:5000/censorText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: bodyText}),
        mode: 'no-cors'
    })
    .then((response) => {
        // Resulting clean text is collected here
        return response.json();
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

replaceBodyText();
