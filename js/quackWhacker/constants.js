// Constants
const canvas = document.querySelector("#gs");
const ctx = canvas.getContext("2d");
mountainImgSrc = "img/quackWhacker/mountain.png";
duckIdleSrc = "img/quackWhacker/DuckIdle.png";
duckWingUpSrc = "img/quackWhacker/DuckWingUp.png";
duckWingDownSrc = "img/quackWhacker/DuckWingDown.png";
duckZoominSrc = "img/quackWhacker/DuckZoomin.png";
eagleIdleSrc = "img/quackWhacker/EagleIdle.png";
eagleWingUpSrc = "img/quackWhacker/EagleWingUp.png";
eagleWingDownSrc = "img/quackWhacker/EagleWingDown.png";
eagleZoominSrc = "img/quackWhacker/EagleZoomin.png";
penguinIdleSrc = "img/quackWhacker/PenguinIdle.png";
penguinWingUpSrc = "img/quackWhacker/PenguinWingUp.png";
penguinWingDownSrc = "img/quackWhacker/PenguinWingDown.png";
penguinZoominSrc = "img/quackWhacker/PenguinZoomin.png";
treeImgSrc = "img/quackWhacker/Tree.png";
cloudImgSrc = "img/quackWhacker/Clouds.png";
batterStartImgSrc = "img/quackWhacker/BatterStart.png";
batterSwingingImgSrc = "img/quackWhacker/BatterSwinging.png";
const gameOverScreen = document.querySelector('#gameOverScreen');
const gameOverMsg = document.querySelector('#gameOverMsg');
const gameState = {
    MENU: 0,
    START: 1,
    FALLING: 2,
    MIDAIR: 3,
    GAME_OVER: 4
}
const skyMaxHeight = -15000;
const groundLevel = 0;
const xPosStart = 0;
const yPosStart = groundLevel - 350;
const xPosBatter = -40;
const yPosBatter = groundLevel - 120;
const batterPower = 3;
const battingWindow = 100;
var duckIdle = new Image();
var duckWingUp = new Image();
var duckWingDown = new Image();
var duckZoomin = new Image();
var eagleIdle = new Image();
var eagleWingUp = new Image();
var eagleWingDown = new Image();
var eagleZoomin = new Image();
var penguinIdle = new Image();
var penguinWingUp = new Image();
var penguinWingDown = new Image();
var penguinZoomin = new Image();

class Bird {
    constructor(gravity, groundFriction, jumpHeightSteps, fallingStateSpeed, maxJumps, birdYMultiplier, imgIdle, imgWingUp, imgWingDown, imgZoomin, name) {
        this.gravity = gravity;
        this.groundFriction = groundFriction;
        this.jumpHeightSteps = jumpHeightSteps;
        this.fallingStateSpeed = fallingStateSpeed;
        this.maxJumps = maxJumps;
        this.birdYMultiplier = birdYMultiplier;

        this.imgIdle = imgIdle;
        this.imgWingUp = imgWingUp;
        this.imgWingDown = imgWingDown;
        this.imgZoomin = imgZoomin;
        this.name = name;
    }
}

const duck = new Bird(0.002, -0.01, -0.1, 0.5, 5, 2.2, duckIdle, duckWingUp, duckWingDown, duckZoomin, "duck");
const eagle = new Bird(0.0015, -0.02, -0.1, 0.5, 5, 2.5, eagleIdle, eagleWingUp, eagleWingDown, eagleZoomin, "eagle");
const penguin = new Bird(0.003, -0.001, -0.15, 0.7, 6, 1.75, penguinIdle, penguinWingUp, penguinWingDown, penguinZoomin, "penguin");