

function setup() {
  createCanvas(800, 800);
  noStroke();

}


function draw() {
  background(200, 60, 16);

  

  // Draw the bagel
  drawBagel(width / 2, height / 2, 200, 80);



  // Draw text
  fill(255);
  textSize(20);
  text("Homework 3", 10, 30); // Top left

  textSize(25);
  text("Stella Smith", width - 140, height - 10); // Bottom right
}


function drawBagel(x, y, outerDiameter, innerDiameter) {
  fill(237, 192, 121);
  ellipse(x, y, outerDiameter);

  fill(255);
  ellipse(x, y, innerDiameter);

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