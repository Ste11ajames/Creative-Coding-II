class shape{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }
    draw(){
        circle (this.x,this.y,50);
        fill(10,40,60);
    }
}