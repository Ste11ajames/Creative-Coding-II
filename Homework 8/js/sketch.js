let myAnimation;
let boyIdle, boyRun;
let trees = [];
let collectibles = [];
let badItems = [];
let score = 0;
let health = 5;
let win = false;
let lose = false;

let treeImg;

function preload() {
  boyIdle = loadAnimation('images/idle01.png', 'images/idle15.png');
  boyRun = loadAnimation('images/Run01.png', 'images/Run15.png');
  treeImg = loadImage('images/tree.png');
}

function setup() {
  new Canvas(800, 800);

  //Trees
  for (let i = 0; i < 3; i++) {
    let t = new Sprite(random(100, 700), random(100, 700));
    t.image = treeImg;
    t.scale = 0.2;
    t.collider = 'static';
    t.diameter = 5; 
    trees.push(t);
    
  }

  // good
  for (let i = 0; i < 15; i++) {
    let c = new Sprite(random(100, 700), random(100, 700), 20);
    c.color = 'green';
    c.itemType = 'good';
    c.collider = 'static'; 
    collectibles.push(c);
  }

  // bad
  for (let i = 0; i < 10; i++) {
    let b = new Sprite(random(100, 700), random(100, 700), 20);
    b.color = 'red';
    b.itemType = 'bad';
    b.collider = 'static';
    badItems.push(b);
  }


  myAnimation = new animationImage(50, 50);
  myAnimation.loadAnimation('idle', boyIdle);
  myAnimation.loadAnimation('run', boyRun);
}

function draw() {
  background(120);

  if (win) {
    textSize(40);
    fill("green");
    textAlign(CENTER, CENTER);
    text("Winner!", width / 2, height / 2);
    noLoop();
    return;
  }

  if (lose) {
    textSize(40);
    fill("red");
    textAlign(CENTER, CENTER);
    text("You Lose", width / 2, height / 2);
    noLoop();
    return;
  }


  myAnimation.updatePosition();

  if (myAnimation.sprite.velocity.x !== 0 || myAnimation.sprite.velocity.y !== 0) {
    myAnimation.drawAnimation('run');
  } else {
    myAnimation.drawAnimation('idle');
  }

  for (let tree of trees) {
    myAnimation.sprite.collides(tree);
  }

//gain health
  for (let i = collectibles.length - 1; i >= 0; i--) {
    if (myAnimation.sprite.collides(collectibles[i])) {
      score++;
      collectibles[i].remove();
      collectibles.splice(i, 1);
    }
  }

//lose health
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
}
