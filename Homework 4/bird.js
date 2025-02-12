class bird
{
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
}