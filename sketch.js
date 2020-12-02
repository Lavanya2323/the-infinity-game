var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower , towerImg

var climber , climberImg , door , doorImg;
var invisibleGround;

var climberGroup , doorGroup , invisibleGroup;

var ghost , ghostImg

function preload(){

  towerImg = loadImage("tower.png");
 doorImg = loadImage("door.png");
 climberImg = loadImage("climber.png");
 ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600);
  tower.addImage("tower" , towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost" , ghostImg);
  ghost.scale = 0.3;
  
  climberGroup = new Group();
  doorGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){

  background("black");
  
  if(gameState === PLAY){
    //reset the tower
    if(tower.y>400){
      tower.y = 300;
      }
      
     if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY+0.5;
  
    spawnObjects();
    drawSprites();
    if(ghost.isTouching (climberGroup)){
      ghost.velocityY = 0;
    }
    if(ghost.isTouching (invisibleGroup)){
      ghost.destroy();
      gameState = END;
    }
    
  }  
  
  else if(gameState === END){
          textSize (30);
          fill("yellow");
          text("Game Over!!" , 200,200);
          tower.velocityY = 0;
          invisibleGroup.destroyEach();
          climberGroup.destroyEach();
          doorGroup.destroyEach();
          
  
  }
  
    
  
  
}

function spawnObjects(){
  if(frameCount %200 === 0){
   climber = createSprite(200,10,10,10);
   climber.x = Math.round(random(100,300))
   climber.velocityY = 2;
   climber.addImage("climber" , climberImg);
   climber.lifetime = 300;
   climberGroup.add(climber);
   
   door = createSprite(200,climber.y-70,10,10);
   door.x = climber.x;
   door.velocityY = 2;
   door.addImage("door" , doorImg);
   door.lifetime = 300;
   doorGroup.add(door);
   door.depth = ghost.depth
   ghost.depth = ghost.depth+1
   
   invisibleGround = createSprite(climber.x , climber.y+20,100,5);
   invisibleGround.visible = false;
   invisibleGround.debug = true;
   invisibleGround.velocityY = 2;
   invisibleGround.lifetime = 300;
   invisibleGroup.add(invisibleGround);
   
  }
 
}