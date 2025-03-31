let myAnimation;
let boyIdle, boyRun, boyAttack;
let treeImage;
let trees = [];
let treeHealths = [];
let totalTrees = 5;
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

  for (let i = 0; i < totalTrees; i++) {
    let x = 300 + i * 100; // Adjust spacing to your liking
    let tree = createSprite(x, 300, 100, 100, 'static');
    tree.img = treeImage;
    tree.scale = 0.25;
    tree.diameter = 150;
    trees.push(tree);
    treeHealths.push(100);
  }
}


function draw() {
  background(122,212,34);

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
  
    for (let i = trees.length - 1; i >= 0; i--) {
      let tree = trees[i];
      if (tree != null) {
        let d = dist(
          myAnimation.getCurrentAnimation().position.x,
          myAnimation.getCurrentAnimation().position.y,
          tree.position.x, tree.position.y
        );
        if (d < 150) {
          createParticles(tree.position.x, tree.position.y);
          treeHealths[i] -= 1;
          if (treeHealths[i] <= 0) {
            tree.remove();
            trees.splice(i, 1);
            treeHealths.splice(i, 1);
            if (trees.length === 0) {
              win = true;
            }
          }
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
