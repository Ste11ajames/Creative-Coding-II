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
var score = 0; 
var gameDuration = 60000; 
var startTime;
var gameOver = false;
let backgroundMusic;
let goodFoodSound;
let badFoodSound;

function preload() {
    soundFormats('mp3', 'ogg', 'wav');
    backgroundMusic = loadSound('sounds/background.mp3');
    goodFoodSound = loadSound('sounds/good.mp3');
    badFoodSound = loadSound('sounds/bad.mp3');

    idleStrings = loadStrings("data/idle.txt");
    runStrings = loadStrings("data/run.txt");
}

function setup() {
    createCanvas(800, 800);
    startTime = millis(); 

    setInterval(updateIndex, 50);
 let total
    for (let i = 0; i < 5; i++) {
        let type = random() > 0.5 ? "good" : "bad"; 
        let myFood = new Food(random(100, 600), random(100, 600), 25, type);
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

        if (keyIsPressed) {
            runAnimation[i].draw(); // Running animation when a key is pressed
        } else {
            animation[i].draw(); // Idle animation when no key is pressed
        }

        // Character movement
        if (keyIsPressed) {
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

            for (let k = foodArray.length - 1; k >= 0; k--) {
                if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
                    if (foodArray[k].type === "good") {
                        score++; 
                        goodFoodSound.play();
                    } else {
                        score--; 
                        badFoodSound.play();
                    }
                    foodArray.splice(k, 1);
                }
            }
            if (!gameOver) {
                if (keyIsPressed) {
                    runAnimation[i].draw();
                } else {
                    animation[i].draw();
                }
            }
            
        }
    } else {
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Game Over :D", width / 2, height / 2);
        textSize(40);
        text("Your Final Score: " + score, width / 2, height / 2 + 60);
        noLoop(); 
    }
}

function updateIndex() {
    i = (i + 1) % idleStrings.length;
}

function mousePressed() {
    if (!backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
    }
}

class Food {
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
    }

    draw() {
        fill(this.type === "good" ? [0, 255, 0] : [255, 0, 0]);
        ellipse(this.x, this.y, this.size, this.size);
    }

    move() {
        this.x += random(-2, 2);
        this.y += random(-2, 2);
    }
}











  
 