var myCharacter;
var myFood;
var x = 100;
var y = 100;
var foodArray = [];
var foodFound = false;
var animation = [];
var runAnimation = [];
var idleStrings = [];
var runStrings = [];
var flipX = false;
var i = 0;
var score = 0; //food tracking score
var gameDuration = 60000; // 60 seconds 
var startTime;
var gameOver = false;

function preload() {
    soundFormats('mp3', 'ogg', 'wav');
    idleStrings = loadStrings("data/idle.txt");
    runStrings = loadStrings("data/run.txt");
    
}

function setup() {
    createCanvas(800, 800);
    startTime = millis(); //game timer

    setInterval(updateIndex, 50);
    
   
    for (let i = 0; i < 5; i++) {
        myFood = new food(random(100, 600), random(100, 600), 25);
        foodArray.push(myFood);
    }

    
    for (let i = 0; i < idleStrings.length; i++) {
        myCharacter = new character(idleStrings[i], x, y);
        animation.push(myCharacter);

        myCharacter = new character(runStrings[i], x, y);
        runAnimation.push(myCharacter);
    }
}

function draw() {
    background(83, 195, 189);


    let elapsedTime = millis() - startTime;
    let timeLeft = max(0, (gameDuration - elapsedTime) / 1000); 

    // game info display
    fill(255);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Time Left: " + timeLeft.toFixed(1), 20, 20);
    text("Score: " + score, 20, 60);

    if (elapsedTime >= gameDuration) {
        gameOver = true;
    }

    if (!gameOver) {
       
        for (let i = 0; i < foodArray.length; i++) {
            foodArray[i].move(); 
            foodArray[i].draw();
        }

        // Character movement & animation
        if (keyIsPressed) {
            runAnimation[i].draw();
            if (key == "a") {
                x--;
                flipX = true;
            }
            if (key == "d") {
                x++;
                flipX = false;
            }
            if (key == "w") {
                y--;
            }
            if (key == "s") {
                y++;
            }

            for (let i = 0; i < idleStrings.length; i++) {
                animation[i].flipX = flipX;
                animation[i].x = x;
                animation[i].y = y;
                runAnimation[i].flipX = flipX;
                runAnimation[i].x = x;
                runAnimation[i].y = y;
            }

            // Check for food collisions
            for (let k = 0; k < foodArray.length; k++) {
                if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
                    foodArray.splice(k, 1); // Remove food
                    score++; // Increase score
                }
            }
        } else {
            animation[i].draw();
        }
    } else {
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Game Over :D", width / 2, height / 2);
        textSize(40);
        text("Your Final Score: " + score, width / 2, height / 2 + 60);
        noLoop(); // Stop the game
    }
}

function updateIndex() {
    i++;
    if (i > idleStrings.length - 1) {
        i = 0;
    }
}

// Food movement
class food {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }

    move() {
        this.x += random(-2, 2); 
        this.y += random(-2, 2);
    }
}












  
 