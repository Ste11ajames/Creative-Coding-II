let bird;
let birdImg;
let pipes = [];
let skyImages = [];
let currentSky = 0;
let skyChangeSpeed = 5;

function preload() {
  for (let i = 1; i <= 24; i++) {
    skyImages.push(loadImage(`assets/sky/${i}.jpg`));
  }
  birdImg = loadImage('assets/bird.png'); 
}

function setup() {
  createCanvas(600, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  imageMode(CENTER); 
}

function draw() {
  image(skyImages[currentSky], width/2, height/2, width, height);
  
  if (frameCount % skyChangeSpeed == 0) {
    currentSky = (currentSky + 1) % skyImages.length;
  }
  
  bird.update();
  bird.show();
  
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    
    if (pipes[i].hits(bird)) {
      console.log("HIT!");
      noLoop(); 
    }
    
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  
  if (frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
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

