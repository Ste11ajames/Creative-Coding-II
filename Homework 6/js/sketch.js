var myCharacter;
var myFood;
var x=100;
var y=100;
var foodArray =[];
var foodfound = false;
var animation = [];
var runAnimation = [];
var idleStrings =[];
var runStrings =[];

var i = 0;
function preload(){

    idleStrings=loadStrings("data/idle.txt")
    runStrings=loadStrings("data/run.txt")
console.log(idleStrings.length)
   
    
   // setInterval(updateIndex, 50);
    //for(let i =0; i < 5; i++){
//place my food random
   // }
    
}


function setup()
{
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
    for (let i = 0; i < 5; i++) {
        myFood = new food(random(100, 600), random(100, 600), 25);
        foodArray.push(myFood);
    }
    for(let i = 0; i< idleStrings.length; i++)
        {
            myCharacter = new character(idleStrings[i]); 
            // i + is the concatenation - adding number to string - adding strings together
            //place png images here
            animation.push(myCharacter);
            
          
        

            myCharacter = new character(runStrings[i]); 
            runAnimation.push(myCharacter); //add run strings

        
        }
}

function draw() {

    background(120);
    console.log(animation.length);
   
 

    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw();
    }

    if (keyIsPressed) {
        runAnimation[i].draw();
        if (key == "a") {
            x--;
        }
        if (key == "d") {
            x++;
        }
        if (key == "w") {
            y--;
        }
        if (key == "s") {
            y++;
        }

        
        

        for (let i = 0; i < animation.length; i++) {
            animation[i].x = x;
            animation[i].y = y;
            runAnimation[i].x =x;
            runAnimation[i].y =y;
        }

        for (let k = 0; k < foodArray.length; k++) {
            if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
                foodArray.splice(k, 1);
                
            }
            
           
            
        }
        
        
    }
    else {
        animation[i].draw();
    }
}

function updateIndex() 
{
    i++;
    if (i > idleStrings.length - 1) {
        i = 0;
    }

}