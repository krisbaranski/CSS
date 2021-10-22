'use strict';

const progressBar = document.getElementById('progress-bar');
const section = document.querySelector('section');

const animateProgressBar = () => {
  let scrollDistanse = -section.getBoundingClientRect().top;
  let progressWidth =
    (scrollDistanse /
      (section.getBoundingClientRect().height -
        document.documentElement.clientHeight)) *
    100;
  let value = Math.floor(progressWidth);
  progressBar.style.width = value + '%';

  if (value < 0) {
    progressBar.style.width = '0%';
  }
};

window.addEventListener('scroll', animateProgressBar);
