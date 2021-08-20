var dog, happyDog, database, foodS ,dogImg, foodStock, btnFeed, btnAddFood,fedTime, lastFed,foodObj;
var gameState ,bedroom ,garden , washroom , readingGameState ,sadDog  ;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/virtual pet images/Bed Room.png");
  garden = loadImage("images/virtual pet images/Garden.png");
  washroom = loadImage("images/virtual pet images/Wash Room.png");
  sadDog = loadImage("images/virtual pet images/Lazy.png");

}
function setup() {
	createCanvas(500, 500);

  database = firebase.database();
 
 
  foodObj= new Food();
  foodObj.getFoodStock();

  database.ref("FeedTime").on("value",function(data){
     lastFed=data.val()
  })

  database.ref("GameState").on("value",function(data){
    gameState=data.val()
 })

  dog=createSprite(250,350,20,20);
  dog.addImage("value",dogImg)
  dog.scale=0.2;
  
  btnFeed = createButton("Feed the dog")
  btnFeed.position(500,95);
  btnFeed.mousePressed(feedDog);

  btnAddFood= createButton("Add Food")
  btnAddFood.position(600,95)
  btnAddFood.mousePressed(addFoods);
}

 function feedDog(){ 
   if(foodObj.foodStock>0){
     console.log("feeding")
      foodObj.deductFood();
     database.ref("/").update({
       FeedTime:hour()
     })
   } 
}
function addFoods(){  
  
  foodObj.foodStock++;
  foodObj.updateFoodStock(foodObj.foodStock);
}

function draw() {  
  
  background(rgb(46,139,87));
 
  foodObj.display();

  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke("white")
  text("FOOD REMAINING : "+foodObj.foodStock ,120,250);
  if(lastFed>12){
    text("LAST FED : "+lastFed%12+"pm" ,350,30);

  }
  else if(lastFed==12){
    text("LAST FED : 12 noon",350,30);
  }
  else{
    text("LAST FED : "+lastFed+"am" ,350,30);
  }

  if(gameState!="hungry"){
     btnFeed.hide();
     btnAddFood.hide();
     dog.remove();
  }
  else{
    dog.addImage(sadDog);
    btnFeed.show();
    btnAddFood.show();
  }
  var currentTime =  hour();
  if(lastFed+1==currentTime){
    foodObj.garden();
    database.ref("/").update({
      GameState:"playing"
    })
  }
  else if(lastFed+2==currentTime){
    foodObj.bedroom();
    database.ref("/").update({
      GameState:"sleeping"
    })
  }
   else if(lastFed+2>=currentTime  && lastFed+4<=currentTime ){
    foodObj.washroom();
    database.ref("/").update({
      GameState:"bathing"
    })
  } 
  else{
    database.ref("/").update({
      GameState:"hungry"
    })
    foodObj.display();
  }
  



}

