var boy,boyimg
var bgimg,bg
var edges
var mobileimg,mobile
var laptopimg,laptop
var bookimg,Books
var r;
var paperballimg,ball
var mobileG,laptopG,BooksG,ballsG
var score = 0
var gameOver,gameOverimg
var gamestate = "play"
var boysadimg
var gameoversong


function preload(){
  bgimg = loadImage("bg1.webp")
  boyimg = loadImage("boy.png")
  mobileimg = loadImage("mobile.png")
  laptopimg = loadImage("laptop.png")
  bookimg = loadImage("book.png")
  paperballimg = loadImage("paperball.png")
  gameOverimg = loadImage("gameover.png")
boysadimg = loadImage("boysad.png")
  gameoversong = loadSound("song.wav")
}

function setup(){
createCanvas(600,600);
 bg = createSprite(300,300)
bg.addImage(bgimg)
  bg.velocityX = 2
  bg.scale = 1.1
  
  boy = createSprite(550,270)
  boy.addImage("standing",boyimg)
    boy.addImage("sad",boysadimg)        
  boy.scale = 0.4
  edges = createEdgeSprites()
  
  laptopG = createGroup()
  mobileG = createGroup()
BooksG = createGroup()
  ballsG = createGroup()
  
  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverimg)
  gameOver.scale = 3
  
  
}

function draw(){
  background("white")
  if(bg.x > 400 ){
    bg.x= 300
  }
if(gamestate === "play"){
  
  
 boy.y = World.mouseY 
   r = Math.round(random(1,3))
  if(r==1){
     spawnMobiles()
  }
  else if(r==2){
    spawnLaptops()
  }
  else{
    spawnBooks()
  }
  if(keyDown("space")){
    createingBalls()
    
  }
  if(ballsG.isTouching(mobileG)){
    ballsG.destroyEach()
    mobileG.destroyEach()
    
  }
  if(ballsG.isTouching(laptopG)){
    ballsG.destroyEach()
    laptopG.destroyEach()
  }
  if(boy.isTouching(BooksG)){
   // ballsG.destroyEach()
    BooksG.destroyEach()
    score = score+5
  }
  if(laptopG.isTouching(boy)|| mobileG.isTouching(boy)){
    gamestate = "end"
    gameoversong.play()
  }
  gameOver.visible = false
}
 else if(gamestate==="end"){
        gameOver.visible = true
   laptopG.setVelocityXEach(0)
    mobileG.setVelocityXEach(0)
   BooksG.setVelocityXEach(0)
   bg.velocityX  = 0
   boy.changeImage("sad")     
 } 
  
  
  
  //boy.collide(edges[2])
  //boy.bounceOff(bottomEdge)
 
  
  
  
  
  
  
  
  
          drawSprites()
  textSize(30)
  fill("red")
  text("Score: "+score,50,50 )
}

function spawnMobiles(){
  if(frameCount% 100 === 0){
    mobile = createSprite(0,100,10,10) 
    mobile.y = Math.round(random(50,530))
  mobile.velocityX =4
  mobile.addImage(mobileimg)
    mobile.scale = 0.3
    mobile.lifetime = 400
    mobileG.add(mobile)
  }
 }

function spawnLaptops(){
  if(frameCount% 120===0){
    
    laptop = createSprite(0,150,10,10)
    laptop.y = Math.round(random(72,550))
    laptop.velocityX = 4
    laptop.addImage(laptopimg)
    laptop.scale = 0.15
    laptop.lifetime = 400
    laptopG.add(laptop)
  }
  }
function spawnBooks(){
  if(frameCount% 150===0 ){
    Books  = createSprite(0,150,10,10)
    Books.y = Math.round(random(30,580))
    Books.velocityX = 4
    Books.addImage(bookimg)
    Books.scale = 0.2
    Books.lifetime = 400
    BooksG.add(Books)
    
}
}

function createingBalls(){
 ball = createSprite(500,100,60,10) 
 ball.addImage(paperballimg) 
  ball.y = boy.y
  ball.velocityX = -4
  ball.velocityY = Math.round(random(-3,3))
  ball.scale = 0.2 
  ball.lifetime = 400 
  ballsG.add(ball)
  return ball
  
  
}




