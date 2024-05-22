const para = document.querySelector(".text");
const input = document.querySelector("input");
const timeSelect = document.querySelector("select");
const countdown = document.querySelector("#countdown span");
const wpmTag = document.querySelector("#result #wpm");
const accuracyTag = document.querySelector("#result #accuracy");
const mistakesTag = document.querySelector("#result #mistakes");
const rawWPMTag = document.querySelector("#result #raw-wpm");
const overlayResult = document.querySelector(".overlay");

let timer
let time = parseInt(timeSelect.value);
charIndex = 0;
mistakes = 0;
isTyping = true;
lastIndex = 0;
charCounter = 0;

countdown.innerText = time;


const loadPara = () => {
    const randomIdx = Math.floor(Math.random() * paragraphs.length);
    para.innerText = "";
    paragraphs[randomIdx].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        para.innerHTML += span;
    });
    para.querySelectorAll("span")[0].classList.add("current");
    document.addEventListener("keydown", () => input.focus());
    para.addEventListener("click", () => input.focus());
}

const startTyping = () => {
    if (isTyping) {
        timer = setInterval(updateTime, 1000);
        isTyping = false;
    }
    let charIndex = input.value.length - 1;
    let characters = para.querySelectorAll("span");
    let typedChar = input.value.split("")[charIndex];

    if (charIndex == -1) {  //When delete first character after typing
        characters.forEach(span => span.classList.remove("correct", "incorrect", "current"));
        characters[0].classList.add("current");
        lastIndex = charIndex;
        return;
    }

    if (charIndex < characters.length && time > 0) {
        if (lastIndex > charIndex && charIndex >= 0) {
            for (let i = charIndex + 1; i < characters.length; i++) {
                characters[i].classList.remove("correct", "incorrect", "current");
            }
            characters[charIndex + 1].classList.add("current");
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            characters[charIndex].classList.remove("current");
            characters[charIndex + 1].classList.add("current");
            charCounter++;
        }
    }
    lastIndex = charIndex;
}

const displayResult = () => {
    let wpm = ((charCounter - mistakes) * 60) / (5 * (parseInt(timeSelect.value) - time));
    wpmTag.innerText = wpm > 0 ? wpm : 0
    let accuracy = ((charCounter - mistakes) * 100) / charCounter;
    accuracyTag.innerText = accuracy > 0 ? Math.round(accuracy * 100) / 100 : 0;
    mistakesTag.innerText = mistakes;
    let rawWPM = (charCounter * 60) / (5 * (parseInt(timeSelect.value) - time))
    rawWPMTag.innerText = Math.round(rawWPM * 100) / 100;
    overlayResult.classList.remove("hide");
    clearInterval(timer);
}

const updateTime = () => {
    if (time > 0) {
        time--;
        countdown.innerText = time;
    } else {
        displayResult()
    }
    if (input.value.length >= para.querySelectorAll("span").length) {
        displayResult();
    }
}

const reset = () => {
    loadPara();
    clearInterval(timer);
    input.value = "";
    time = parseInt(timeSelect.value);
    console.log(time);
    countdown.innerText = time;
    lastIndex = 0;
    isTyping = true;
    charCounter = 0;
    charIndex = 0;
    charIndex = 0;
    mistakes = 0;
    overlayResult.classList.add("hide");
}

timeSelect.addEventListener("change", reset);
input.addEventListener("input", startTyping);

loadPara();