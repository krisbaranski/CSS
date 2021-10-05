'use strict';

new fullpage('#fullpage', {
  autoScrolling: true,
  navigation: true,
});

// Old animation

// const hero = document.querySelector('.hero');
// const slider = document.querySelector('.slider');
// const logo = document.querySelector('#logo');
// const hamburger = document.querySelector('.hamburger');
// const headline = document.querySelector('.headline');

// const timeline = new TimelineMax();

// timeline
//   .fromTo(
//     hero,
//     1.4,
//     { height: '0%' },
//     { height: '80%', ease: Power2.easeInOut }
//   )
//   .fromTo(
//     hero,
//     1.2,
//     { width: '100%' },
//     { width: '80%', ease: Power2.easeInOut },
//     '-= .6'
//   )
//   .fromTo(
//     headline,
//     1,
//     { height: '20%' },
//     { height: '0%', ease: Power2.easeInOut },
//     '-= 2'
//   )
//   .fromTo(headline, 1, { opacity: 0 }, { opacity: 1 }, '-= 0.8');
