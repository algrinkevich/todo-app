function displayCurrentDate() {
    const screenDates = document.querySelectorAll("[data-phone-date]");
    for (let date of screenDates) {
        date.textContent = moment().format('dddd, DD MMMM');
    }
}

displayCurrentDate();
setInterval(displayCurrentDate, 1000);
