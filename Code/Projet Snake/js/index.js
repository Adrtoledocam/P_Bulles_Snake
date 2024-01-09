//ETML
//Auteur : Adrian Toledo
//Date : 7.11.2023
//Description : Réalisation de Snake Game en JavaScript 

//Initialisation du canevas et de la carte 2D
const canvas = document.getElementById('game'); 
const ctx = canvas.getContext('2d');
const tileCount=20;
const titleSize=canvas.clientWidth/tileCount-2;

//Speed Update Game
let speedUpdate = 6;
let startingGame = false;

//Actual Menu
let inMenu = true;
let inGame = false;
let inGameOver = false;
let inPause = false;
let inOptions = false;
//let gameOver = false;


//Menus Options Buttons
let optionsInMenu = 0
let optionsInOptions = 0
let canTouch = false;
  
//Score
let score = 0;

//Button creation for Nokia
const btnUp = document.querySelector('.upArrow')
const btnDown = document.querySelector('.downArrow')
const btnLeft = document.querySelector('.leftArrow')
const btnRight = document.querySelector('.rightArrow') 
const btnStart = document.querySelector('.startBtn')
const btnB = document.querySelector('.Bbtn')

//Button creation for GameBoy
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

//BackgroundOption
let optionBackgroundNumber = 0;

//Import imageInfo
import { GameboyMode } from "./emulator.js"
import { NokiaMode } from "./emulator.js"
import { GameboyModeInOptions} from "./emulator.js"
import { NokiaModeInOptions} from "./emulator.js"
import { NoneModeInOptions} from "./emulator.js"
import { AllHiddenAssets } from "./emulator.js"
import { SnakeTailPart } from "./snakeClass.js";
import {FoodItem} from "./fruitClass.js";

//Snake & Fruit class
let snakeTailPart = new SnakeTailPart()
let fruitItem = new FoodItem()
 
// Basic Random funciton with arrow
const RndFunction = a => Math.floor(Math.random()*a)

//GameEngine : update, check position adn colission, and draw objects
let GameEngine = ()=>{
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

        snakeTailPart.SnakePosition();
        CheckCollision(fruitItem.x, fruitItem.y);
        let result = IsGameOver();

        if(result){
            inGame = false
            inGameOver = true;
            startingGame = false;
            return;
        }       
        ClearScreen(); 
        snakeTailPart.DrawSnake(inPause, ctx, tileCount, titleSize);
        fruitItem.DrawFood(ctx, tileCount, titleSize);
        DrawScore(); 

        if(inPause){
            ctx.fillStyle = "white";
            ctx.font="40px 'Press Start 2P'";
            ctx.fillText("Pause",canvas.clientWidth/4, canvas.clientHeight/2 );
        }  
    }
    //Rendering
    setTimeout(GameEngine, 1000/speedUpdate);
    canTouch=true;
}
//Menu's elements
let Menu =()=>
{
    inMenu = true;
    inGame = false;
    inGameOver = false;

    //Hidde assets
    HiddenAssets()

    //Display Buttons 
    BtnUiDisplay();

    //Message Welcome
    ctx.fillStyle = "white";
    ctx.font="25px 'Press Start 2P'";
    ctx.fillText("J-Snake", canvas.clientWidth/4+7, canvas.clientHeight/2);
    
    snakeTailPart.SnakeOrigin();
    fruitItem.RndFoodPosition(tileCount);

    //Score Value
    score = 0;    

}
//Options's elements
let Options = () =>{
    uiBtnOption.style.visibility= 'hidden'
    uiBtnStart.style.visibility= 'hidden'
    uiBtnBack.style.visibility = "visible"

    uiBtnLeftOption.style.visibility = 'visible'
    uiBtnRightOption.style.visibility = 'visible'

    ctx.fillStyle = "white";
    ctx.font="17px 'Press Start 2P'";
    ctx.fillText("Select Your Background", 15, canvas.clientHeight/4);

    if (optionBackgroundNumber == 0){

        NoneModeInOptions(); 
    }
    else if(optionBackgroundNumber == 1){
        GameboyModeInOptions()
    }
    else if (optionBackgroundNumber == 2){
        NokiaModeInOptions() 
    }
    else{
        //New Cntroller
    }
}
//GameOver system. Is active when the snake touch a wall or himself
let IsGameOver = ()=>{
    let gameOver = false;

    if (snakeTailPart.yspeed ==0 && snakeTailPart.xspeed ==0){
        return false;
    }
    if (snakeTailPart.snakeHeadX<0){
        gameOver=true;
    }
    else if (snakeTailPart.snakeHeadY==tileCount){
        gameOver=true;
    }
    else if (snakeTailPart.snakeHeadX==tileCount){
        gameOver=true;
    }
    else if (snakeTailPart.snakeHeadY<0){
        gameOver=true;
    }

    //Detection if is toching himself
    snakeTailPart.snakeTail.forEach((SnakeTailPart, i)=>{
        if(snakeTailPart.snakeTail[i].x==snakeTailPart.snakeHeadX && snakeTailPart.snakeTail[i].y ==snakeTailPart.snakeHeadY){
            gameOver = true
        }
    })

    //Message "Game Over"
    if (gameOver){
        DrawScore();
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
let PauseMode = () =>{
    canTouch= false
    snakeTailPart.SnakePauseMode();
    ctx.fillStyle = "white";
    ctx.font="40px 'Press Start 2P'";
    ctx.fillText("Pause",canvas.clientWidth/4, canvas.clientHeight/2 );

}
//Movement controllers function
let Movement = (direction)=>{
    //Up
    snakeTailPart.inMove = true;
    if(canTouch && !inPause){
    if (direction == 0){
        if(snakeTailPart.yspeed==1)
        return;
        snakeTailPart.xspeed = 0;
        snakeTailPart.yspeed = -1;
    }
    //Down
    else if(direction == 1)
    {
        if(snakeTailPart.yspeed==-1)
        return;
        snakeTailPart.xspeed = 0;
        snakeTailPart.yspeed = 1;
    }
    //Left
    else if(direction==2){
        if(snakeTailPart.xspeed==1)
        return;
        snakeTailPart.xspeed = -1;
        snakeTailPart.yspeed = 0;
    }
    //Right
    else {
        if(snakeTailPart.xspeed==-1)
        return;
        snakeTailPart.xspeed = 1;
        snakeTailPart.yspeed = 0;
    }
    canTouch = false;
}
}
//Collision system for the food 
let CheckCollision = (...positionInfo) =>{
    snakeTailPart.snakeTail.forEach((SnakeTailPart, i )=>{
        if(snakeTailPart.snakeTail[i].x==fruitItem.x && snakeTailPart.snakeTail[i].y ==fruitItem.y){
            
            fruitItem.RndFoodPosition(tileCount);
        }
        
    })
    if (fruitItem.x == snakeTailPart.snakeHeadX && fruitItem.y == snakeTailPart.snakeHeadY)
    {
        fruitItem.RndFoodPosition(tileCount);
        snakeTailPart.tailLength++;
        score++;
        positionInfo.forEach((info, e)=>{
            console.log(info)
        })
    }
    
}
//Change button's colors
let ChangeButtonMenu = () =>{
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
let GameEnterBtn = ()=>{
    if (inMenu){
        ClearScreen();
       
        if(optionsInMenu ==0){
            startingGame = true;
        }
        else{
            inOptions = true;
        inMenu =false;
        GameEnterBtn();
        }
        uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'
    }
    if(inGame){
        //Pause Condition
        if (!inPause){
            setTimeout(PauseMode, 1)
            inPause = true;
        }
        else{
            inPause = false;
            snakeTailPart.xspeed = snakeTailPart.saveSpeed[0]
            snakeTailPart.yspeed = snakeTailPart.saveSpeed[1]
            snakeTailPart.inMove = true;
        }
    }
    if (inGameOver)
    {
        if(optionsInMenu==1){
            ClearScreen();
        inMenu= true;
        inGameOver = false;
        GameEngine();
        }
        else{
            ClearScreen();
            Menu();
            ClearScreen();
            uiBtnOption.style.visibility= 'hidden'
            uiBtnStart.style.visibility= 'hidden'

        inGameOver = false;
            startingGame = true;
            GameEngine();
        }
    }
    if(inOptions){
        ClearScreen();
        uiBtnOption.style.visibility= 'hidden'
        uiBtnStart.style.visibility= 'hidden'
    }
}
//Clear the board game
let ClearScreen = ()=>{
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,canvas.clientWidth*2, canvas.clientHeight*2);
}
//Display Score
let DrawScore=()=>{
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
            Movement(0)
        }
    //Down with arrow or S
        if(event.keyCode==40 || event.keyCode==83){
            Movement(1)
        }
    //Left with arrow or A
        if(event.keyCode==37 || event.keyCode==65){
            if(!inOptions){Movement(2)}
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
            if(!inOptions){Movement(3)}
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
    if(!inOptions){GameEnterBtn();}
    else{ inOptions = false;
        inMenu = true;
        ClearScreen();}
   }
   //ChangeDeMenu
   if(inMenu){
    if(event.keyCode==38 || event.keyCode==87 ){
        ChangeButtonMenu()
    }
    if(event.keyCode==40 || event.keyCode==83){
        ChangeButtonMenu()
    }    
   }
   else if(inGameOver){
    if(event.keyCode==38 || event.keyCode==87 ){
        ChangeButtonMenu()
    }
    if(event.keyCode==40 || event.keyCode==83){
        ChangeButtonMenu()
    }
   }
}

//Button Actions
uiBtnLeftOption.addEventListener('click', ()=>{
    optionBackgroundNumber--;
    if(optionBackgroundNumber <0){
        optionBackgroundNumber = 2;
    }
})
uiBtnRightOption.addEventListener('click', ()=>{
    optionBackgroundNumber++;
    if(optionBackgroundNumber >2){
        optionBackgroundNumber = 0;
    }
})

btnUp.addEventListener('click', ()=>{
    if (inGame){
        Movement(0)}
    else if (inMenu ||inGameOver){
        ChangeButtonMenu()
    }
})
btnDown.addEventListener('click', ()=>{
    Movement(1)
})
btnLeft.addEventListener('click', ()=>{
    Movement(2)
    if(inOptions){
        optionBackgroundNumber--;
    if(optionBackgroundNumber <0){
        optionBackgroundNumber = 2;
    }
    }

})
btnRight.addEventListener('click', ()=>{
    Movement(3)
    if(inOptions){optionBackgroundNumber++;
    if(optionBackgroundNumber >2){
        optionBackgroundNumber = 0;
    }}

})
btnStart.addEventListener('click', ()=>{

    if(inMenu){GameEnterBtn()}
    else if(inOptions){inOptions = false;
        inMenu = true;
        ClearScreen();}
        else if (inGameOver){
            GameEnterBtn()
        }
        else{
            GameEnterBtn();

        }

})

btnUpGB.addEventListener('click', ()=>{
    if (inGame){
        Movement(0)}
    else if (inMenu ||inGameOver){
        ChangeButtonMenu()
    }
    
})
btnDownGB.addEventListener('click', ()=>{
    if (inGame){
        Movement(1)}
    else if (inMenu ||inGameOver){
        ChangeButtonMenu()
    }
})
btnLeftGB.addEventListener('click', ()=>{
    Movement(2)
    if(inOptions){optionBackgroundNumber--;
    if(optionBackgroundNumber <0){
        optionBackgroundNumber = 2;
    }}

})
btnRightGB.addEventListener('click', ()=>{
    Movement(3)
    if(inOptions){
        optionBackgroundNumber++;
    if(optionBackgroundNumber >2){
        optionBackgroundNumber = 0;
    }
        
    }

})
btnStartGB.addEventListener('click', ()=>{
    GameEnterBtn();

})

uiBtnStart.addEventListener('click', ()=>{       
    optionsInMenu = 0;
    GameEnterBtn();    
})

uiBtnOption.addEventListener('click', ()=>{
    optionsInMenu = 1;
    GameEnterBtn();

})
uiBtnBack.addEventListener('click', ()=>{
    inOptions = false;
    inMenu = true;
    ClearScreen();
})

btnBGB.addEventListener('click', ()=>{
    if(inOptions){
        inOptions = false;
    inMenu = true;
    ClearScreen();
    }
    
})
btnB.addEventListener('click', ()=>{
    if(inOptions){
        inOptions = false;
    inMenu = true;
    ClearScreen();
    }
    
})
btnAGB.addEventListener('click', ()=>{
    if(inMenu){GameEnterBtn()}
    else if(inOptions){inOptions = false;
        inMenu = true;
        ClearScreen();}
        else if (inGameOver){
            GameEnterBtn()
        }
})
let HiddenAssets = ()=>{
    uiBtnLeftOption.style.visibility = 'hidden'
    uiBtnRightOption.style.visibility = 'hidden'
    uiBtnBack.style.visibility = "hidden"
    AllHiddenAssets();
    
}
let BtnUiDisplay = () =>{
    uiBtnOption.style.visibility= 'visible'
    uiBtnStart.style.visibility= 'visible'
    uiBtnOption.innerHTML = "Options"
    uiBtnStart.innerHTML = "Start"
}

//GAME//
GameEngine();
