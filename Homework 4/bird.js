class bird
{
    constructor(path){

        this.path = path;
        //need the image
        this.myImage = loadImage(this.path)
    }
    draw()
    {
Image(myImage, 100, 100);
    }
}