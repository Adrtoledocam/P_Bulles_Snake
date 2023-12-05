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
let accelerate = 1; 
let saveSpeed  = [];
let inMove = false;
  
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


//Button creation
const btnUp = document.querySelector('.upArrow')
const btnDown = document.querySelector('.downArrow')
const btnLeft = document.querySelector('.leftArrow')
const btnRight = document.querySelector('.rightArrow') 
const btnStart = document.querySelector('.startBtn')
const btnSelect = document.querySelector('.selectBtn')

let startPressed = false;
let selectPressed = false;
let count = 0


//GameEngine : update, check position adn colission, and draw objects
function GameEngine(){
    if(!startingGame)
    {
        Menu();
    }
    else{
         
        //clearScreen();
        /*
        inMenu = false;
        inGame = true; 

        snakePosition();    
        checkCollision();

        clearScreen();


        let result = isGameOver();

        if(result){
            inGame = false
            inGameOver = true;
            startingGame = false;
            return;
        }       
        clearScreen(); 
        drawSnake();
        drawFood();
        drawScore();    
        */

        

        inMenu = false;
        inGame = true; 

        snakePosition();    
        checkCollision();

        //clearScreen();
        let result = isGameOver();

        if(result){
            inGame = false
            inGameOver = true;
            startingGame = false;
            return;
        }       
        clearScreen(); 
        drawSnake();
        drawFood();
        drawScore();   
        //gameLoop()
    }
    setTimeout(GameEngine, 1000/speedUpdate);

}
function gameLoop(){
    if (count>4){
        clearScreen(); 

        drawSnake();
        drawFood();
        drawScore();   
        requestAnimationFrame(gameLoop)

        count = 0;
    }
    else{
        count++
    }
}

function Menu()
{
    inMenu = true;
    inGame = false;
    inGameOver = false;

    //Message Welcome
    ctx.fillStyle = "white";
    ctx.font="25px 'Press Start 2P'";
    ctx.fillText("J-Snake", canvas.clientWidth/4+7, canvas.clientHeight/2);
    ctx.font="13px 'Press Start 2P'";
    ctx.fillText("Press START or Enter", canvas.clientWidth/5.5 , canvas.clientHeight/1.75)
    
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
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

btnSelect.addEventListener('click', function(){
    startPressed = true;
    gameEnterBtn();

})

function drawSnake(){
    if (inPause){        
        ctx.fillStyle="orange";
        
        snakeTail.forEach(function(SnakeTailPart, i){
            ctx.fillRect(SnakeTailPart = snakeTail[i].x *tileCount, SnakeTailPart = snakeTail[i].y*tileCount, titleSize, titleSize)

        })
        if (snakeTail.length>tailLength){
            snakeTail.pop();
        }

    }
    else{
        ctx.fillStyle="orange";
        if(inMove){
            snakeTail.unshift(new SnakeTailPart(snakeHeadX, snakeHeadY));

            if (snakeTail.length>tailLength){
                snakeTail.pop();
            }
        }         
        snakeTail.forEach(function(SnakeTailPart, i){
            ctx.fillRect(SnakeTailPart = snakeTail[i].x *tileCount, SnakeTailPart = snakeTail[i].y*tileCount, titleSize, titleSize)
        })
    }        
    //Draw the snake haed
    ctx.fillStyle="yellow";
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
    ctx.font ="20px 'Press Start 2P'";
    ctx.fillText("Score : " + score, canvas.clientWidth-canvas.clientWidth/2-100 ,30);
}

//Input controls function
document.body.addEventListener('keydown', keyDown);
function keyDown(event)
{
    if(!inPause){
        //Up with arrow or W
    if(event.keyCode==38 || event.keyCode==87){
        movement(0)
    }
    //Down with arrow or S
    if(event.keyCode==40 || event.keyCode==83){
        movement(1)
   }
    //Left with arrow or A
    if(event.keyCode==37 || event.keyCode==65){
        movement(2)
   }
    //Right with arrow or D
    if(event.keyCode==39|| event.keyCode==68){
        movement(3)
   }
    }
    

   if (event.keyCode==32 ||event.keyCode==13 ){
    gameEnterBtn();
   }
}
function pauseMode(){
    //clearScreen();
    saveSpeed[0]=xspeed
    saveSpeed[1]=yspeed
    xspeed = 0;
    yspeed = 0;
    inMove = false;
}
//Collision system for the food 
function checkCollision(){
    snakeTail.forEach(function(SnakeTailPart, i){
        if(snakeTail[i].x==foodX && snakeTail[i].y ==foodY){
            foodX = Math.floor(Math.random()*tileCount);
            foodY = Math.floor(Math.random()*tileCount);
        }
    })
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
    snakeHeadX+= accelerate*xspeed;
    snakeHeadY+=accelerate*yspeed;
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
    snakeTail.forEach(function(SnakeTailPart, i){
        if(snakeTail[i].x==snakeHeadX && snakeTail[i].y ==snakeHeadY){
            gameOver=true;
        }
    })
    //Message "Game Over"
    if (gameOver){
        drawScore();
        ctx.fillStyle = "white";
        ctx.font="40px 'Press Start 2P'";
        ctx.fillText("Game Over!",8, canvas.clientHeight/2);
        ctx.font="11px 'Press Start 2P'";
        ctx.fillText("Press START or ENTER to play again!", 12, canvas.clientHeight/1.75);
    }
    return gameOver;
}

//Button Actions
btnUp.addEventListener('click', function(){
    movement(0)
})
btnDown.addEventListener('click', function(){
    movement(1)
})
btnLeft.addEventListener('click', function(){
    movement(2)

})
btnRight.addEventListener('click', function(){
    movement(3)

})
btnStart.addEventListener('click', function(){
    startPressed = true;
    gameEnterBtn();

})
btnSelect.addEventListener('click', function(){
    startPressed = true;
    gameEnterBtn();

})

function gameEnterBtn (){
    if (inMenu){
        clearScreen();
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
            xspeed = saveSpeed[0]
            yspeed = saveSpeed[1]
            inMove = true;
            //speedUpdate = 6;
        }

    }
    if (inGameOver)
    {
        clearScreen();
        GameEngine();

    }
}


function movement (direction){
    //Up
    inMove = true;
    if (direction == 0){
        if(yspeed==1)
        return;
        xspeed = 0;
        yspeed = -1;
    }
    //Down
    else if(direction == 1)
    {
        if(yspeed==-1)
        return;
        xspeed = 0;
        yspeed = 1;
    }
    else if(direction==2){
        if(xspeed==1)
        return;
        xspeed = -1;
        yspeed = 0;
    }
    else {
        if(xspeed==-1)
        return;
        xspeed = 1;
        yspeed = 0;
    }

}

GameEngine();
//Menu();
