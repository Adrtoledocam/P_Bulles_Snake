export class FoodItem {
    constructor (x, y){
        this.x = x;
        this.y = y;
    }
    RndFoodPosition(tileCount){
        this.x = Math.floor(Math.random()*tileCount);
        this.y= Math.floor(Math.random()*tileCount);
    }
    DrawFood=(ctx, tileCount, titleSize)=>{
        ctx.fillStyle="red";
        ctx.fillRect(this.x*tileCount, this.y*tileCount, titleSize, titleSize);
    }
}