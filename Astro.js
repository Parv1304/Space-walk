class Astro
{
    constructor(x,y,width,height)
    {
        this.image1=loadImage("Astronaut.png");
        this.body=Bodies.rectangle(x,y,width,height);
        this.width=width;
        this.height=height;
        World.add(world,this.body);
    }

    display()
    {
        imageMode(CENTER);
        image(this.image1,this.body.position.x,this.body.position.y,this.width,this.height);
        image(this.image1,this.body.position.x,this.body.position.y,this.width,this.height);
    }
}