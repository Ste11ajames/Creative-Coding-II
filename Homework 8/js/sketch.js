var boyIdle = [];
var myAnimation;
var myWalkAnimation;
var boyRun =[];


function preload()
{
    boyIdle = loadAnimation('images/idle01.png', 'images/idle15.png');
    boyRun =  loadAnimation('images/Run01.png', 'images/Run15.png');
}

function setup()
{
    createCanvas(800, 800);
    myAnimation = new animationImage( 0, 0, 150, 150);
    myAnimation.loadAnimation('idle', boyIdle);
    myAnimation.loadAnimation('run', boyRun);
}

function draw() 
{

    background(120);
   
        if(kb.pressing('d'))
        {
            myAnimation.updatePosition('forward');
            myAnimation.drawAnimation('run');
            
        }
        else if(kb.pressing('a'))
        {
            myAnimation.updatePosition('reverse');
            myAnimation.drawAnimation('run');
            
        }
        else
        {
            myAnimation.drawAnimation('idle');
        }   
}

