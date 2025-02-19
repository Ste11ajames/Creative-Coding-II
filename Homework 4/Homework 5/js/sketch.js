var myCharacter;
var myFood;
var x=100;
var y=100;
var foodArray =[];
var foodfound = false;
function preload(){

    myCharacter = new character("images/Jump (" + i +").png"); 
    // i + is the concatenation - adding number to string - adding strings together
    //place png images here
    animation.push(myCharacter);
    
}


function setup()
{
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
}

function draw()
{

    background(120);
    //image(animation[i], 100,100);
    console.log(animation.length);
    animation[i].draw();
    //myBird.draw();
}

function updateIndex()
{
    i++;
    if(i > 13)
    {
        i = 0;
    }
    
}