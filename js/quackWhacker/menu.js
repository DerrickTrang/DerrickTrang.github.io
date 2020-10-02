const gameStartScreen = document.querySelector('#gameStartScreen');
const gameInstructionsScreen = document.querySelector('#gameInstructionsScreen');
const birdSelectScreen = document.querySelector('#birdSelectScreen');
var menuLoopInterval = 0;

const startGame = () => {
    gameStartScreen.style.display = "none";
    gameInstructionsScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    // TODO - update this to use whatever bird was selected
    bird = duck;
    initGame();
}

const initGameMenus = () => {
    gameStartScreen.style.display = "flex";
    gameInstructionsScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    birdSelectScreen.style.display = "none";

    document.querySelector('#startGameBtn').addEventListener("click", () => {
        startGame();
    });
    document.querySelector('#openInstructionsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "none";
        gameInstructionsScreen.style.display = "flex";        
    });
    document.querySelector('#birdSelectionBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "none";
        birdSelectScreen.style.display = "flex";
    });

    document.querySelector('#closeInstructionsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "flex";
        gameInstructionsScreen.style.display = "none";
    });

    document.querySelector('#selectBirdBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "flex";
        birdSelectScreen.style.display = "none";
        // TODO - change bird to selected bird
    });    

    document.querySelector('#playAgainBtn').addEventListener("click", (e) => {
        changeState(gameState.START);
    });
    document.querySelector('#menuScreenBtn').addEventListener("click", (e) => {
        gameStartScreen.style.display = "flex";
        gameInstructionsScreen.style.display = "none";
        gameOverScreen.style.display = "none";
        changeState(gameState.MENU);
    });

    changeState(gameState.MENU);
}

// Promise.all([
//     loadAssets(),    
//     initGameMenus()
// ]);

Promise.all([
    loadAssets(),
    initGameMenus()
]).then(() => {
    requestAnimationFrame(gameLoop);
});