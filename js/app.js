//INITIALIZATION
const visualGrid = document.getElementById('visual-grid');
const gridSize = 11;
let index = 0;

let gridItem = 
`<div class="circle-container">
  <div class="blue-circle"></div>
  <div class="yellow-circle"></div>
  <div class="red-circle"></div>
</div>`;

for(let i=0; i<gridSize; i++) {
  for(let j=gridSize; j>0; j--) {
    let modifier;
    if (j > i) modifier = j+1;
    if (j <= i) modifier = i+2;

    createCircle(((j>i) ? j+0.3 : i+1), index);
    index++;
  }
}

//SIZE ADJUSTMENT
const blueCircles = document.querySelectorAll('.blue-circle');
const redCircles = document.querySelectorAll('.red-circle');
const yellowCircles = document.querySelectorAll('.yellow-circle');

function createCircle(modifier, index) {
  visualGrid.innerHTML += 
  `<div class="circle-container" id="${index}">
    <div class="blue-circle"></div>
    <div class="red-circle"></div>
    <div class="yellow-circle"></div>
   </div>`;

  const currentContainer = document.getElementById(`${index}`);
  const circles = currentContainer.children;
  let size = 9.4 * modifier;
  let position = 50 - (size/2);
  let offset = (modifier > 3) ? 8 : 7;

  //Forming and situating the circles
  //DRYing this code broke it, will try again later
  const blueCircle = circles.item(0);
  blueCircle.style.width =  `${size}%`;
  blueCircle.style.height =  `${size}%`;
  blueCircle.style.top = `${position - offset}%`;
  blueCircle.style.left = `${position}%`;

  const redCircle = circles.item(1);
  redCircle.style.width =  `${size}%`;
  redCircle.style.height =  `${size}%`;
  redCircle.style.top = `${position + offset}%`;
  redCircle.style.left = `${position - offset}%`;

  const yellowCircle = circles.item(2);
  yellowCircle.style.width =  `${size}%`;
  yellowCircle.style.height =  `${size}%`;
  yellowCircle.style.top = `${position + offset}%`;
  yellowCircle.style.left = `${position + offset}%`;

  //TEST CHANGING CSS PROPERTY TO TRANSFORM: NEED RECALCULATIONS BUT IS WORTH IT FOR SMOOTH TRANSITIONS ON DYNAMIC VERSION
  // blueCircle.style.webkitTransform = `translateY(${position - offset}%)`
  // blueCircle.style.webkitTransform = `translateX(${position + offset}%)`
}


