'use strict';

// var i,j;
// daily:
// for (i=0; i<3; i++) {
//   coding:
//   for(j=0; j<3; j++) {
//     if(i===j) {
//       continue daily;
//     }
//   }
// }
// console.log(i,j);

// get it together
const options = {
  imgSrc : "drzewka_poprostu.jpg",
  containerName : "placeholder",
  rows:5,
  columns:5,
  margin:2.5,
  animTime: 0.3
}

function ImageGrid(defaults)
{
  var r = defaults.rows;
  var c = defaults.columns;
  var margin = defaults.margin;
    
  var placeholder = document.getElementsByClassName(defaults.containerName)[0];
  var container = document.createElement('div');
  container.className = "gridContainer";
  placeholder.appendChild(container); 
    
  var gridTile;  

  var w = (container.offsetWidth / c) -margin;
  var h = (container.offsetHeight / r) -margin;
  var arr = [];
    
  for (var i=0, l=r*c; i < l; i++)
  {    
    gridTile = document.createElement('div');
    gridTile.className = "gridTile";
    gridTile.style.backgroundImage = "url("+defaults.imgSrc+")";
    
       
    arr = [(w+margin)*(i%c), (h+margin)*Math.floor(i/c), ((w+margin)*(i%c)+w-margin), (h+margin)*Math.floor(i/c), ((w+margin)*(i%c)+w-margin), ((h+margin)*Math.floor(i/c) + h-margin), (w+margin)*(i%c), ((h+margin)*Math.floor(i/c) + h-margin)];
        
   // console.log(i + " ====>>> " + arr + " ||||| " + i%c  + " |||||| " + i/c);  
    
        
    TweenMax.set(gridTile, {webkitClipPath:'polygon('+arr[0]+'px '+ arr[1]+'px,'+arr[2]+'px '+arr[3]+'px, '+arr[4]+'px '+ arr[5] +'px, '+arr[6]+'px '+ arr[7] +'px)', clipPath:'polygon('+arr[0]+'px '+ arr[1]+'px,'+arr[2]+'px '+arr[3]+'px, '+arr[4]+'px '+ arr[5] +'px, '+arr[6]+'px '+ arr[7] +'px)'});
       
    container.appendChild(gridTile);    
    
    fixTilePosition(gridTile, i);
  }
  
  placeholder.addEventListener("mouseover", function(e){
    var allTiles = e.currentTarget.querySelectorAll(".gridTile");
    for (var t=0, le = allTiles.length; t < le; t++)
      {
        TweenMax.to(allTiles[t], defaults.animTime, {css:{backgroundPosition:"0px 0px"}, ease:Power1.easeOut});
      }
  })
                             
  placeholder.addEventListener("mouseleave", function(e){
    var allTiles = e.currentTarget.querySelectorAll(".gridTile");
    for (var ti=0, len = allTiles.length; ti < len; ti++)
      {
        fixTilePosition(allTiles[ti], ti, defaults.animTime);
      }
  })
  
  function fixTilePosition(tile, ind, time)
  {
    if(time==null)time=0;
    var centr, centrCol, centrRow, offsetW, offsetH, left, top;
    
    centr = Math.floor(c * r / 2);
    centrCol = Math.ceil(centr/c);
    centrRow = Math.ceil(centr/r);
        
    offsetW = w/centrCol;
    offsetH = h/centrRow;
    
    left = (Math.round((ind % c - centrCol + 1) * offsetW));
    top = (Math.round((Math.floor(ind/c) - centrRow + 1) * offsetH));
    
    //console.log(left, top)
    
    TweenMax.to(tile, time, {css:{backgroundPosition:left+"px "+top+"px"}, ease:Power1.easeOut});
  }
}

ImageGrid(options);




// animation
// optionsMove
const optionsMove = {
  imgSrc : "drzewka_poprostu.jpg",
  containerName : "tileContainer",
  grid : false,
  tileWidth : 80,
  tileHeight : 80,
  mouseTrail:true
}

// ----------------------------------------------------------
let tileWidth, tileHeight, numTiles, tileHolder, tileContainer;
let directionX, directionY;
let imgOriginalWidth, imgOriginalHeight;
let imgCoverWidth, imgCoverHeight;
let imageLoaded = false;

numTiles = 0;
tileWidth = optionsMove.tileWidth;
tileHeight = optionsMove.tileHeight;

tileContainer = document.getElementsByClassName(optionsMove.containerName)[0];

function init() {
  if (optionsMove.grid == false)tileContainer.className += " noGrid";
  
  //preload image and get original image size, then create tiles
  const image = new Image();
  image.src = optionsMove.imgSrc;
  image.onload = function(e){
    imageLoaded = true;
    imgOriginalWidth = e.currentTarget.width;
    imgOriginalHeight = e.currentTarget.height;
    
    createTileHolder();
    checkTileNumber();
    positionImage();
    addListeners();
  };  
}

function resizeHandler() {
  if(imageLoaded == false)return;
  
  //not working yet
  
  checkTileNumber();
  positionImage();
}

function createTileHolder() {
  tileHolder = document.createElement('div');
  tileHolder.className = "tileHolder";
  tileHolder.style.position = "absolute";
  tileHolder.style.top = "50%";
  tileHolder.style.left = "50%";
  tileHolder.style.transform = "translate(-50%, -50%)";
  tileContainer.appendChild(tileHolder);
}

function checkTileNumber() {
  tileHolder.style.width = Math.ceil(tileContainer.offsetWidth / tileWidth) * tileWidth + "px";
  tileHolder.style.height = Math.ceil(tileContainer.offsetHeight / tileHeight) * tileHeight + "px";
  
  const tilesFitInWindow = Math.ceil(tileContainer.offsetWidth / tileWidth) * Math.ceil(tileContainer.offsetHeight / tileHeight);

  if (numTiles < tilesFitInWindow){
    for (let i = 0, l = tilesFitInWindow - numTiles; i < l; i++) {
      addTiles();
    }
  } else if (numTiles > tilesFitInWindow) {
      for (let i = 0, l = numTiles-tilesFitInWindow; i < l; i++){
        removeTiles();
      }
  }  
}


function addTiles() {
  const tile = document.createElement('div');
  tile.className = "tile";  
  
  //maintain aspect ratio
  imgCoverWidth = tileContainer.offsetWidth;
  imgCoverHeight = tileContainer.offsetHeight;

  if (imgOriginalWidth > imgOriginalHeight) {
        imgCoverHeight = imgOriginalHeight / imgOriginalWidth * imgCoverWidth;
    } else {
        imgCoverWidth = imgOriginalWidth / imgOriginalHeight * imgCoverHeight;     
    } 
  
  
  tile.style.background = 'url("'+optionsMove.imgSrc+'") no-repeat';
  tile.style.backgroundSize  = imgCoverWidth + "px " +  imgCoverHeight + "px";
  tile.style.width = tileWidth + "px";
  tile.style.height = tileHeight + "px";
  document.querySelectorAll(".tileHolder")[0].appendChild(tile);
  
  tile.addEventListener("mouseover", moveImage);  
  
  numTiles++;
}

function removeTiles() {
  const tileToRemove = document.querySelectorAll(".tile")[0];
  tileToRemove.removeEventListener("mouseover", moveImage); 
  
  TweenMax.killTweensOf(tileToRemove);
  tileToRemove.parentNode.removeChild(tileToRemove);
  
  numTiles--;
}

function addListeners() {
 if (optionsMove.mouseTrail) {
    document.addEventListener('mousemove', function (event) {
      directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      directionY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    });
  }
}

function positionImage() {
  for (let t = 0, l = numTiles; t < l; t++) {
    const nowTile = document.querySelectorAll(".tile")[t];
   
    const left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
    const top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)));
    
    nowTile.style.backgroundPosition = left + "px " + top + "px";
  }
}

function resetImage(nowTile) {    
  const left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
  const top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)));
  
  
  TweenMax.to(nowTile, 1, {backgroundPosition:left + "px " + top + "px", ease:Power1.easeInOut});
}


function moveImage(e) {
  let nowTile = e.currentTarget
  const minWidth = -tileContainer.offsetWidth + nowTile.offsetWidth;
  const minHeight = -tileContainer.offsetHeight + nowTile.offsetHeight;
  const nowLeftPos = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth/2)));
  const nowTopPos = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight/2)))
  const offset = 60;
  let left = nowLeftPos;
  let top = nowTopPos;
    
  if (optionsMove.mouseTrail){
    //direction-aware movement
    if (directionX > 0){
      left = nowLeftPos + offset;
    } else if (directionX < 0){
      left = nowLeftPos - offset;
    }
    
    if (directionY > 0){
      top = nowTopPos + offset;
    } else if (directionY < 0){
      top = nowTopPos - offset;
    }
  } else {
    //random movement
    left = getRandomInt(nowLeftPos - offset , nowLeftPos + offset);
    top = getRandomInt(nowTopPos - offset, nowTopPos + offset);
  }
    
  // bounds
  if (left < minWidth)left = minWidth;
  if (left > 0)left = 0;
  if (top < minHeight)top = minHeight;
  if (top > 0)top = 0;
  
  //tween
  TweenMax.to(nowTile, 1.5, {backgroundPosition:left + "px " + top + "px", ease:Power1.easeOut, onComplete:resetImage, onCompleteParams:[nowTile]});

};

///////////////////////////////////////////////////////////////////

init();
// handle event
// window.addEventListener("optimizedResize", resizeHandler);

////////////////////////UTILS//////////////////////////////////////
//////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function() {
    const throttle = function(type, name, obj) {
        obj = obj || window;
        let running = false;
        let func = function() {
            if (running) { return }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

// rest of JS

// const btn = document.querySelector('.btn');
// // const boxes = document.querySelectorAll('.box');
// const box = document.querySelector('.box');
// const container = document.getElementById('container');
// const postcard = document.querySelector('.postcard');
// // API request
// const API_URL = 'https://api.teleport.org/api/urban_areas';

// function removeAllBoxes() {
//   while (container.hasChildNodes()) {
//     container.removeChild(container.lastChild);
//   }
// }

// function createBox() {
//   let box = `<div class='box'></div>`;
//   return box;
// }

// function addBoxes(number) {
//   for (let i = 0; i < number; i++) {
//     let box = createBox();
//     container.insertAdjacentHTML('beforeend', box);
//   }
// }

// function addClickEventToBoxes() {
//   let boxes = document.getElementsByClassName('box');
//   for (let box of boxes) {
//     box.addEventListener('click', showPostcard());
//   }
// }

// function displayBoxes() {
//   let number = Number(document.getElementById('amount').value);
//   removeAllBoxes();
//   addBoxes(number);
//   showImages();
//   addClickEventToBoxes();
// }

// async function getImages(url) {
//   const res = await fetch(url);
//   const data = await res.json();

//   showImages(data.results);
// }

// function showImages() {
//   getImages(API_URL);
// }

// function showPostcard() {
//   postcard.classList.remove('hidden');

//   // if (postcard.classList.contains('hidden')) {
//   // } else {
//   //   postcard.classList.add('hidden');
//   // }
// }

// // btn.addEventListener('click', displayBoxes);
