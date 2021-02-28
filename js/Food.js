class Food {
    constructor (x,y,width,height) {
        this.image = loadImage("images/Milk.png");
        var lastFed;
    }

    getFoodCount() {
        var foodCountRef = database.ref("foodCount");
        foodCountRef.on("value", function(data) {
            foodCount = data.val();
        });
    }
    updateFoodCount() {
        database.ref("/").update({
            foodCount : foodCount
        });
    }
    deductFood() {
        foodCount -= 1;
        // food += 1;
    }

    display() {
        var x=80;
        var y=100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodCount !== 0) {
            for (var i=0; i<foodCount; i++){
                if (i%10 == 0) {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }   
    }

}