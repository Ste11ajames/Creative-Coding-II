
var myShape;
var myShape2;

function setup()
{

createCanvas(800,800);
myShape = new shape(100,100);
myShape2 = new shape(200,400);
}

function draw(){

background(125);
myShape.draw();
myShape2.draw();

}