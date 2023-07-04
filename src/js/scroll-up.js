const throttle = require('lodash.throttle');

const buttonEl = document.querySelector('.button-scroll');

document.addEventListener('scroll', throttle(onWindowScroll, 400));

function onWindowScroll(e) {
  if (window.scrollY >= 800) {
    buttonEl.classList.remove('scroll-hidden');
    buttonEl.addEventListener('click', onButtonClick);
  } else if (window.scrollY <= 800) {
    buttonEl.classList.add('scroll-hidden');
    buttonEl.removeEventListener('click', onButtonClick);
  }
}

function onButtonClick(e) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
