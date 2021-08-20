class Food {

    constructor(){
        this.lastFed=null;
        this.foodStock= 0 ;
        this.image=loadImage("images/Milk.png")
    } 
    getFoodStock(){
        database.ref("Food").on("value",function(data){
           console.log("getting",this.foodStock);
            this.foodStock = data.val();
        })
    }
    updateFoodStock(food){
        database.ref("/").update({
            Food:food
        })
    } 
    deductFood(){
      
       this.foodStock--;
         database.ref("/").update({
            Food:this.foodStock
        })
    }

    bedroom(){
        image(bedroom,250,250,500,500)
    }

    garden(){
        image(garden,250,250,500,500)
    }

    washroom(){
        image(washroom,250,250,500,500)
    }
    display(){
        var x =80;
        var y =100;
        imageMode(CENTER)
        image(this.image,720,220,70,70)
        if(this.foodStock!=0){
            for(var i = 0 ; i < this.foodStock ; i++){
                if(i%10==0){
                    x=80 ;
                    y+=50;
                }
                image(this.image,x,y,50,50)
                x+=30;
            }
        }
    }
}
