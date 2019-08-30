/**** INIT ****/
const GRID_SIZE = 11;
for (let i=0; i < GRID_SIZE; i++) {
  for(let j=0; j < GRID_SIZE; j++) {
    document.getElementById('visual-grid').innerHTML += 
    `<div class="node" row="${j}" column="${i}" xCoordinate="${j}" yCoordinate="${i}">
      <div class="blue-circle"></div>
      <div class="red-circle"></div>
      <div class="yellow-circle"></div>
    </div>`;
  }
}
const nodes = document.querySelectorAll('.node');
renderGrid(nodes, 10, 0);

/**** HANDLE HOVER ****/
nodes.forEach(node => {
  node.addEventListener('mouseover', function(event){
    //Get row and column numbers of targeted node
    const targetNodeRow = parseInt(event.target.getAttribute('row'));
    const targetNodeColumn = parseInt(event.target.getAttribute('column'));

    //Render each node based on reference
    renderGrid(nodes, targetNodeRow, targetNodeColumn);
  });
});

/**** HELPER METHODS ****/
function renderGrid(nodes, refRow, refColumn) {
  nodes.forEach(node => {
    setCoordinates(node, refRow, refColumn);
    const modifier = getSizeModifier(node);
    renderNode(node, modifier);
  });
}

function setCoordinates(node, refRow, refColumn) {
  const currentNodeRow = parseInt(node.getAttribute("row"));
  const currentNodeColumn = parseInt(node.getAttribute("column"));
  const xCoordinate = currentNodeRow - refRow;
  const yCoordinate = currentNodeColumn - refColumn;
  node.setAttribute('xCoordinate', xCoordinate);
  node.setAttribute('yCoordinate', yCoordinate);
}

function getSizeModifier(node) {
  const xCoordinate = parseInt(node.getAttribute('xCoordinate'));
  const yCoordinate = parseInt(node.getAttribute('yCoordinate'));
  const x = (xCoordinate < 0) ? xCoordinate * -1 : xCoordinate;
  const y = (yCoordinate < 0) ? yCoordinate * -1 : yCoordinate;
  const size = (x > y) ? x+1 : y+1;
  return size;
}

function renderNode(node, modifier) {
  const size = (modifier < 2) ? 17 * modifier : 9 * modifier; 
  let position = 50 - (size / 2);
  let offset = 7.5;

  for (let i=0; i < node.children.length; i++) {
    let circle = node.children.item(i);
    circle.style.width = `${size}%`;
    circle.style.height = `${size}%`;
    if(i === 0) {
      circle.style.top = `${position - offset}%`;
      circle.style.left = `${position}%`;
    } else if (i === 1) {
      circle.style.top = `${position + offset}%`;
      circle.style.left = `${position - offset}%`;
    } else if (i === 2) {
      circle.style.top = `${position + offset}%`;
      circle.style.left = `${position + offset}%`;
    }
  }
}

