function setup() {
    createCanvas(400, 400);
    noStroke();
  
    // Draw the bagel
    drawBagel(width / 2, height / 2, 200, 80);
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