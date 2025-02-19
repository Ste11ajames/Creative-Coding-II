class character{

    constructor(path){

        this.path = path;
        //need the image
        this.myImage = loadImage(this.path);
    }
    draw()
    {
        //draw image
image(this.myImage, 100, 100);

    }

    hasCollided(x2, y2, w2, h2) {
        

    }
}