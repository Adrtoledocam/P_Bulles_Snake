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
let inMenu = true;
let inGame = false;
let inGameOver = false;
let inPause = false;
let inOptions = false;

//Menus Options Buttons
let optionsInMenu = 0
let optionsInOptions = 0

//Snake head position
let snakeHeadX = 10;
let snakeHeadY = 10;

//Snake Speed
let xspeed = 0;
let yspeed = 0;
let accelerate = 1; 
let saveSpeed  = [];
let inMove = false;
let canTouch = false;
  
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

//Button creation for Nokia
const btnNokia= document.querySelector('.NokiaButtons')
const btnUp = document.querySelector('.upArrow')
const btnDown = document.querySelector('.downArrow')
const btnLeft = document.querySelector('.leftArrow')
const btnRight = document.querySelector('.rightArrow') 
const btnStart = document.querySelector('.startBtn')
const btnB = document.querySelector('.Bbtn')

//Button creation for GameBoy
const btnGameBoy= document.querySelector('.GameBoyButtons')
const btnUpGB = document.querySelector('.upArrowGB')
const btnDownGB = document.querySelector('.downArrowGB')
const btnLeftGB = document.querySelector('.leftArrowGB')
const btnRightGB = document.querySelector('.rightArrowGB') 
const btnStartGB = document.querySelector('.startBtnGB')
const btnBGB = document.querySelector('.BbtnGB')
const btnAGB = document.querySelector('.AbtnGB')

//Button UI in game
const uiBtnStart = document.querySelector('.UiStartMenu')
const uiBtnOption = document.querySelector('.UiOptionMenu')
const uiBtnBack = document.querySelector('.UiBackMenu')

//Button UI in options general
const uiBtnRightOption = document.querySelector('.rightOption')
const uiBtnLeftOption = document.querySelector('.leftOption')

//Controllers images in little size
const imgOptionGameBoy = document.querySelector('.gameboyOption')
const imgOptionNokia = document.querySelector('.nokiaOption')

//Controllers images 
const imgBackgroundGameBoy = document.querySelector('.imgGameBoy')
const imgBackgroundNokia = document.querySelector('.imgNokia')
const textBackgroundOption = document.querySelector('.backgroundName')
let optionBackgroundNumber = 0;

//GameEngine : update, check position adn colission, and draw objects
function GameEngine(){
    //Inside the Menu
    if(!startingGame)
    {
        if (inMenu){
            Menu();
            canTouch= false
        }
        if (inOptions){
            Options();
        }        
    }
    //In game
    else{
         
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
    }
    //Rendering
    setTimeout(GameEngine, 1000/speedUpdate);
    canTouch=true;

}

//Menu's elements
function Menu()
{
    inMenu = true;
    inGame = false;
    inGameOver = false;

    //Hidde assets
    uiBtnLeftOption.style.visibility = 'hidden'
    uiBtnRightOption.style.visibility = 'hidden'
    imgOptionGameBoy.style.visibility = 'hidden'
    imgOptionNokia.style.visibility = 'hidden'
    textBackgroundOption.style.visibility = 'hidden'
    uiBtnBack.style.visibility = "hidden"

    //Show Buttons 
    uiBtnOption.style.visibility= 'visible'
        uiBtnStart.style.visibility= 'visible'
        uiBtnOption.innerHTML = "Options"
        uiBtnStart.innerHTML = "Start"
    //Message Welcome
    ctx.fillStyle = "white";
    ctx.font="25px 'Press Start 2P'";
    ctx.fillText("J-Snake", canvas.clientWidth/4+7, canvas.clientHeight/2);
    //ctx.font="13px 'Press Start 2P'";
    //ctx.fillText("Press START or Enter", canvas.clientWidth/5.5 , canvas.clientHeight/1.75)
    
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
//Options's elements
function Options(){
    uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'
        uiBtnBack.style.visibility = "visible"

    uiBtnLeftOption.style.visibility = 'visible'
    uiBtnRightOption.style.visibility = 'visible'
    imgOptionGameBoy.style.visibility = 'visible'
    textBackgroundOption.style.visibility = 'visible'
    ctx.fillStyle = "white";
    ctx.font="17px 'Press Start 2P'";
    ctx.fillText("Select Your Background", 15, canvas.clientHeight/4);

    if (optionBackgroundNumber == 0){
        imgOptionGameBoy.style.visibility = 'hidden'
        imgOptionNokia.style.visibility = 'hidden'
        textBackgroundOption.innerHTML = "None"
        textBackgroundOption.style.left="48.5%"
        imgBackgroundGameBoy.style.visibility = 'hidden'
        imgBackgroundNokia.style.visibility = 'hidden'

        btnNokia.style.visibility = "hidden"
    btnGameBoy.style.visibility = "hidden"
        
    }
    else if(optionBackgroundNumber == 1){
        imgOptionGameBoy.style.visibility = 'visible'
        imgOptionNokia.style.visibility = 'hidden'
        textBackgroundOption.innerHTML = "GameBoy"
        textBackgroundOption.style.left="47.25%"
        gameboyMode();
    }
    else if (optionBackgroundNumber == 2){
        imgOptionGameBoy.style.visibility = 'hidden'
        imgOptionNokia.style.visibility = 'visible'
        textBackgroundOption.innerHTML = "Nokia"
        textBackgroundOption.style.left="48%"
        nokiaMode();
    }
    else{}

}

//GameboyMode elements
function gameboyMode (){
    imgBackgroundNokia.style.visibility = "hidden"

    imgBackgroundGameBoy.style.visibility = "visible";
    imgBackgroundGameBoy.style.position = "absolute";
    imgBackgroundGameBoy.style.width = "75%";
    imgBackgroundGameBoy.style.top = "-0.75%";

    btnNokia.style.visibility = "hidden"
    btnGameBoy.style.visibility = "visible"

}
//NokiaMode elements
function nokiaMode(){
 
    imgBackgroundNokia.style.visibility = "visible"
    imgBackgroundGameBoy.style.visibility = "hidden"
    btnNokia.style.visibility = "visible"
    btnGameBoy.style.visibility = "hidden"

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
        uiBtnStart.style.visibility = "visible"
        uiBtnStart.innerHTML = "Play Again"
        uiBtnOption.style.visibility = "visible"
        uiBtnOption.innerHTML = "Menu"
    }
    return gameOver;
}
//Mode Pause elements
function pauseMode(){
    //clearScreen();
    saveSpeed[0]=xspeed
    saveSpeed[1]=yspeed
    xspeed = 0;
    yspeed = 0;
    inMove = false;
    canTouch= false

}

//Movement controllers function
function movement (direction){
    //Up
    inMove = true;
    if(canTouch && !inPause){
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
    //Left
    else if(direction==2){
        if(xspeed==1)
        return;
        xspeed = -1;
        yspeed = 0;
    }
    //Right
    else {
        if(xspeed==-1)
        return;
        xspeed = 1;
        yspeed = 0;
    }
    canTouch = false;
}
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

//Change buttons and colors
function changeButtonMenu(){
    if(optionsInMenu==0 ){
        optionsInMenu = 1;
        uiBtnOption.style.borderColor = "greenyellow"
        uiBtnOption.style.color = "greenyellow"
        uiBtnStart.style.color = "black"
        uiBtnStart.style.borderColor = "black"

    }
    else{
        optionsInMenu = 0;
        uiBtnStart.style.borderColor = "greenyellow"
        uiBtnStart.style.color = "greenyellow"
        uiBtnOption.style.color = "black"

        uiBtnOption.style.borderColor = "black"


    }
}

//Action to button or key function to change the menu 
function gameEnterBtn (){
    if (inMenu){
        clearScreen();
       
        if(optionsInMenu ==0){
            startingGame = true;
        }
        else{
            inOptions = true;
        inMenu =false;
        gameEnterBtn();
        }
        uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'
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
        if(optionsInMenu==1){
            clearScreen();
        inMenu= true;
        inGameOver = false;
        GameEngine();
        }
        else{
            clearScreen();
            Menu();
            clearScreen();
            uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'

        inGameOver = false;
            startingGame = true;
            GameEngine();
        }
    }
    if(inOptions){
        clearScreen();
        uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'
    }
}


//Clear the board game
function clearScreen(){
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,canvas.clientWidth+20, canvas.clientHeight+20);
}
//Display snake and his tail
function drawSnake(){
    if (inPause){        
        ctx.fillStyle="orange";
        
        snakeTail.forEach(function(SnakeTailPart, i){
            ctx.fillRect(SnakeTailPart = snakeTail[i].x *tileCount, SnakeTailPart = snakeTail[i].y*tileCount, titleSize, titleSize)

        })
        if (snakeTail.length>tailLength){
            snakeTail.pop();
        }
        ctx.fillStyle = "white";
        ctx.font="40px 'Press Start 2P'";
        ctx.fillText("Pause",canvas.clientWidth/4, canvas.clientHeight/2 );

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

//Input controls key function
document.body.addEventListener('keydown', keyDown);
function keyDown(event)
{
    if(!inPause && canTouch){
        //Up with arrow or W
        if(event.keyCode==38 || event.keyCode==87 ){
            movement(0)
        }
    //Down with arrow or S
        if(event.keyCode==40 || event.keyCode==83){
            movement(1)
        }
    //Left with arrow or A
        if(event.keyCode==37 || event.keyCode==65){
            if(!inOptions){movement(2)}
            else{
                optionBackgroundNumber--;
                uiBtnLeftOption.style.borderColor = "greenyellow"
                uiBtnLeftOption.style.color = "greenyellow"
        uiBtnRightOption.style.color = "black"
        uiBtnRightOption.style.borderColor = "black"
    if(optionBackgroundNumber <0){
        optionBackgroundNumber = 2;
    }
            }
        }
    //Right with arrow or D
        if(event.keyCode==39|| event.keyCode==68){
            if(!inOptions){movement(3)}
            else
            {
                optionBackgroundNumber++;
                uiBtnRightOption.style.borderColor = "greenyellow"
                uiBtnRightOption.style.color = "greenyellow"
                uiBtnLeftOption.style.color = "black"
                uiBtnLeftOption.style.borderColor = "black"

                if(optionBackgroundNumber >2){
                optionBackgroundNumber = 0;
                }


             }
        }
    }
    //Enter o Space key
   if (event.keyCode==32 ||event.keyCode==13 ){
    if(!inOptions){gameEnterBtn();}
    else{ inOptions = false;
        inMenu = true;
        clearScreen();}
   }
   //ChangeDeMenu
   if(inMenu){
    if(event.keyCode==38 || event.keyCode==87 ){
        changeButtonMenu()
    }
    if(event.keyCode==40 || event.keyCode==83){
        changeButtonMenu()
    }    
   }
   else if(inGameOver){
    if(event.keyCode==38 || event.keyCode==87 ){
        changeButtonMenu()
    }
    if(event.keyCode==40 || event.keyCode==83){
        changeButtonMenu()
    }
   }
}

//Button Actions
uiBtnLeftOption.addEventListener('click', function(){
    optionBackgroundNumber--;
    if(optionBackgroundNumber <0){
        optionBackgroundNumber = 2;
    }
})
uiBtnRightOption.addEventListener('click', function(){
    optionBackgroundNumber++;
    if(optionBackgroundNumber >2){
        optionBackgroundNumber = 0;
    }
})

btnUp.addEventListener('click', function(){
    if (inGame){
        movement(0)}
    else if (inMenu ||inGameOver){
        changeButtonMenu()
    }
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

    if(inMenu){gameEnterBtn()}
    else if(inOptions){inOptions = false;
        inMenu = true;
        clearScreen();}
        else if (inGameOver){
            gameEnterBtn()
        }
        else{
            gameEnterBtn();

        }

})

btnUpGB.addEventListener('click', function(){
    if (inGame){
        movement(0)}
    else if (inMenu ||inGameOver){
        changeButtonMenu()
    }
    
})
btnDownGB.addEventListener('click', function(){
    if (inGame){
        movement(1)}
    else if (inMenu ||inGameOver){
        changeButtonMenu()
    }
})
btnLeftGB.addEventListener('click', function(){
    movement(2)

})
btnRightGB.addEventListener('click', function(){
    movement(3)

})
btnStartGB.addEventListener('click', function(){
    gameEnterBtn();

})

uiBtnStart.addEventListener('click', function(){       
    optionsInMenu = 0;
    gameEnterBtn();    
})

uiBtnOption.addEventListener('click', function(){
    optionsInMenu = 1;
    gameEnterBtn();

})
uiBtnBack.addEventListener('click', function(){
    inOptions = false;
    inMenu = true;
    clearScreen();
})

btnBGB.addEventListener('click', function(){
    if(inOptions){
        inOptions = false;
    inMenu = true;
    clearScreen();
    }
    
})
btnB.addEventListener('click', function(){
    if(inOptions){
        inOptions = false;
    inMenu = true;
    clearScreen();
    }
    
})
btnAGB.addEventListener('click', function(){
    if(inMenu){gameEnterBtn()}
    else if(inOptions){inOptions = false;
        inMenu = true;
        clearScreen();}
        else if (inGameOver){
            gameEnterBtn()
        }
})



//GAME//
GameEngine();
