'use strict';

//  // If using fullpage.js

new fullpage('#fullpage', {
  autoScrolling: true,
  navigation: true,
  onLeave: (origin, destination, direction) => {
    const section1 = document.querySelector('.s1');
    const section2 = document.querySelector('.s2');
    const section3 = document.querySelector('.s3');

    const timeline = new TimelineMax({ delay: 0.5 });
  
  timeline.fromTo(section1, 3.5, { opacity: 0 }, { opacity: 1 }, '+=.5')
  .fromTo(
    section2,
    1.4,
    { height: '70%' },
    { height: '100%', ease: Power2.easeInOut }
  )
  .fromTo(section3, 3.5, { opacity: 0 }, { opacity: 1 }, '-=.5')
  .fromTo(
    section3,
    1.4,
    { height: '70%' },
    { height: '100%', ease: Power2.easeInOut }
  )
  .fromTo(section3, 3.5, { opacity: 0 }, { opacity: 1 }, '-=.5');
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
});

// // Old animation


