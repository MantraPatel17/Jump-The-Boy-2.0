//declaring the variables
var fountainImg, fountain;
var invisibleGround;
var player, playerImg;
var obstacle1, obstacle1Img;
var obstacle2, obstacle2Img;
var obstacle3, obstacle3Img;
var obstacle4, obstacle4Img;
var gameState = "play";
var score = 0;
var gameOver, gameOverImg;

function preload() {
  //loading the images
  fountainImg = loadImage("ground.webp");

  playerImg = loadAnimation("p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.jpg", "p8.jpg");

  obstacle1Img = loadImage("s1.jpg");
  obstacle2Img = loadImage("s2.jpg");
  obstacle3Img = loadImage("s3.jpg");
  obstacle4Img = loadImage("s4.jpg");

  gameOverImg = loadImage("game over.jfif");

  obstaclesGroup = new Group();
}

function setup() {
  //creating the canvas
  createCanvas(600, 300);

  //creating the fountain, invisible ground, player 
  fountain = createSprite(300, 150);
  fountain.addImage("tower", fountainImg);
  fountain.scale = 2;
  fountain.velocityX = -3;

  invisibleGround = createSprite(300, 260, 600, 20);
  invisibleGround.visible = false;

  player = createSprite(50, 230, 30, 30);
  player.addAnimation("player", playerImg);

  gameOver = createSprite(300, 150);
  gameOver.addImage("GameOver", gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;

}

function draw() {

  background("blue");

  if (gameState === "play") {

    //creating the infinite track
    if (fountain.x < 170) {
      fountain.x = 430;
    }

    //jumping the player
    if (keyDown("space") && player.y >= 220) {
      player.velocityY = -15;
    }

    //adding the gravity
    player.velocityY = player.velocityY + 0.8;
    player.collide(invisibleGround);

    //spawning the obstacles
    spawnObstacles();

    //increasing the score
    score = score + Math.round(getFrameRate() / 60);

    if (obstaclesGroup.isTouching(player)) {
      gameState = "end";
    }
  } else if (gameState === "end") {

    //displaying the game over 
    gameOver.visible = true;

    fountain.velocityX = 0;
    player.velocityY = 0

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
  }

  drawSprites();
  
  //displaying the text score
  textSize(15);
  text("Your Score: " + score, 480, 50);

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 230, 10, 40);
    obstacle.velocityX = -8;

    //generate random obstacles
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Img);
        break;
      case 2:
        obstacle.addImage(obstacle2Img);
        break;
      case 3:
        obstacle.addImage(obstacle3Img);
        break;
      case 4:
        obstacle.addImage(obstacle4Img);
        break;
      default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}