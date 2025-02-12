var animation =[];
var myBird;

function preLoad(){

    myBird = new bird("+ i +"); 
    // i + is the concatenation - adding number to string - adding strings together
    //place png images here
    animation.push(myBird);
}

function setup(){
   
    createCanvas(800,800);
    setInterval(updateImdex, 50);
}

function draw(){

    backgorund(90);
    animation[i].draw

}
 function updateImdex (){

 }