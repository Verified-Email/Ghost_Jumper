var gameState = "play";

var ghost, ghostImg;
var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var invisBlock, invisBlockGroup;


function preload() {
  
  ghostImg = loadImage("ghost-standing.png")
  
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png")
  
  climberImg = loadImage("climber.png")
}


function setup() {
  
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY = 2
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  ghost.setCollider("rectangle",-20,40,100,250)
  ghost.debug = true;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisBlockGroup = new Group();
}


function draw() {
  background(0);
  
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300; 
    }

    spawnDoors();

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
  
    if (invisBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites(); 
  }
  
  
  if (gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    
  }
}



function spawnDoors() {
  
  if (frameCount%240 === 0) {
    
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10)
    climber.addImage(climberImg);
    
    invisBlock = createSprite(200,15);
    invisBlock.width = climber.width;
    invisBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisBlock.x = door.x
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisBlock.velocityY = 2;
    invisBlock.debug = true;
    climber.debug = true;
    
    door.lifetime = 400;
    climber.lifetime = 400;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisBlockGroup.add(invisBlock);
    
  }
}
