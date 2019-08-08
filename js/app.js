//INITIALIZATION
const visualGrid = document.getElementById('visual-grid');
const gridSize = 11;
let index = 0;
let drawnCircles = []; 

let gridItem = 
`<div class="circle-container">
  <div class="blue-circle"></div>
  <div class="yellow-circle"></div>
  <div class="red-circle"></div>
</div>`;

for(let i=0; i<gridSize; i++) {
  for(let j=gridSize; j>0; j--) {
    let modifier;

    createCircle(((j>i) ? j+0.3 : i+1), index);
    index++;
  }
}

//new code

const circleContainers = document.querySelectorAll('.circle-container');
circleContainers.forEach((container) => {
  container.addEventListener('mouseover', (event) => {
    drawnCircles = []; //empty the array to redraw everything on hover
    if(event.target.id) {
      paintCircles(event.target.id, 0.8);
    }
  });
});

//Recursively re-create all circles on hover
function paintCircles(index, modifier) {
  // console.log(`now painting container #${index} with a modifier of ${modifier}`);

  //get the circle container the mouse is hovering on
  let container = document.getElementById(index);

  //add its index to drawnCircles array
  drawnCircles.push(index);

  //draw its circles by applying the modifier
  fillContainerWithCircles(container, modifier);

  //make an array of all the neighbors of the hovered container
  const neighboringContainers = getNeighborContainers(index);
  modifier += 0.1;
  neighboringContainers.forEach((containerIndex) => {
    paintCircles(containerIndex, modifier);
  });


  //if ALL containers are drawn, break the loop [do this last]

  //make an array of all the neighbors of the hovered container
    //except the ones that are already in the drawnCircles array
    //except the ones that aren't in the same row
  //recursively apply drawCircle(modifier + 1) to each container in the array
}

function fillContainerWithCircles(container, modifier) {
  let size = 9.4 * modifier;
  let position = 50 - (size/2);
  let offset = (modifier > 1.5) ? 8 : 7;

  const blueCircle = container.children.item(0);
  blueCircle.style.width =  `${size}%`;
  blueCircle.style.height =  `${size}%`;
  blueCircle.style.top = `${position - offset}%`;
  blueCircle.style.left = `${position}%`;

  const redCircle = container.children.item(1);
  redCircle.style.width =  `${size}%`;
  redCircle.style.height =  `${size}%`;
  redCircle.style.top = `${position + offset}%`;
  redCircle.style.left = `${position - offset}%`;

  const yellowCircle = container.children.item(2);
  yellowCircle.style.width =  `${size}%`;
  yellowCircle.style.height =  `${size}%`;
  yellowCircle.style.top = `${position + offset}%`;
  yellowCircle.style.left = `${position + offset}%`;
}

function getNeighborContainers(index) {
  let result = [];
  //get neighbor to the left, add it if you're not on an edge/corner
  const neighborW = index++;
  if(Math.floor(index+1 / gridSize) === Math.floor(neighborW+1 / gridSize) && drawnCircles.indexOf(neighborW) === -1) {
    result.push(neighborW);
    drawnCircles.push(neighborW);
  }
  //get neighbor to the right, add it in if you're not on an edge/corner
  const neighborE = index--;
  if(Math.floor(index+1 / gridSize) === Math.floor(neighborE+1 / gridSize) && drawnCircles.indexOf(neighborE) === -1) {
    result.push(neighborE);
  }
  //get topmost neighbor, add it in if it's not out of bounds
  const neighborN = index-gridSize;
  if(neighborN > -1 && drawnCircles.indexOf(neighborN) === -1) {
    result.push(neighborN);
  }
  //get bottom neighbor, add it in if it's not out of bounds
  const neighborS = index+gridSize;
  if(neighborS < gridSize * gridSize-1 && drawnCircles.indexOf(neighborS) === -1) {
    result.push(neighborS);
  } 
  //get northwestern neighbor, add it in if it's not out of bounds
  const neighborNW = neighborN + 1;
  if(result.indexOf(neighborN) !== -1 && drawnCircles.indexOf(neighborNW) === -1) {
    if(Math.floor(neighborN / gridSize) === Math.floor(neighborNW / gridSize)) {
      result.push(neighborNW);
    }
  }
  //get northeastern neighbor, add it in if it's not out of bounds
  const neighborNE = neighborN - 1;
  if(result.indexOf(neighborN) !== -1 && drawnCircles.indexOf(neighborNE) === -1) {
    if(Math.floor(neighborN / gridSize) === Math.floor(neighborNE / gridSize)) {
      result.push(neighborNE);
    }
  }
  //get southwestern neighbor, add it in if it's not out of bounds
  const neighborSW = neighborS + 1;
  if(result.indexOf(neighborS) !== -1 && drawnCircles.indexOf(neighborSW) === -1) {
    if(Math.floor(neighborS / gridSize) === Math.floor(neighborSW / gridSize)) {
      result.push(neighborSW);
    }
  }
  //get southeastern neighbor, add it in if it's not out of bounds
  const neighborSE = neighborS - 1;
  if(result.indexOf(neighborS) !== -1 && drawnCircles.indexOf(neighborSE) === -1) {
    if(Math.floor(neighborS / gridSize) === Math.floor(neighborSE / gridSize)) {
      result.push(neighborSE);
    }
  }
  return result;
}


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


