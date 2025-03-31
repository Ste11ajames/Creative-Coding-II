let myAnimation;
let boyIdle, boyRun, boyAttack;
let trees = [];
let treeHealth = [];
let score = 0;
let health = 5;
let win = false;
let lose = false;
const particles = [];

let treeImg;
let collectibles = [];
let badItems = [];

function preload() {
  boyIdle = loadAnimation('images/idle01.png', 'images/idle15.png');
  boyRun = loadAnimation('images/run01.png', 'images/run15.png');
  boyAttack = loadAnimation('images/attack01.png', 'images/attack15.png');
  treeImg = loadImage('images/tree.png');
}

function setup() {
  new Canvas(800, 800, 'gameArea');

  for (let i = 0; i < 5; i++) {
    let t = new Sprite(random(100, 700), random(100, 700));
    t.image = treeImg;
    t.scale = 0.2;
    t.collider = 'static';
    t.diameter = 100;
    trees.push(t);
    treeHealth.push(100);
  }

  for (let i = 0; i < 15; i++) {
    let c = new Sprite(random(100, 700), random(100, 700), 20);
    c.color = 'green';
    c.collider = 'static';
    collectibles.push(c);
  }

  for (let i = 0; i < 10; i++) {
    let b = new Sprite(random(100, 700), random(100, 700), 20);
    b.color = 'red';
    b.collider = 'static';
    badItems.push(b);
  }

  myAnimation = new animationImage(50, 50);
  myAnimation.loadAnimation('idle', boyIdle);
  myAnimation.loadAnimation('run', boyRun);
  myAnimation.loadAnimation('attack', boyAttack);
}

function draw() {
  background(120);

  if (win) {
    showMessage("Winner Winner Chicken Dinner!", "green");
    return;
  }

  if (lose) {
    showMessage("You Lose", "red");
    return;
  }
//attack
  else if (kb.pressing('x')) {
    myAnimation.drawAnimation('attack');
  
    for (let i = trees.length - 1; i >= 0; i--) {
      let tree = trees[i];
  
      if (tree != null) {
        if (dist(
          myAnimation.getCurrentAnimation().position.x,
          myAnimation.getCurrentAnimation().position.y,
          tree.position.x,
          tree.position.y
        ) < 100) {
          createParticles(tree.position.x, tree.position.y);
          treeHealth[i] -= 1;
  
          if (treeHealth[i] <= 0) {
            tree.remove();
            trees.splice(i, 1);
            treeHealth.splice(i, 1);
          }
        }
      }
    }
  }
  

  if (trees.length === 0 && !win) {
    win = true;
  }

  myAnimation.updatePosition();

  if (myAnimation.sprite.velocity.x !== 0 || myAnimation.sprite.velocity.y !== 0) {
    myAnimation.drawAnimation('run');
  } else if (!kb.pressing('x')) {
    myAnimation.drawAnimation('idle');
  }

  for (let tree of trees) {
    if (tree) myAnimation.sprite.collides(tree);
  }

  for (let i = collectibles.length - 1; i >= 0; i--) {
    if (myAnimation.sprite.collides(collectibles[i])) {
      score++;
      collectibles[i].remove();
      collectibles.splice(i, 1);
    }
  }

  for (let i = badItems.length - 1; i >= 0; i--) {
    if (myAnimation.sprite.collides(badItems[i])) {
      health--;
      badItems[i].remove();
      badItems.splice(i, 1);
    }
  }

  if (score >= 10) win = true;
  if (health <= 0) lose = true;

  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 10, 25);
  text("Health: " + health, 10, 50);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function showMessage(msg, color) {
  textSize(40);
  fill(color);
  textAlign(CENTER, CENTER);
  text(msg, width / 2, height / 2);
  noLoop();
}

function createParticles(x, y) {
  for (let i = 0; i < 5; i++) {
    let p = new Particle(x, y);
    particles.push(p);
  }
}

