let player;
let idleAnim, runAnim;
let obstacles = [];
let collectibles = [];
let badItems = [];
let score = 0;
let health = 5;

function preload() {
  idleAnim = loadAnimation();
  runAnim = loadAnimation();

  // Load idle animation frames
  for (let i = 1; i <= 15; i++) {
    idleAnim.addFrame(loadImage(`images/idle(${i}).png`));
    runAnim.addFrame(loadImage(`images/run(${i}).png`));
  }
}

function setup() {
  createCanvas(800, 400);

  // Player setup
  player = createSprite(width / 2, height / 2, 40, 40);
  player.addAnimation("idle", idleAnim);
  player.addAnimation("run", runAnim);
  player.scale = 0.5; // Scale down if images are too big

  // Create obstacles
  for (let i = 0; i < 3; i++) {
    let obs = createSprite(random(100, 700), random(100, 300), 50, 50);
    obs.shapeColor = color(150);
    obstacles.push(obs);
  }

  // Create collectible items
  for (let i = 5; i > 0; i--) {
    let item = createSprite(random(100, 700), random(100, 300), 20, 20);
    item.shapeColor = color(0, 255, 0);
    collectibles.push(item);
  }

  // Create bad items
  for (let i = 3; i > 0; i--) {
    let bad = createSprite(random(100, 700), random(100, 300), 20, 20);
    bad.shapeColor = color(255, 0, 0);
    badItems.push(bad);
  }
}

function draw() {
  background(220);

  // Reset movement
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.velocity.x = -3;
    player.changeAnimation("run");
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.velocity.x = 3;
    player.changeAnimation("run");
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.velocity.y = -3;
    player.changeAnimation("run");
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.velocity.y = 3;
    player.changeAnimation("run");
  }

  if (player.velocity.x === 0 && player.velocity.y === 0) {
    player.changeAnimation("idle");
  }

  // Prevent passing through obstacles
  for (let obs of obstacles) {
    player.collide(obs);
  }

  // Collect items
  for (let i = collectibles.length - 1; i >= 0; i--) {
    if (player.overlap(collectibles[i])) {
      collectibles[i].remove();
      collectibles.splice(i, 1);
      score++;
    }
  }

  // Collision with bad items
  for (let i = badItems.length - 1; i >= 0; i--) {
    if (player.overlap(badItems[i])) {
      badItems[i].remove();
      badItems.splice(i, 1);
      health--;
    }
  }

  // Display Score & Health
  fill(0);
  textSize(20);
  text(`Score: ${score}`, 20, 30);
  text(`Health: ${health}`, 20, 60);

  // Check Win/Loss Conditions
  if (score >= 10) {
    textSize(40);
    fill(0, 255, 0);
    text("YOU WIN!", width / 2 - 80, height / 2);
    noLoop();
  }

  if (health <= 0) {
    textSize(40);
    fill(255, 0, 0);
    text("GAME OVER!", width / 2 - 100, height / 2);
    noLoop();
  }

  drawSprites();
}


