const MOVE_X_ANIMATION_NAME = 'moveX';
const MOVE_Y_ANIMATION_NAME = 'moveY';
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

logo.addEventListener("animationstart", (evt) => {
    switch (evt.animationName) {
        case MOVE_X_ANIMATION_NAME:
            const durationX = getAnimationDurationSeconds(MOVE_X_ANIMATION_NAME);
            setInterval(triggerSound, durationX);
            break;
        case MOVE_Y_ANIMATION_NAME:
            const durationY = getAnimationDurationSeconds(MOVE_Y_ANIMATION_NAME);
            setInterval(triggerSound, durationY);
            break;
    }
});
