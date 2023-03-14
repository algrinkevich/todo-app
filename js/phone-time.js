function displayCurrentTime() {
    const screenTimes = document.querySelectorAll("[data-phone-time]");
    for (let time of screenTimes) {
        time.textContent = moment().format('HH:mm'); 
    }
}

displayCurrentTime();
setInterval(displayCurrentTime, 1000);
