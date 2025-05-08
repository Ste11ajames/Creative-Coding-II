let bird;
let birdImg;
let pipes = [];
let skyImages = [];
let currentSky = 0;
let skyChangeSpeed = 5;
let score = 0;
let gameOver = false;

function preload() {
  for (let i = 1; i <= 24; i++) {
    skyImages.push(loadImage(`assets/sky/${i}.jpg`));
  }
  birdImg = loadImage('assets/bird.png');
}

function setup() {
  createCanvas(600, 600);
  resetGame();
  imageMode(CENTER);
}

function draw() {
  image(skyImages[currentSky], width / 2, height / 2, width, height);

  if (!gameOver && frameCount % skyChangeSpeed == 0) {
    currentSky = (currentSky + 1) % skyImages.length;
  }

  bird.update();
  bird.show();

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (!gameOver && pipes[i].hits(bird)) {
      console.log("HIT!");
      gameOver = true;
      noLoop();
    }

    if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.x) {
      score++;
      pipes[i].passed = true;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  if (!gameOver && frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }

  //  score
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);

  // you lose! text
  if (gameOver) {
    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("You Lose!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key == ' ') {
    if (gameOver) {
      resetGame();
      loop(); // Restart
    } else {
      bird.up();
    }
  }
}

function resetGame() {
  bird = new Bird();
  pipes = [new Pipe()];
  score = 0;
  gameOver = false;
  currentSky = 0;
  frameCount = 0;
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
    this.size = 132;
  }

  show() {
    image(birdImg, this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 40;
    this.speed = 3;
    this.passed = false;
  }

  show() {
    fill(255, 105, 180);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x < -this.w);
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}

