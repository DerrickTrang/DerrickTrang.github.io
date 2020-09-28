// Initialize
const canvas = document.querySelector("#gs");
const ctx = canvas.getContext("2d");
const gameStartScreen = document.querySelector('#gameStartScreen');
const gameOverScreen = document.querySelector('#gameOverScreen');
const gameOverMsg = document.querySelector('#gameOverMsg');
const gameState = {
    START: 1,
    FALLING: 2,
    MIDAIR: 3,
    GAME_OVER: 4
}
const skyMaxHeight = -15000;
const groundLevel = 0;
const xPosStart = 0;
const yPosStart = groundLevel - 350;
const gravity = 0.002;
const groundFriction = -0.01;
const jumpHeightSteps = -0.1;
const xPosBatter = -40;
const yPosBatter = groundLevel - 120;
const batterPower = 3;
const battingWindow = 100;
const fallingStateSpeed = 0.5;

var mountainPattern;
var cloudPattern;
var mountainImg = new Image();
var duckIdle = new Image();
var duckWingUp = new Image();
var duckWingDown = new Image();
var duckZoomin = new Image();
var treeImg = new Image();
var cloudImg = new Image();
var batterStartImg = new Image();
var batterSwingingImg = new Image();

var backgroundGradient = ctx.createLinearGradient(0, 0, 0, skyMaxHeight);
backgroundGradient.addColorStop(0, "deepskyblue");
backgroundGradient.addColorStop(0.2, "cornflowerblue");
backgroundGradient.addColorStop(0.5, "black");

var batSwung;
var currentGameState;
var xPos;
var yPos;
var xVelocity;
var yVelocity;
var yAcceleration;
var duckAngle;
var jumpsRemaining;

var yMultiplier;

var lastUpdateTime = new Date();

var keyPressed;
var newKeyInput;
var sessionHighScore = 0;

// Event listeners
const spacebarEventListener = (e) => {
    if(e.keyCode === 32 && !keyPressed) {
        keyPressed = true;
        if(!newKeyInput) {
            newKeyInput = true;
        }
    }
}

const backspaceEventListener = (e) => {
    if(e.keyCode === 8 && !keyPressed) {
        keyPressed = true;
        if(!newKeyInput) {
            newKeyInput = true;
        }
    }
}

const mousedownEventListener = (e) => {
    if(!keyPressed) {
        keyPressed = true;
        if(!newKeyInput) {
            newKeyInput = true;
        }
    }
}

const touchstartEventListener = (e) => {
    //e.preventDefault();
    if(!keyPressed) {
        keyPressed = true;
        if(!newKeyInput) {
            newKeyInput = true;
        }
    }
}

const getScoreFromPos = (x) => {
    return Math.round(x) / 10;
}

const updateCurrentPosition = () => {
    let currentTime = new Date();
    let dateDiff = currentTime - new Date(lastUpdateTime);

    // Calculate velocity
    xVelocity += xAcceleration * dateDiff;
    if(xVelocity <= 0) {
        xVelocity = 0;
    }
    yVelocity += yAcceleration * dateDiff;    

    // Calculate position
    xPos += xVelocity * dateDiff;
    yPos += yVelocity * yMultiplier * dateDiff;    
    if(yPos >= groundLevel) {
        yPos = groundLevel;
        yVelocity = 0;
    }

    // Calculate velocity vector angle
    if(yVelocity !== 0) {
        duckAngle = Math.atan(yVelocity * yMultiplier / xVelocity);
    }

    lastUpdateTime = currentTime;
}

const startLoop = () => {
    if(newKeyInput) {
        changeState(gameState.FALLING);
        newKeyInput = false;
    }
}

const fallingLoop = () => {
    if(yVelocity > 0) {
        yAcceleration = 0;
        yVelocity = fallingStateSpeed;        
    }

    if(yPos >= groundLevel) {
        yPos = groundLevel;
        //newKeyInput = false;
        changeState(gameState.GAME_OVER);
    } else {
        if(newKeyInput && batSwung === false) {
            batSwung = true;
            if(yPos >= (yPosBatter - battingWindow) &&
                yPos <= (yPosBatter + battingWindow)) {
                    // Determine angle between batter and duck
                    let dx = xPos - xPosBatter;
                    let dy = yPos - yPosBatter;
                    let theta = Math.atan(dy/dx);
    
                    // Calculate duck x and y velocity using angle
                    let vx = batterPower * Math.cos(theta);
                    let vy = batterPower * Math.sin(theta);
    
                    xVelocity = vx;
                    yVelocity = vy;
                    changeState(gameState.MIDAIR);
            }
            newKeyInput = false;
        }
    }
}

const midairLoop = () => {
    if(yPos >= groundLevel) {
        
        if(xVelocity <= 0) {
            sessionHighScore = Math.max(sessionHighScore, getScoreFromPos(xPos));
            changeState(gameState.GAME_OVER);
        } else {
            xAcceleration = groundFriction;
            if(keyPressed) {
                yVelocity = jumpHeightSteps * jumpsRemaining;
                jumpsRemaining -= 1; 
            }
        }        
    } else {
        xAcceleration = 0;
        if(yVelocity > 1) {
            yAcceleration = 0;
        } else {
            yAcceleration = gravity;
        }
        if(keyPressed) {
            yMultiplier = 2.2;
        } else {
            yMultiplier = 1;
        }
    }
}

const gameOverLoop = () => {
    if(newKeyInput) {
        changeState(gameState.START);
        newKeyInput = false;
    }    
}

const drawScene = () => {

    // Update canvas size (if window is resized)
    let wWidth = document.body.clientWidth;
    let wHeight = document.body.clientHeight;
    canvas.width = wWidth;
    canvas.height = wHeight;

    // Update camera position
    let cameraX = xPos - (wWidth * 2 / 5);
    let cameraY = Math.min(yPos - (wHeight / 4), groundLevel - wHeight + 200);
    ctx.translate(-cameraX, -cameraY);

    // Draw background    
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(cameraX, skyMaxHeight, wWidth, groundLevel - skyMaxHeight);    

    // Draw clouds
    ctx.beginPath();
    ctx.fillStyle = "deepskyblue";
    ctx.fillStyle = cloudPattern;
    ctx.fillRect(cameraX, -3000, wWidth, 500);
    ctx.closePath();    

    // Draw mountain
    ctx.beginPath();
    ctx.fillStyle = mountainPattern;    
    ctx.fillRect(cameraX, groundLevel - 482, wWidth, 482);
    ctx.closePath();

    // Draw ground
    ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.fillRect(cameraX, groundLevel, wWidth, 200);
    ctx.closePath();    

    // TODO - draw grass, draw stars?
    // Draw goalpost
    //if(posX >=)

    // Draw tree
    ctx.drawImage(treeImg, 0, 0, 500, 600, -435, -600, 500, 600);

    // Draw batter
    if(batSwung) {
        ctx.drawImage(batterSwingingImg, 0, 0, 200, 200, xPosBatter - 164, groundLevel - 200, 200, 200);
    } else {
        ctx.drawImage(batterStartImg, 0, 0, 200, 200, xPosBatter - 164, groundLevel - 200, 200, 200);
    }    
    
    // Draw bat hitbox
    // ctx.beginPath();
    // if(batSwung) {
    //     ctx.fillStyle = "red";
    // } else {
    //     ctx.fillStyle = "blue";
    // }
	// ctx.fillRect(xPosBatter, yPosBatter, 10, 10);
    // ctx.closePath();

    // Draw duck    
    ctx.translate(xPos, yPos);
    ctx.rotate(duckAngle);    
    if(currentGameState === gameState.MIDAIR) {        
        if(yMultiplier !== 1) {
            ctx.drawImage(duckZoomin, 0, 0, 64, 32, -64, -32, 64, 32);
        } else if(lastUpdateTime.getMilliseconds() % 100 > 50) {
            ctx.drawImage(duckWingUp, 0, 0, 64, 32, -64, -32, 64, 32);
        } else {
            ctx.drawImage(duckWingDown, 0, 0, 64, 32, -64, -32, 64, 32);
        }
    } else {
        ctx.drawImage(duckIdle, 0, 0, 64, 32, -64, -32, 64, 32);
    }

    // Draw angle indicator
    // ctx.textAlign = 'left';
    // ctx.fillStyle = "red";
    // ctx.font = "50px Verdana";
    // ctx.fillText(">", 0, 0);    
    // ctx.font = "12px Verdana";

    ctx.rotate(-duckAngle);
    ctx.translate(-xPos, -yPos);

    // Draw high score
    ctx.font = "20px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("High score: " + sessionHighScore + " m", cameraX + 20, cameraY + wHeight - 20);

    // FOR DEBUGGING
    // ctx.textAlign = 'left';
    // ctx.fillStyle = "black";
    // ctx.fillText("x position: " + xPos, xPos, yPos - 100);
     //ctx.fillText("y position: " + yPos, xPos, yPos - 90);
    // ctx.fillText("x vel: " + xVelocity, xPos, yPos - 80);
    // ctx.fillText("y vel: " + yVelocity, xPos, yPos - 70);
    // ctx.fillText("current state: " + currentGameState, xPos, yPos - 60);
    // ctx.fillText("y multiplier: " + yMultiplier, xPos, yPos - 50);
    // ctx.fillText("duck angle: " + duckAngle, xPos, yPos - 40);
}

const changeState = (newState) => {
    // Remove existing listeners
    switch(currentGameState) {
        case gameState.START:
            //document.removeEventListener("keydown", startEventListener);
            document.removeEventListener("keydown", spacebarEventListener);
            document.removeEventListener("mousedown", mousedownEventListener);
            document.removeEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.FALLING:
            //document.removeEventListener("keydown", fallingEventListener);
            document.removeEventListener("keydown", spacebarEventListener);
            document.removeEventListener("mousedown", mousedownEventListener);
            document.removeEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.MIDAIR:
            //document.removeEventListener("keydown", midairEventListener);
            document.removeEventListener("keydown", spacebarEventListener);
            document.removeEventListener("mousedown", mousedownEventListener);
            document.removeEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.GAME_OVER:
            //document.removeEventListener("keydown", gameOverEventListener);
            document.removeEventListener("keydown", backspaceEventListener);
            break;
    }

    // Add new listeners
    switch(newState) {
        case gameState.START:
            xPos = xPosStart;
            yPos = yPosStart;
            batSwung = false;
            xVelocity = 0;
            yVelocity = 0;
            xAcceleration = 0;
            yAcceleration = 0;
            duckAngle = 0;
            yMultiplier = 1;
            jumpsRemaining = 5;
            //document.addEventListener("keydown", startEventListener);
            gameOverScreen.style.display = "none";
            document.addEventListener("keydown", spacebarEventListener);
            document.addEventListener("mousedown", mousedownEventListener);
            document.addEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.FALLING:
            yVelocity = -0.5;
            yAcceleration = gravity;            
            //document.addEventListener("keydown", fallingEventListener);
            document.addEventListener("keydown", spacebarEventListener);
            document.addEventListener("mousedown", mousedownEventListener);
            document.addEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.MIDAIR:
            yAcceleration = gravity;
            //document.addEventListener("keydown", midairEventListener);
            document.addEventListener("keydown", spacebarEventListener);
            document.addEventListener("mousedown", mousedownEventListener);
            document.addEventListener("touchstart", touchstartEventListener);
            break;
        case gameState.GAME_OVER:
            xAcceleration = 0;
            yAcceleration = 0;
            xVelocity = 0;
            yVelocity = 0;

            let msg = "Game over!<br>Your hit the duck " + getScoreFromPos(xPos) + "m away.";            
            if(sessionHighScore === getScoreFromPos(xPos)) {
                msg += "<br><br>That's a new record!"
            }
            gameOverMsg.innerHTML = msg;
            gameOverScreen.style.display = "flex";
            document.addEventListener("keydown", backspaceEventListener);
            break;
    }

    newKeyInput = false;
    currentGameState = newState;
}

function loadAssets() {
    mountainImg.src = "img/quackWhacker/mountain.png";
    duckIdle.src = "img/quackWhacker/DuckIdle.png";
    duckWingUp.src = "img/quackWhacker/DuckWingUp.png";
    duckWingDown.src = "img/quackWhacker/DuckWingDown.png";
    duckZoomin.src = "img/quackWhacker/DuckZoomin.png";
    treeImg.src = "img/quackWhacker/Tree.png";
    cloudImg.src = "img/quackWhacker/Clouds.png";
    batterStartImg.src = "img/quackWhacker/BatterStart.png";
    batterSwingingImg.src = "img/quackWhacker/BatterSwinging.png";

    mountainImg.onload = () => {
        mountainPattern = ctx.createPattern(mountainImg, "repeat");
    }
    cloudImg.onload = () => {
        cloudPattern = ctx.createPattern(cloudImg, "repeat");
    }
}

function init() {
    yMultiplier = 1;
    keyPressed = false;
    newKeyInput = false;
    document.addEventListener("keyup", () => {
        keyPressed = false;
        newKeyInput = false;
    });
    document.addEventListener("mouseup", () => {
        keyPressed = false;
        newKeyInput = false;
    });
    document.addEventListener("touchend", () => {
        keyPressed = false;
        newKeyInput = false;
    });
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
    document.querySelector('#playAgain').addEventListener("click", (e) => {
        changeState(gameState.START);
    });
    gameStartScreen.addEventListener("keydown", (e) => {
        gameStartScreen.style.display = "none";        
    });
    gameStartScreen.addEventListener("click", (e) => {
        gameStartScreen.style.display = "none";
    });
    
    changeState(gameState.START);
}

const gameLoop = () => {
    updateCurrentPosition();

    switch(currentGameState) {
        case gameState.START:
            startLoop();
            break;
        case gameState.FALLING:
            fallingLoop();
            break;
        case gameState.MIDAIR:
            midairLoop();
            break;
        case gameState.GAME_OVER:
            gameOverLoop();
            break;
    }

	drawScene();
	requestAnimationFrame(gameLoop);
}

Promise.all([
    loadAssets(),
    init()
]).then(() => {
    requestAnimationFrame(gameLoop);
});