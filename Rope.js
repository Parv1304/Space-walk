class Rope
{
    constructor(bodyA,pointB)
    {
        var options={
            bodyA:bodyA,
            pointB:pointB,
            stiffness:0.04,
            length:10
        }
        this.constraint=Constraint.create(options);
        World.add(world,this.constraint);
    }
    display()
    {
        if(this.constraint.bodyA)
        {
            var posA=this.constraint.bodyA.position;
            var posB=this.constraint.pointB;
            stroke("black");
            strokeWeight(5);
            line(posA.x,posA.y,posB.x,posB.y);
        }
    }

    fly()
    {
        this.constraint.bodyA=null;
    }

    attach(body){
        this.constraint.bodyA = body;
    }
}