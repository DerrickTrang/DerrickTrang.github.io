// Constants
const canvas = document.querySelector("#gs");
const ctx = canvas.getContext("2d");
mountainImgSrc = "img/quackWhacker/mountain.png";
duckIdleSrc = "img/quackWhacker/DuckIdle.png";
duckWingUpSrc = "img/quackWhacker/DuckWingUp.png";
duckWingDownSrc = "img/quackWhacker/DuckWingDown.png";
duckZoominSrc = "img/quackWhacker/DuckZoomin.png";
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

class Bird {
    constructor(gravity, groundFriction, jumpHeightSteps, fallingStateSpeed, maxJumps, birdYMultiplier) {
        this.gravity = gravity;
        this.groundFriction = groundFriction;
        this.jumpHeightSteps = jumpHeightSteps;
        this.fallingStateSpeed = fallingStateSpeed;
        this.maxJumps = maxJumps;
        this.birdYMultiplier = birdYMultiplier;
    }
}

const duck = new Bird(0.002, -0.01, -0.1, 0.5, 5, 2.2);
const eagle = new Bird(0.001, -0.01, -0.1, 0.5, 5, 2.2);