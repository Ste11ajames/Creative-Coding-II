var circleX, circleY;
var speedX, speedY;


function setup()
{
    createCanvas(800,800)
    circleX = width / 2;
    circleY = height / 2;
    rectangleXX = random(width);
    rectangleYY = random(height);
  
    // Random movement speed
    speedX = random(1, 3);
    speedY = random(1, 3);
}


function draw()
{
    background(200,50, 136);

    fill(255, 0, 0);
  ellipse(circleX, circleY, 50, 50);

  //creates random speed everytime page is restarted
  circleX += speedX;
  circleY += speedY;

  //keeps circle inside the canvas  
  if (circleX > width || circleX < 0) {
    speedX *= -1;
  }
  if (circleY > height || circleY < 0) {
    speedY *= -1;
  }


  fill(255);
  textSize(20);
  text("Coding is Scary but Fun!", 10, 30);
// Text positioned at top left
 
  textSize(25);
  text("Stella Smith", width - 140, height - 10);
  //Text positioned at bottom right
}

