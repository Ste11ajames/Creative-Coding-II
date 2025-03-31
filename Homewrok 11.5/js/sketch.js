let myAnimation;
let boyIdle, boyRun, boyAttack;
let treeImage;
let tree;
let treeHealth = 100;
let particles = [];
let win = false;

function preload() {
  boyIdle = loadAnimation('images/Idle01.png', 'images/Idle15.png');
  boyRun = loadAnimation('images/Run01.png', 'images/Run15.png');
  boyAttack = loadAnimation('images/Attack01.png', 'images/Attack15.png');
  treeImage = loadImage('images/tree.png');
}

function setup() {
  createCanvas(800, 600);
  myAnimation = new animationImage(200, 200, 150, 150);
  myAnimation.loadAnimation('idle', boyIdle);
  myAnimation.loadAnimation('walk', boyRun);
  myAnimation.loadAnimation('attack', boyAttack);

  tree = createSprite(450, 300, 100, 100, 'static');
  tree.img = treeImage;
  tree.scale = 0.25;
  tree.diameter = 150;
}

function draw() {
  background(120);

  if (win) {
    textSize(40);
    fill("green");
    textAlign(CENTER, CENTER);
    text("Winner Winner Chicken Dinner!", width / 2, height / 2);
    noLoop();
    return;
  }

  if (kb.pressing('d')) {
    myAnimation.updatePosition('forward');
    myAnimation.drawAnimation('walk');
  }
  else if (kb.pressing('a')) {
    myAnimation.updatePosition('reverse');
    myAnimation.drawAnimation('walk');
  }
  else if (kb.pressing('x')) {
    myAnimation.drawAnimation('attack');

    if (tree != null) {
      let d = dist(myAnimation.getCurrentAnimation().position.x, myAnimation.getCurrentAnimation().position.y, tree.position.x, tree.position.y);
      if (d < 150) {
        createParticles(tree.position.x, tree.position.y);
        treeHealth -= 1;
        if (treeHealth <= 0) {
          tree.remove();
          tree = null;
          win = true;
        }
      }
    }
  }
  else {
    myAnimation.drawAnimation('idle');
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}
