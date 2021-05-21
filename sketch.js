const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg_i,rocketImg;
var rocket;

var bg

var score=0;

var gameState=0;

var astro,astronaut,astronaut_i;

var asteroid_i;

var obstaclesGroup;

var obstacle;

function preload()
{
  bg_i=loadImage("Space.jpg");
  rocketImg=loadImage("Rocket.png");
  asteroid_i=loadImage("Asteroid.png");
  astronaut_i=loadImage("Astronaut.png");
}

function setup() {
  createCanvas(500,800);
  engine = Engine.create();
  world = engine.world;
  ground=new Ground(250,750,500,10);
  Astronaut=new Astro(350,620.5,120,259);
  rocket=createSprite(150,620.5,150,259);
  rocket.addImage(rocketImg);
  rope=new Rope(Astronaut.body,{x:350,y:500.5});
  astronaut=createSprite(350,620.5,120,259);
  astronaut.addImage(astronaut_i);
  obstaclesGroup = new Group();
}

function draw() {
  background(bg_i);
  Engine.update(engine);
  ground.display();
  Astronaut.display();
  astronaut.x=Astronaut.body.position.x;
  astronaut.y=Astronaut.body.position.y;
  if(Astronaut.body.position.y<0)
  {
    rocket.visibility=false;
  }
  rope.display();

  if(gameState===0)
  {
    fill("white");
    textSize(15);
    text("Press space to boost and left and right arrow keys to dodge asteroids",1,200);
    camera.position.x=Astronaut.body.position.x;
    camera.position.y=Astronaut.body.position.y;
  }

  if(gameState===1)
  {
    score = score + Math.round(getFrameRate()/60);
    camera.position.x=Astronaut.body.position.x;
    camera.position.y=Astronaut.body.position.y;
    spawnObstacles();
    if(astronaut.isTouching(obstaclesGroup))
    {
      gameState=2;
      console.log("hi");
    }
    if(keyDown("LEFT_ARROW"))
    {
      Astronaut.body.position.x-=3;
    }
    if(keyDown("RIGHT_ARROW"))
    {
      Astronaut.body.position.x+=3;
    }
  }

  if(gameState===2)
  {
    obstaclesGroup.destroyEach();
    textSize(20);
    fill("white");
    text("Game Over",astronaut.x,astronaut.y+50);
    text("Press r to restart",astronaut.x,astronaut.y);
    console.log("hi");
    if(keyCode===114||keyCode===82)
    {
      Astronaut.body.position.x=350;
      Astronaut.body.position.y=620.5;
      score=0;
      rope.attach(Astronaut.body);
      gameState=0;
      camera.position.x=Astronaut.body.position.x;
      camera.position.y=Astronaut.body.position.y;
    }
  }

  if(keyCode===32)
  {
    Matter.Body.applyForce(Astronaut.body, {x:Astronaut.body.position.x, y:Astronaut.body.position.y},{x:00,y:-0.09});
    camera.position.x=Astronaut.body.position.x;
    camera.position.y=Astronaut.body.position.y;
  }
  drawSprites();
  textSize(15);
  fill("black");
  textStyle("bold");
  strokeWeight(0);
  stroke("white");
  text("Score:"+score,astronaut.x-35,astronaut.y+20);
}

function mouseDragged(){
  Matter.Body.setPosition(Astronaut.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
  rope.fly();
  gameState=1;
}

function spawnObstacles()
{
  if(frameCount % 100 === 0) 
  {
    var x
    var i=Math.random(1,2);
    x=Astronaut.body.position.x;
    var y=Astronaut.body.position.y-400;
    obstacle = createSprite(x,y,10,40);
    obstacle.velocityY =(6 + 3*score/100);
    obstacle.addImage(asteroid_i);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function colliding(bodyA,bodyB)
{
  if(((bodyA.x-bodyB.body.position.x<bodyA.width/2+bodyB.body.width/2)&&
  (bodyB.body.position.x-bodyA.x<bodyA.width/2+bodyB.body.width/2))&&
  ((bodyA.y-bodyB.body.position.y<bodyA.height/2+bodyB.body.height/2)&&
  (bodyB.body.position.y-bodyA.y<bodyA.height/2+bodyB.body.height/2)))
  {
    return true;
  }
  else
  {
    return false;
  }
}