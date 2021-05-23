var sea
var underwater
var fish
var octopus
var shark
var hook
var count  = 0 
var gameState = "start"
var endImg, end;
function preload () {
  backgroundImg = loadImage ("fisherman.jpg");
  underwaterImg = loadImage ("underwater.jpg");
  fishImg = loadImage ("fish.png");
  octopusImg = loadImage ("octupus.png");
  sharkImg = loadImage ("shark.png");
  hookImg = loadImage ("hook.png");
  endImg = loadImage ("ending.jpg");
}



function setup() {
  createCanvas(800,600);
  sea = createSprite (400,300);
  sea.addImage (backgroundImg);
  sea.scale = 2;

  underwater = createSprite (400,300);
  underwater.addImage (underwaterImg);
  underwater.scale = 3;
  underwater.visible = false; 

  end = createSprite (400,300);
  end.addImage (endImg);
  end.scale = 4;
  end.visible = false;

  hook = createSprite (400,50);
  //hook.debug = true
  hook.setCollider("rectangle",0,80,80,80);
  hook.addImage (hookImg) ; 
  hook.visible = false;
  hook.scale = 0.3;

  fishgroup = new Group ();
  octopusgroup = new Group ();
  sharkgroup = new Group (); 
}

function draw() {
  background("black"); 
  drawSprites();
 
  if (gameState === "start"){
    textSize(30);
    fill("black")
    text("Catch fish by using up and down arrow keys",50,60);
    text("Press space bar to start game",50,95);  
  }

  if (keyDown ("space")) {
  gameState = "play";
}
if (gameState === "play"){
 underwater.visible = true;
 underwater.velocityX = 1;
 line (400,0,hook.x,hook.y);
 textSize(30);
 text("Score: "+ count, 550, 100);
 if(underwater.x>800){
   underwater.x=underwater.width/2;
 }
 hook.visible = true;
 if (keyDown ("down")) {
   hook.y = hook.y + 3
 }
 if (keyDown ("up")) {
   hook.y = hook.y -3
 }
 for(var i = 0; i < fishgroup.length;i++){ 
 if (fishgroup.get(i).isTouching(hook)){
fishgroup.get(i).destroy()
count = count+5
 }
}
if (count >= 10 ){
  gameState = "end";
}
 spawnFish();
 spawnOctopus();
 spawnShark();
}

if (gameState === "end") {
end.visible = true;
hook.visible = false;
fishgroup.destroyEach();
octopusgroup.destroyEach();
sharkgroup.destroyEach();

textSize (30);
fill("black");
text ("Game over. Raise awarness and" ,40,60);
text ("dont harm sea creatures lifes." ,40,90);
}
}

function spawnFish() {
  if (frameCount % 120 === 0) {
    fish = createSprite(800,320,40,10);
    fish.addImage (fishImg);
    fish.scale = 0.15
    fish.y = Math.round(random(200,600));
   // fish.debug = true
    fish.setCollider("circle",0,0,40);
    fish.velocityX = -3;
    fishgroup.add (fish);

  }
}

  function spawnOctopus() {
    if (frameCount % 200 === 0) {
      octopus = createSprite(800,320,40,10);
      octopus.addImage ( octopusImg);
      octopus.scale = 0.2
      octopus.y = Math.round(random(200,600));
      octopus.velocityX = -3;
      octopusgroup.add (octopus);
}
  }

function spawnShark() {
  if (frameCount % 333 === 0) {
    shark = createSprite(800,320,40,10);
    shark.addImage (sharkImg);
    shark.scale = 0.4
    shark.y = Math.round(random(200,600));
    shark.velocityX = -3;
    sharkgroup.add (shark);

  }
}