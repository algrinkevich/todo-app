document.body.addEventListener("click", showAnimation);

function showAnimation() {
    hideMessage();
    showLogo();
}

function hideMessage() {
    const message = document.getElementById("message");
    message.style.display = "none";
}

function showLogo() {
    const animationBlock = document.getElementById("animation");
    animationBlock.style.display = "block";
}
