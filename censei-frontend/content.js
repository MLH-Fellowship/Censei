// Get text from body
const getBodyText = () => {
    const bodyText = document.body.innerHTML;
    console.log("getBodyText() called", bodyText);
    return bodyText;
};

// Send text to backend and get censored text
const sendToBackendAndWaitForResponse = () => {

    // Post body text to backend
    let newBodyText = '';
    bodyText = getBodyText();

    return fetch('https://censei-backend-twfbr3tmoq-uc.a.run.app/censorText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: bodyText})
    })
    .then((response) => {
        console.log("Fetch success!", response)
        // Resulting clean text is collected here
        return response.json()
    })
    .then(json => {
        console.log("JSON From response", json)
        newBodyText = json.censored_text;
        return newBodyText;
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

};

// Replace body text
const replaceBodyText = () => {
    sendToBackendAndWaitForResponse()
    .then(censoredText => {
        document.body.innerHTML = censoredText;
    })
    .catch(err => console.log("Error", err))

};

replaceBodyText();
