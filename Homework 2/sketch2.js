//created by chatGPT

let circleX, circleY;
let squareX, squareY;
let triangleX, triangleY;
let speedX, speedY;
let triSpeedX, triSpeedY;
let squareSize = 50; // Initial square size

function setup() {
  createCanvas(600, 400);

  // Initial positions for shapes
  circleX = width / 2;
  circleY = height / 2;
  squareX = random(width);
  squareY = random(height);
  triangleX = random(width);
  triangleY = random(height);

  // Random movement speeds
  speedX = random(2, 4);
  speedY = random(2, 4);
  triSpeedX = random(1, 3);
  triSpeedY = random(1, 3);
}

function draw() {
  background(50, 100, 255); // Darker blue background

  // Title in the upper-left corner
  fill(255);
  textSize(22);
  textStyle(BOLD);
  text("Bouncing Shapes Fun", 10, 30);

  // Name in the lower-right corner
  textSize(16);
  text("By: Your Name", width - 120, height - 10);

  // Moving Circle with Color Change
  if (circleX <= 0 || circleX >= width || circleY <= 0 || circleY >= height) {
    fill(random(255), random(255), random(255)); // Change color on collision
  } else {
    fill(255, 0, 0);
  }
  ellipse(circleX, circleY, 50, 50);

  // Update circle position
  circleX += speedX;
  circleY += speedY;

  // Bounce circle off edges
  if (circleX > width || circleX < 0) {
    speedX *= -1;
  }
  if (circleY > height || circleY < 0) {
    speedY *= -1;
  }

  // Moving Square (Shrinking)
  fill(0, 255, 0);
  rect(squareX, squareY, squareSize, squareSize);

  // Shrink square slowly
  if (squareSize > 5) {
    squareSize -= 0.1;
  } else {
    squareSize = 50; // Reset size if too small
  }

  // Triangle Bouncing
  fill(255, 255, 0);
  triangle(triangleX, triangleY, triangleX + 30, triangleY + 50, triangleX - 30, triangleY + 50);

  // Move triangle
  triangleX += triSpeedX;
  triangleY += triSpeedY;

  // Bounce triangle off edges
  if (triangleX > width || triangleX < 0) {
    triSpeedX *= -1;
  }
  if (triangleY > height || triangleY < 0) {
    triSpeedY *= -1;
  }

  // Mouse Interaction: Move square when clicked
  if (mouseIsPressed) {
    squareX = mouseX;
    squareY = mouseY;
  }

  // Keyboard Interaction
  if (keyIsPressed) {
    // Stop circle when pressing "S"
    if (key === 's') {
      speedX = 0;
      speedY = 0;
    }

    // Reset all shapes when pressing "R"
    if (key === 'r') {
      resetShapes();
    }
  }
}

// Reset function to reposition all shapes randomly
function resetShapes() {
  circleX = random(width);
  circleY = random(height);
  squareX = random(width);
  squareY = random(height);
  triangleX = random(width);
  triangleY = random(height);
  squareSize = 50; // Reset square size
}