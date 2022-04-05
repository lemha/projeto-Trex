var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var rand;
var obstaculos, obstaculos1, obstaculos2, obstaculos3, obstaculos4, obstaculos5, obstaculos6;
var Jogar = 1;
var encerrar = 0;
var score;
var grupodenuvens;
var grupodeobstaculos;
var estadoJogo = Jogar;
var gameOver, gameOverimage;
var botaoderestart, botaoderestartimage;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  obstaculos1 = loadImage("obstacle1.png")
  obstaculos2 = loadImage("obstacle2.png");
  obstaculos3 = loadImage("obstacle3.png");
  obstaculos4 = loadImage("obstacle4.png");
  obstaculos5 = loadImage("obstacle5.png");
  obstaculos6 = loadImage("obstacle6.png");
  cloudImage = loadImage("cloud.png");
  gameOverimage = loadImage("gameOver.png");
  botaoderestartimage = loadImage("restart.png");
}

function setup() {

  createCanvas(600, 200)

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  //crie sprite ground (solo)
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  ground.depth = trex.depth - 1;


  //crie um solo invisível
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();

  gameOver = createSprite(300, 50);
  gameOver.scale = 0.5;
  gameOver.addImage("gameOver", gameOverimage);
  gameOver.visible = false;

  botaoderestart = createSprite (300, 80);
  botaoderestart.scale = 0.5;
  botaoderestart.addImage("botaoderestart", botaoderestartimage);
  botaoderestart.visible = false;

  


}

function draw() {

  trex.collide(invisibleGround);
  console.log(trex.y);
  trex.debug = true
  trex.setCollider("circle",0,0,40);

  background(180);
  trex.velocityY = trex.velocityY + 0.8
  if (estadoJogo === Jogar) {
    
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    ground.velocityX = -4;
    if (keyDown("space") && trex.y >= 165) {
      trex.velocityY = -17;

    }

    trex.velocityY = trex.velocityY + 0.6

    gerarnuvens();
    obstaculo();
   
    if(grupodeobstaculos.isTouching(trex)){

      estadoJogo = encerrar;
      if (keyDown("space") && trex.y >= 140) {
      trex.velocityY = 0;
    } 

    
  
    }
  }

  drawSprites();

  if (estadoJogo === encerrar) {
    /*if (keyDown("space") && trex.y >= 140) {
      trex.velocityY = 0;
    }*/
    grupodenuvens.setVelocityXEach(0);
    grupodeobstaculos.setVelocityXEach(0);

    trex.addAnimation("colidir",trex_collided);
    trex.changeAnimation("colidir",trex_collided);
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 0;
    }

    ground.velocityX = 0;
    grupodeobstaculos.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);

    botaoderestart.visible = true;
    gameOver.visible = true;
    
    if(mousePressedOver(botaoderestart)){
      restart();

    }
    
  }
  

}

//função para gerar as nuvens

function gerarnuvens() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 190, 30, 10);
    cloud.y = Math.round(random(10, 100));
    cloud.velocityX = -3;
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.lifetime = 190;
    cloud.depth = trex.depth - 1;
    grupodenuvens.add(cloud);
  }
}

function obstaculo() {
  if (frameCount % 60 === 0) {
    obstaculos = createSprite(600, 170, 10, 30);
    obstaculos.velocityX = -4;
    var aleatorio = Math.round(random(1, 6));
    switch (aleatorio) {
      case 1: obstaculos.addImage(obstaculos1);
        break;
      case 2: obstaculos.addImage(obstaculos2);
        break;
      case 3: obstaculos.addImage(obstaculos3);
        break;
      case 4: obstaculos.addImage(obstaculos4);
        break;
      case 5: obstaculos.addImage(obstaculos5);
        break;
      case 6: obstaculos.addImage(obstaculos6);
        break;
      default: break;
    }
    obstaculos.scale = 0.5;
    obstaculos.lifetime = 190;
    grupodeobstaculos.add(obstaculos);
  }
}

function restart(){
  console.log("hello world")
  estadoJogo = Jogar;

  trex.changeAnimation("running",trex_running);
  gameOver.visible = false;
  botaoderestart.visible = false;
  
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();

}



