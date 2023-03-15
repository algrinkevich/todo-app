const passcodeDigitPaneElements = document.querySelectorAll("[data-phone-passcode-digits]");

for (let digitPaneElement of passcodeDigitPaneElements) {
    digitPaneElement.addEventListener("click", handleClickOnDigit);
}

let currentPasscode = "";

function handleClickOnDigit(event) {
    const closestDigitBtn = event.target.closest(".passcode-button");
    if (!closestDigitBtn) {
        return;
    }
    currentPasscode += "*"; //no matter what was really clicked
    const pinElements = document.getElementsByClassName("passcode-dot");
    for (let i = 0; i < currentPasscode.length; i++) {
        const pinElement = pinElements[i];
        pinElement.classList.add("entered-passcode-dot");
        pinElement.parentElement.classList.remove("vibration");
    }

    if (currentPasscode.length === pinElements.length) {
        setTimeout(() => {
            currentPasscode = "";
            for (let pinElement of pinElements) {
                pinElement.classList.remove("entered-passcode-dot");
                pinElement.parentElement.classList.add("vibration");
            }
        }, 300);
    }
}
