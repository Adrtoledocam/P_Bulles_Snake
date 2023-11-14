//Inicializacion del canvas y en el formato 2d
const canvas = document.getElementById('game'); 
const ctx = canvas.getContext('2d');

//Division del canvas
let tileCount=20;
let titleSize=canvas.clientWidth/tileCount-2;
let snakeX = 10;
let snakeY = 10;
let snakeX2 = 11;
let snakeY2 = 11;

//Speed Update Game
let speedUpdate = 7;
//Snake Speed
let xspeed = 0;
let yspeed = 0;

//Snake tail 
const snakeTail = [];
let tailLength = 2;
class SnakeTailPart {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
//Food position
let foodX = Math.floor(Math.random()*tileCount);
let foodY = Math.floor(Math.random()*tileCount);

//Scores
let score = 0;


//Draw Functions
function drawGame(){
    snakePosition();    
    checkCollision();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    
    drawSnake();
    drawFood();
    drawScore();

    setTimeout(drawGame, 1000/speedUpdate);

}
//Clear the console
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function drawSnake(){
    ctx.fillStyle="orange";
    //Bucle for draw snake and his tail
    for (let i=0; i<snakeTail.length;i++){
        let part=snakeTail[i]
        ctx.fillRect(part.x*tileCount, part.y*tileCount, titleSize, titleSize)
    }
    snakeTail.push(new SnakeTailPart(snakeX, snakeY));
    if (snakeTail.length>tailLength){
        snakeTail.shift();
    }
    
    ctx.fillStyle="green";
    ctx.fillRect(snakeX*tileCount, snakeY*tileCount, titleSize, titleSize);
}
function drawFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodX*tileCount, foodY*tileCount, titleSize, titleSize);
}
function drawScore(){
    ctx.fillStyle="white";
    ctx.font ="10px verdena";
    ctx.fillText("Score : " + score, canvas.clientWidth-50,10);
}

//Input controls function
document.body.addEventListener('keydown', keyDown);
function keyDown(event)
{
    //Up
    if(event.keyCode==38){
        if(yspeed==1)
        return;
         xspeed = 0;
         yspeed = -1;
    }
    //Down
    if(event.keyCode==40){
        if(yspeed==-1)
        return;
        xspeed = 0;
        yspeed = 1;
   }
    //Left
    if(event.keyCode==37){
        if(xspeed==1)
        return;
        xspeed = -1;
        yspeed = 0;
   }
    //Right
    if(event.keyCode==39){
        if(xspeed==-1)
        return;
        xspeed = 1;
        yspeed = 0;
   }
}

function checkCollision(){
    if (foodX == snakeX && foodY == snakeY)
    {
        foodX = Math.floor(Math.random()*tileCount);
        foodY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}
function snakePosition(){
    snakeX+=xspeed;
    snakeY+=yspeed;
}

function isGameOver(){
    let gameOver = false;
    if (yspeed ===0 && xspeed ===0){
        return false;
    }
    if (snakeX<0){
        gameOver=true;
    }
    else if (snakeX===tileCount){
        gameOver=true;
    }
    else if (snakeY<0){
        gameOver=true;
    }
    else if (snakeY===tileCount){
        gameOver=true;
    }
    for (let i=0; i<snakeTail.length -1;i++){
        let part=snakeTail[i];
        if(part.x===snakeX && part.y ===snakeY){
            gameOver=true;
            break;
        }
        return gameOver;
    }
}
drawGame();

