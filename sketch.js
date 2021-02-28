var dog,sadDog,happyDog;
var feedBTN, addBTN;
var foodObj, foodCount = 10, lastFed;
var gameState=0;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedBTN=createButton("Feed the dog!");
  feedBTN.position(700, 95);
  feedBTN.mousePressed(feedDog);

  addBTN=createButton("Add food!");
  addBTN.position(800,95);

  addBTN.mousePressed(addFood);

  foodObj=new Food(720, 220, 70, 70);
}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.display();

  if (gameState==1) {
    fill("white");
    textSize(25);
    text("You're out of food! :( Click the 'Add Food!' button!", 180, 170);
  } else if (gameState==0) {
    fill(rgb(46, 139, 87));
    textSize(25);
    text("You're out of food! :( Click the 'Add Food!' button!", 180, 300);
  }
  // fill(255,255,254);
  // textSize(15);
  // if (lastFed>=12) {
  //   text("Last Fed: "+lastFed%12+" PM", 350, 30);
  // } else if(lastFed == 0) {
  //   text("Last Fed: 12 AM", 350, 30);
  // } else {
  //   text("Last Fed: "+lastFed+" AM", 350, 30);
  // }
}

//function to read food Stock

//function to update food stock and last fed time
function feedDog() {

  if (foodCount>=1) {
    dog.addImage(happyDog);

    if (foodObj.getFoodCount() < 1) {
      foodObj.updateFoodCount(foodObj.getFoodCount()*0);
    } else {
      foodObj.updateFoodCount(foodObj.getFoodCount()-1);
    }

    //  var lastFed = hour;
    // fedTime=database.ref('FeedTime');
    // fedTime.on("value", function(data){
    //   lastFed=data.val();
    // })

    foodObj.deductFood();
    foodObj.updateFoodCount();
    gameState=0;

  } else {
    dog.addImage(sadDog);
    gameState=1;
    foodObj.getfoodCount=0;
    foodObj.updateFoodCount();
  }
}

//function to add food in stock
function addFood() {
  foodCount++;
  database.ref("/").update({
    foodCount:foodCount
  });
  gameState=0;
}