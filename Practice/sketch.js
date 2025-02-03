
var x =200
var y=200
function setup()
{
    createCanvas(800,800)
 

}



function draw()
{
    background(200);

if(keyIsPressed)
{
    if(key=="d"){
        x++

    }
    if(key=="a"){
        x--
    }
    if(key=="s"){
        y++
    }
    if(key=="w"){
        y--

    }
}


    fill(10,30,75)
    ellipse(x, y, 30, 30);
}

