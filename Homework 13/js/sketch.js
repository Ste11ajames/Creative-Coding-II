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
      radius: random(200, 300),           
      angleOffset: random(TWO_PI),        
      speed: random(0.005, 0.015),       
      y: random(-100, 100)                
    });
  }
}

function draw() {
  background(255, 234, 179);
  orbitControl();

  ambientLight(150);
  pointLight(255, 255, 255, 200, 200, 200);

  // anteater 3d baby 
  push();
  rotateY(angle * 0.005);
  scale(2);
  emissiveMaterial(0, 150, 255); 
  model(numbatModel);
  pop();

  // shapes
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];

    // positions when moving
    let currentAngle = angle * s.speed + s.angleOffset;
    let x = cos(currentAngle) * s.radius;
    let z = sin(currentAngle) * s.radius;

    push();
    translate(x, s.y, z);
    

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

  // changing speeds of orbit around anteater
  shapes[a].radius = random(200, 300);
  shapes[a].y = random(-100, 100);

  shapes[b].radius = random(200, 300);
  shapes[b].y = random(-100, 100);
}



