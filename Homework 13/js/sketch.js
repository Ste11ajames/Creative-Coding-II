let imgTexture;
let angle = 0;
let shapes = [];
let numbatModel;

function preload() {
  imgTexture = loadImage('assets/text.jpg');
  numbatModel = loadModel('assets/NUMBAT.obj', true); 
}

function setup() {
  createCanvas(800, 800, WEBGL);

  let types = ['cone', 'sphere', 'box', 'torus', 'cylinder'];
  for (let i = 0; i < types.length; i++) {
    shapes.push({
      type: types[i],
      pos: createVector(random(-200, 200), random(-200, 200), random(-200, 200)),
      speed: random(0.005, 0.015)
    });
  }
}

function draw() {
  background(255, 234, 179);

  ambientLight(150);
  pointLight(255, 255, 255, 200, 200, 200);
  orbitControl();

  // anteater
  push();
  rotateY(angle * 0.005); 
  scale(2); //make smaller
  normalMaterial(); 
  model(numbatModel);
  pop();

  // my 3d shapes
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    push();

    rotateY(angle * s.speed);
    translate(s.pos.x, s.pos.y, s.pos.z);

    switch (s.type) {
      case 'cone':
        normalMaterial();
        cone(50, 120, 24, 24);
        break;
      case 'sphere':
        ambientMaterial(255, 180, 200);
        sphere(60, 30, 30);
        break;
      case 'box':
        texture(imgTexture);
        box(80, 80, 80);
        break;
      case 'torus':
        ambientMaterial(180, 25, 112);
        torus(50, 15, 24, 16);
        break;
      case 'cylinder':
        specularMaterial(50, 20, 18);
        cylinder(30, 100, 24, 1);
        break;
    }

    pop();
  }

  angle += 1;
}

function mousePressed() {
  if (shapes.length < 2) return;

  let a = floor(random(shapes.length));
  let b;
  do {
    b = floor(random(shapes.length));
  } while (b === a);

  shapes[a].pos = createVector(random(-200, 200), random(-200, 200), random(-200, 200));
  shapes[b].pos = createVector(random(-200, 200), random(-200, 200), random(-200, 200));
}


