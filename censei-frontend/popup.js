let wordsCensored = localStorage.getItem('wordsCensored');

const initFirstRun = () => {
    if (!wordsCensored) {
        localStorage.setItem('wordsCensored','0');
        wordsCensored = localStorage.getItem('wordsCensored');
    }
};

const updateCounterElement = () => {
    const counterElement = document.getElementById("counter");
    counterElement.innerText = wordsCensored
};

initFirstRun();
updateCounterElement();


