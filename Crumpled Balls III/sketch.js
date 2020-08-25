var ball,ground
var left, right, bottom;
var backgroundImg;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
//const Body = Matter.Body;
		
function preload()
{
	backgroundImg = loadImage("ground.png");
	paperImg = loadImage("paper.png");
	dustbinImg = loadImage("dustbingreen.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	var options={
		restitution:0.3,
		isStatic:false,
		friction:0.5,
		density:1.2
	}

	ball = Bodies.circle(200,100,5,options);
	World.add(world, ball);

	sling = new Slingshot(ball,{x: 200 , y: 100 });
 	
	ground = Bodies.rectangle(200,670,100,50,{isStatic:true});
 	World.add(world, ground);

	bottom = Bodies.rectangle(665,610,10,10,{isStatic:true});
	World.add(world,bottom);

	right = Bodies.rectangle(520,620,10,120,{isStatic:true});
	World.add(world,right);

	left = Bodies.rectangle(680,615,10,120,{isStatic:true});
	World.add(world,left);

	Engine.run(engine);
  
}


function draw() {
  background(backgroundImg);
  
	Engine.update(engine);
	imageMode(CENTER);
	image(paperImg,ball.position.x,ball.position.y,70,70);

	rectMode(CENTER);
	rect(ground.position.x,ground.position.y,1200,20);

	imageMode(CENTER);
	image(dustbinImg,bottom.position.x,bottom.position.y,120,120);

	sling.display();
	
	drawSprites();
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		Matter.Body.applyForce(ball,ball.position,{x:2.9,y:-4});
	}
}

function mouseDragged() {
    Matter.Body.setPosition(ball,{x:mouseX,y:mouseY});
}

function mouseReleased(){
    sling.fly();
}