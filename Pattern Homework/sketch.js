//Marycruy Yong Tencio, traingle pattern, change color when key pressed
//Random colors of the shapes
let color1;
let color2;

function setup() {
  createCanvas(800, 600);
  
  // Assigning static colors to color1 and color2
  color1 = color('magenta');
  color2 = color(255, 204, 0);
}

function draw() {
  background(0);
  noStroke();
  
  if (mouseIsPressed) {
    //Random Color when mouse is pressed  
    color1 = color(random(255), random(255), random(255));
    color2 = color(random(255), random(255), random(255));
  } else {
    //If mouse is not pressed, use the static colors 
    color1 = color('magenta');
    color2 = color(255, 204, 0);
  }

  const numRows = 10; // Set number of rows
  const numCols = 10; // Set number of columns

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const x = 50 + j * 150;
      const y = 50 + i * 70;
      triangles(x, y);
    }
  } 
}

function triangles(x, y) {
  fill(color1);
  triangle(x - 45, y + 30, x - 17, y + 5, x + 11, y + 30);
  triangle(x - 45, y - 30, x - 17, y - 5, x + 11, y - 30);
  
  fill(color2);
  triangle(x + 25, y + 30, x + 25, y - 25, x + 56, y);
  triangle(x + 65, y + 5, x + 96, y - 30, x + 96, y + 30);
}


