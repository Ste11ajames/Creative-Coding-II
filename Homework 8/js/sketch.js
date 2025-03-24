var boy;


function preload()
{
    boy = loadAnimation('images/idle01.png', 'images/idle15.png');
}

function setup()
{
    createCanvas(800, 300);
}

function draw()
{
    background(255, 255, 255);

    animation(boy, 300, 150);
}