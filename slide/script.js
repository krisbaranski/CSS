'use strict';

const images = []; // Images Array
const time = 4000; // Time Between Switch
let i = 0; // Start Point

// Image List
images[0] =
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=81a5f1725ca68c549e0054dcfdf269de&auto=format&fit=crop&w=750&q=80';
images[1] =
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=483e72cc532caf940f4885ba2e9e9418&auto=format&fit=crop&w=750&q=80';
images[2] =
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01a9a264e737622958245b0f55a6e943&auto=format&fit=crop&w=668&q=80';
images[3] =
  'https://images.unsplash.com/photo-1506701234424-ef06760d8c8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=936e1dfe17a85554008d1fe1995f055a&auto=format&fit=crop&w=750&q=80';

// Change Image
function changeImg() {
  document.slide.src = images[i];

  // Check If Index Is Under Max
  if (i < images.length - 1) {
    // Add 1 to Index
    i++;
  } else {
    // Reset Back To O
    i = 0;
  }

  // Run function every x seconds
  setTimeout('changeImg()', time);
}

// Fading Image
function activeImg() {
  images.forEach(i => document.slide.style.classList.remove('active'));
  images[i].classList.add('active');
  i++;
}
// activeImg();

// Run function when page loads
window.onload = changeImg();
