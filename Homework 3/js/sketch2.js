//image variable
var borzoi;
var borzoiX = 100;
var borzoiY = 100;
var borzoiSpeed = 2;


function preload() {
  borzoi = loadImage('images/borzoi.png')
}

function setup() {
  createCanvas(800, 800);
  noStroke();

  
}

function draw()
{
    background(200,60, 16);

    // Draw the bagel
  drawBagel(width / 2, height / 2, 200, 80);

  fill(255);
  textSize(20);

  image(borzoi,borzoiX, borzoiY, 200, 200)

  borzoiX += borzoiSpeed;
  if(borzoiX >= width - 200 || borzoiX  <= 0)
  {
      borzoiSpeed *= -1;
  }

 
  
  text("Homework 3", 10, 30);
// Text positioned at top left
 
  textSize(25);
  text("Stella Smith", width - 140, height - 10);
  
  //Text positioned at bottom right
}


function drawBagel(x, y, outerDiameter, innerDiameter) {
  // Bagel color
  fill(237, 192, 121);
  ellipse(x, y, outerDiameter);

  // Hole in the bagel
  fill(255);
  ellipse(x, y, innerDiameter);

  // Sprinkle seeds
  drawSeeds(x, y, outerDiameter, innerDiameter);


}

function drawSeeds(x, y, outerDiameter, innerDiameter) {
  fill(220, 180, 90);
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



