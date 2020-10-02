const gameStartScreen = document.querySelector('#gameStartScreen');
const gameInstructionsScreen = document.querySelector('#gameInstructionsScreen');
const leaderboardsScreen = document.querySelector('#leaderboardsScreen');
const birdSelectScreen = document.querySelector('#birdSelectScreen');
const birdSelectionBtn = document.querySelector('#birdSelectionBtn');
var menuLoopInterval = 0;

const startGame = () => {
    gameStartScreen.style.display = "none";
    gameInstructionsScreen.style.display = "none";
    leaderboardsScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    // TODO - update this to use whatever bird was selected
    //bird = duck;
    //bird = duck;
    initGame();
}

const changeBird = (birdName) => {
    let birdImgSrc;
    switch(birdName) {
        case "Duck":
            bird = duck;
            birdImgSrc = duckIdleSrc;
            break;
        case "Eagle":
            bird = eagle;
            birdImgSrc = eagleIdleSrc;
            break;
        case "Penguin":
            bird = penguin;
            birdImgSrc = duckIdleSrc;
            break;
    }    
    birdSelectionBtn.innerHTML = "Selected Bird ("+ birdName +")<br><br><img id='selectedBird' src=" + birdImgSrc + ">";
}

const initGameMenus = () => {
    gameStartScreen.style.display = "flex";
    gameInstructionsScreen.style.display = "none";
    leaderboardsScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    birdSelectScreen.style.display = "none";

    document.querySelector('#startGameBtn').addEventListener("click", () => {
        startGame();
    });
    document.querySelector('#openInstructionsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "none";
        gameInstructionsScreen.style.display = "flex";        
    });
    document.querySelector('#openLeaderboardsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "none";
        leaderboardsScreen.style.display = "flex";        
    });
    birdSelectionBtn.addEventListener("click", () => {
        gameStartScreen.style.display = "none";
        birdSelectScreen.style.display = "flex";
    });

    document.querySelector('#closeInstructionsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "flex";birdSelectionBtn.innerHTML = "Selected Bird (Duck)<br><br><img id='selectedBird' src='img/quackWhacker/DuckIdle.png'>";
        gameInstructionsScreen.style.display = "none";
    });

    document.querySelector('#closeLeaderboardsBtn').addEventListener("click", () => {
        gameStartScreen.style.display = "flex";
        leaderboardsScreen.style.display = "none";        
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

    document.querySelectorAll('.selectBird').forEach((button) => {
        console.log(button.title);
        button.addEventListener("click", (e) => {
            let birdName = e.target.title;
            if(birdName === "") {
                birdName = e.target.parentElement.title;
            }
            changeBird(birdName);
            gameStartScreen.style.display = "flex";
            birdSelectScreen.style.display = "none";
        });
    });

    bird = duck;
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