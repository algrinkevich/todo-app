const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false
});

const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener('click', () => swiper.slidePrev());
