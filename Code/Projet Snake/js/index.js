//ETML
//Auteur : Adrian Toledo
//Date : 7.11.2023
//Description : Réalisation de Snake Game en JavaScript 


//Initialisation du canevas et de la carte 2D
const canvas = document.getElementById('game'); 
const ctx = canvas.getContext('2d');
let tileCount=20;
let titleSize=canvas.clientWidth/tileCount-2;

//Speed Update Game
let speedUpdate = 6;
let startingGame = false;

//Actual Menu
let inMenu = false;
let inGame = false;
let inGameOver = false;
let inPause = false;

//Snake head position
let snakeHeadX = 10;
let snakeHeadY = 10;

//Snake Speed
let xspeed = 0;
let yspeed = 0; 
  
//Snake tail 

let snakeTail = [];
let tailLength ;
class SnakeTailPart {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
//Food position
let foodX = Math.floor(Math.random()*tileCount);
let foodY = Math.floor(Math.random()*tileCount);

//Score
let score = 0;

//GameEngine : update, check position adn colission, and draw objects
function GameEngine(){

    if(!startingGame)
    {
        Menu();
    }
    else{
        inMenu = false;
        inGame = true;
        clearScreen();

        snakePosition();    
        checkCollision();
    
        let result = isGameOver();
        if(result){
            inGame = false
            inGameOver = true;
            startingGame = false;
            return;
        }
    
    
        drawSnake();
        drawFood();
        drawScore();


    
    }
    setTimeout(GameEngine, 1000/speedUpdate);

}

function Menu()
{
    inMenu = true;
    inGame = false;
    inGameOver = false;

    //Message Welcome
    ctx.fillStyle = "white";
    ctx.font="25px arial";
    ctx.fillText("Welcome to JSnake", canvas.clientWidth/4.5, canvas.clientHeight/2);
    ctx.font="15px arial";
    ctx.fillText("Press Enter or Space to start", canvas.clientWidth/4.5, canvas.clientHeight/1.75)
    
    //Initialization variables
    snakeTail = [];
    tailLength = 2;

    snakeHeadX = 10;
    snakeHeadY = 10;
    foodX = Math.floor(Math.random()*tileCount);
    foodY = Math.floor(Math.random()*tileCount);
    yspeed = 0;
    xspeed = 0;

    score = 0;
    

}

//Clear the board game
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function drawSnake(){
    if (inPause){
        
        ctx.fillStyle="orange";
        //Bucle for draw the snake tail
        for (let i=0; i<snakeTail.length;i++){
            ctx.fillRect(tails=snakeTail[i].x *tileCount, tails=snakeTail[i].y*tileCount, titleSize, titleSize)
        }
        //snakeTail.push(new SnakeTailPart(snakeHeadX, snakeHeadY));
        if (snakeTail.length>tailLength){
            snakeTail.shift();
        }
        

    }
    else{
        ctx.fillStyle="orange";
        //Bucle for draw the snake tail
        for (let i=0; i<snakeTail.length;i++){
            ctx.fillRect(tails=snakeTail[i].x *tileCount, tails=snakeTail[i].y*tileCount, titleSize, titleSize)
        }
        snakeTail.push(new SnakeTailPart(snakeHeadX, snakeHeadY));
        if (snakeTail.length>tailLength){
            snakeTail.shift();
        }
    }
    
    
    //Draw the snake haed
    ctx.fillStyle="green";
    ctx.fillRect(snakeHeadX*tileCount, snakeHeadY*tileCount, titleSize, titleSize);
}
//Display food 
function drawFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodX*tileCount, foodY*tileCount, titleSize, titleSize);
}

//Display Score
function drawScore(){
    ctx.fillStyle="white";
    ctx.font ="10px ariel";
    ctx.fillText("Score : " + score, canvas.clientWidth-50,10);
}

//Input controls function
document.body.addEventListener('keydown', keyDown);
function keyDown(event)
{
    if(!inPause){
        //Up with arrow or W
    if(event.keyCode==38 || event.keyCode==87){
        if(yspeed==1)
        return;
         xspeed = 0;
         yspeed = -1;
    }
    //Down with arrow or S
    if(event.keyCode==40 || event.keyCode==83){
        if(yspeed==-1)
        return;
        xspeed = 0;
        yspeed = 1;
   }
    //Left with arrow or A
    if(event.keyCode==37 || event.keyCode==65){
        if(xspeed==1)
        return;
        xspeed = -1;
        yspeed = 0;
   }
    //Right with arrow or D
    if(event.keyCode==39|| event.keyCode==68){
        if(xspeed==-1)
        return;
        xspeed = 1;
        yspeed = 0;
   }
    }
    

   if (event.keyCode==32 ||event.keyCode==13){

    if (inMenu){
        startingGame = true;
    }
    if(inGame){
        //Pause Condition
        if (!inPause){
            setTimeout(pauseMode, 1)
            inPause = true;
        }
        else{
            inPause = false;
            //speedUpdate = 6;
        }
    }
    if (inGameOver)
    {
        clearScreen();
        GameEngine();
    }
   }
}
function pauseMode(){
    clearScreen();
    xspeed = 0;
    yspeed = 0;
}
//Collision system for the food 
function checkCollision(){
    for (let i=0; i<snakeTail.length;i++){        
        if(snakeTail[i].x==foodX && snakeTail[i].y ==foodY){
            foodX = Math.floor(Math.random()*tileCount);
            foodY = Math.floor(Math.random()*tileCount);
            break;
        }
    }
    if (foodX == snakeHeadX && foodY == snakeHeadY)
    {
        foodX = Math.floor(Math.random()*tileCount);
        foodY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}

//Update snake position
function snakePosition(){
    snakeHeadX+=xspeed;
    snakeHeadY+=yspeed;
}

//GameOver system. Is active when the snake touch a wall or himself
function isGameOver(){
    let gameOver = false;

    if (yspeed ==0 && xspeed ==0){
        return false;
    }
    if (snakeHeadX<0){
        gameOver=true;
    }
    else if (snakeHeadY==tileCount){
        gameOver=true;
    }
    else if (snakeHeadX==tileCount){
        gameOver=true;
    }
    else if (snakeHeadY<0){
        gameOver=true;
    }
    //Detection if is toching himself
    for (let i=0; i<snakeTail.length;i++){
        
        if(snakeTail[i].x==snakeHeadX && snakeTail[i].y ==snakeHeadY){
            gameOver=true;
            break;
        }
    }
    //Message "Game Over"
    if (gameOver){

        ctx.fillStyle = "white";
        ctx.font="50px arial";
        ctx.fillText("Game Over !", canvas.clientWidth/5.75, canvas.clientHeight/2);
        ctx.font="15px arial";
        ctx.fillText("Press Enter or Space to play again !", canvas.clientWidth/5.75, canvas.clientHeight/1.75);

    }

    return gameOver;
}


GameEngine();
//Menu();
