function displayCurrentDateAndTime() {
    const dateElements = document.querySelectorAll("[data-phone-datetime]");
    for (let dateElement of dateElements) {
        dateElement.textContent = moment().format(dateElement.dataset.phoneDatetimeFormat);
    }
}

displayCurrentDateAndTime();
setInterval(displayCurrentDateAndTime, 1000);
