
let imgTexture;
let angle = 0;

function preload() {
    imgTexture = loadImage('assets/text.jpg');
  }

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(255, 234, 179); 

  ambientLight(150);
  pointLight(255, 255, 255, 200, 200, 200);



  // Cone
  push();
  translate(-200, -200, 0);
  rotateX(angle * 0.01);
  rotateY(angle * 0.015);
  normalMaterial();
  cone(50, 120, 24, 24);
  pop();

  // Sphere
  push();
  translate(150, -200, 0);
  rotateX(angle * 0.02);
  rotateZ(angle * 0.01);
  ambientMaterial(255, 180, 200); 
  sphere(60, 30, 30);
  pop();

  // Box
  push();
  translate(-200, 150, 0);
  rotateY(angle * 0.02);
  rotateZ(angle * 0.015);
  texture(imgTexture); // my title "Stella's Homework 12" is in this image 
  box(80, 80, 80);
  pop();

  // Torus
  push();
  translate(0, 200, 0);
  rotateX(angle * 0.02);
  rotateY(angle * 0.02);
  ambientMaterial(180, 25, 112);
  torus(50, 15, 24, 16);
  pop();

  // Cylinder
  push();
  translate(200, 150, 0);
  rotateX(angle * 0.015);
  rotateZ(angle * 0.01);
  specularMaterial(50, 20, 18);
  cylinder(30, 100, 24, 1);
  pop();

  angle += 1;
}
