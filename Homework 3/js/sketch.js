var circleX, circleY;
var speedX, speedY;


function setup()
{
    createCanvas(800,800)
    circleX = width / 5;
    circleY = height / 5;
    rectangleXX = random(width);
    rectangleYY = random(height);
  
    // Random movement speed
    speedX = random(1, 3);
    speedY = random(1, 3);

    
}


function draw()
{
    background(200,60, 16);

    

  fill(255);
  textSize(20);

  
  
  text("Coding is Scary but Fun!", 10, 30);
// Text positioned at top left
 
  textSize(25);
  text("Stella Smith", width - 140, height - 10);
  //Text positioned at bottom right
}


