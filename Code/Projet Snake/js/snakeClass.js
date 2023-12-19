
export class SnakeTailPart {
    constructor(x,y,){
        this.x=x;
        this.y=y;
    }

    // 
     snakeTail = [];
 tailLength = 2;

//Snake head position
 snakeHeadX = 10;
 snakeHeadY = 10;

//Snake Speed
 xspeed = 0;
 yspeed = 0;
 accelerate = 1; 
 saveSpeed  = [];
 inMove = false;

     //Update snake position
    SnakePosition = ()=>{
        this.snakeHeadX+= this.accelerate*this.xspeed;
        this.snakeHeadY+=this.accelerate*this.yspeed;
    }

    DrawSnake = (inPause, ctx, tileCount, titleSize)=>{
        if (inPause){        
            ctx.fillStyle="orange";
            
            this.snakeTail.forEach((SnakeTailPart, i)=>{
                ctx.fillRect(SnakeTailPart = this.snakeTail[i].x *tileCount, SnakeTailPart = this.snakeTail[i].y*tileCount, titleSize, titleSize)
    
            })
            if (this.snakeTail.length>this.tailLength){
                this.snakeTail.pop();
            }
            
        }
        else{
            ctx.fillStyle="orange";
            if(this.inMove){
                this.snakeTail.unshift(new SnakeTailPart(this.snakeHeadX, this.snakeHeadY));
                if (this.snakeTail.length>this.tailLength){
                    this.snakeTail.pop();
                }
            }         
            this.snakeTail.forEach((SnakeTailPart, i)=>{
                ctx.fillRect(SnakeTailPart = this.snakeTail[i].x *tileCount, SnakeTailPart = this.snakeTail[i].y*tileCount, titleSize, titleSize)
            })
        }        
        //Draw the snake haed
        ctx.fillStyle="yellow";
        ctx.fillRect(this.snakeHeadX*tileCount, this.snakeHeadY*tileCount, titleSize, titleSize);
    } 
    //Snake position in Pause
    SnakePauseMode = ()=> {
        this.saveSpeed[0]=this.xspeed
        this.saveSpeed[1]=this.yspeed
        this.xspeed = 0;
        this.yspeed = 0;
        this.inMove = false;
    }
    //Initialization du snake values
    SnakeOrigin = () =>{
        this.snakeTail = [];
        this.tailLength = 2;
        this.snakeHeadX = 10;
        this.snakeHeadY = 10;
        this.yspeed = 0;
        this.xspeed = 0;
    }
    
}



