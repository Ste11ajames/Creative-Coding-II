class character{

    constructor(path)
    {

        this.path = path;
        this.x = x;
        this.y = y;
        this.myImage = loadImage(this.path);
        this.imageWidth = 100;
        this.imageHeight = 100;
    }
    getImage(){

        var myImage = loadImage(this.path);
        return myImage;

    }
    draw()
    {
        //draw image
image(this.myImage, this.x, this.y, 100, 100);

    }

     hasCollided(x2, y2, w2, h2) {
        return (
          this.x < x2 + w2 &&
          this.x + this.imageWidth > x2 &&
          this.y < y2 + h2 &&
          this.y + this.imageHeight > y2
        );
      }
}