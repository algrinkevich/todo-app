
const logo = document.getElementById("logo");

function getAnimationDurationSeconds(animationName) {
    const animationNames = getComputedStyle(logo).animationName.split(', ');
    const animationDurations = getComputedStyle(logo).animationDuration.split(', ');
    const animationDuration = animationDurations[animationNames.indexOf(animationName)];

    return Number(animationDuration.match(/^[0-9]+/)[0]) * 1000;
}

function triggerSound() {
    const audio = document.getElementById("audio");

    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 800);
}

logo.addEventListener("animationstart", () => {
    const durationX = getAnimationDurationSeconds("moveX");
    const durationY = getAnimationDurationSeconds("moveY");

    setInterval(triggerSound, durationX);
    setInterval(triggerSound, durationY);
});







