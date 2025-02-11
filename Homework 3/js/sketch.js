let fonts = ["Georgia", "Courier New", "Times New Roman", "Verdana", "Arial"];
let chosenFont; 

let circleX, circleY; 
let lastMoveTime = 0; 
let moveInterval = 2000; //how often circle moves

function setup() {
  createCanvas(800, 800);
  noStroke();

  chosenFont = random(fonts); //random font on refresh

  // starting point for random circle
  circleX = random(width);
  circleY = random(height);
}

function draw() {
  background(200, 60, 16);

  // Draw the bagel
  drawBagel(width / 2, height / 2, 200, 80);

  //  moving circle
  updateCircle();
  drawCircle();

  // Draw text with the chosen random font
  fill(25,444,55);
  textSize(20);
  textFont(chosenFont);
  text("Homework 3", 10, 30); // Top left

  textSize(25);
  text("Stella S.", width - 140, height - 10); // Bottom right
}


function updateCircle() {
  if (millis() - lastMoveTime > moveInterval) {
    circleX = random(width); // Moves circle to random position
    circleY = random(height);
    lastMoveTime = millis(); // Reset the timer
  }
}

// moving circle
function drawCircle() {
  fill(55, 55, 66); 
  ellipse(circleX, circleY, 62, 62);
}

function drawBagel(x, y, outerDiameter, innerDiameter) {
  fill(237, 192, 121);
  ellipse(x, y, outerDiameter);

  fill(255);
  ellipse(x, y, innerDiameter);

  drawSeeds(x, y, outerDiameter, innerDiameter);
}

function drawSeeds(x, y, outerDiameter, innerDiameter) {
  fill(10, 10, 10);
  let seedCount = 50;

  for (let i = 0; i < seedCount; i++) {
    let angle = random(TWO_PI);
    let radius = random(innerDiameter / 2, outerDiameter / 2);
    let seedX = x + radius * cos(angle);
    let seedY = y + radius * sin(angle);

    push();
    translate(seedX, seedY);
    rotate(angle);
    ellipse(0, 0, 4, 10);
    pop();
  }
}