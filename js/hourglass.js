var objInterval;

var countdownStart;
var countdownElapsed;
var countdownDelta;
var startDate;
var currentState;
var lastState;

var showHelpStart = 1;
var showHelpDuring = 1;

var startButtonA;
var startButtonB;
var resetButton;
var flipButton;
var hourglass;
var hourglassHelp;

var buzzer = new Audio("audio/Air_Horn.mp3");

var colorA = "dodgerblue";
var backgroundA = "skyblue";
var colorB = "orangered";
var backgroundB = "coral";

function showTimerValue() {
    
    countdownDelta = Date.now() - startDate;
    if (countdownStart - countdownElapsed - countdownDelta <= 0) {
        console.log("Expired!");
        hourglass.innerHTML = formatTime(0);
        buzzer.play();
        clearInterval(objInterval);
        changeState(4);
    } else {
        hourglass.innerHTML = formatTime(countdownStart - countdownElapsed - countdownDelta);
    }
}

function hideHelp() {
    hourglassHelp.style.display = 'none';
}

function startTimerA() {
    countdownElapsed = 0;
    countdownDelta = 0;

    // Initialize start time
    startDate = Date.now();

    // Set timer to refresh every 25 ms
    objInterval = setInterval(showTimerValue, 25)

    // change state
    changeState(1);
}

function startTimerB() {
    countdownElapsed = 0;
    countdownDelta = 0;

    // Initialize start time
    startDate = Date.now();

    // Set timer to refresh every 25 ms
    objInterval = setInterval(showTimerValue, 25)

    // change state
    changeState(2);    
}

function pauseTimer() {
    // Stop the timer
    clearInterval(objInterval);
    countdownElapsed += countdownDelta;

    lastState = currentState;
    changeState(3);
}

function resumeTimer() {
    startDate = Date.now();
    objInterval = setInterval(showTimerValue, 25)

    changeState(lastState);
}

function resetTimer() {
    countdownElapsed = 0;
    countdownDelta = 0;
    hourglass.innerHTML = formatTime(countdownStart);

    // Show Start
    changeState(0);
}

function flipTimer() {
    // Get current time difference
    countdownElapsed = countdownStart - (countdownElapsed + countdownDelta);
    startDate = Date.now();
    if (currentState === 1) {
        changeState(2);
    } else {
        changeState(1);
    }    
}

function changeTimer() {
    var sec = prompt("Enter the hourglass time in seconds:", "60");
    if (sec != null) {
        countdownStart = parseInt(sec) * 1000;
    } else {
        // Defaulted to 60 seconds
        countdownStart = 60000;
    }
    console.log("countdownStart = " + countdownStart)
    hourglass.innerHTML = formatTime(countdownStart);
}

function init() {
    countdownStart = 60000; // countdown from 60000 ms (let user edit this later)
    countdownElapsed = 0; // total amount of time that has elapsed\
    countdownDelta = 0;
    currentState = 0;
    lastState = 0;

    // Retrieve all document elements
    startButtonA = document.getElementById('startButtonA');
    startButtonB = document.getElementById('startButtonB');
    resetButton = document.getElementById('resetButton');
    flipButton = document.getElementById('flipButton');
    hourglassContainer = document.getElementById('hourglassContainer');
    hourglass = document.getElementById('hourglass');
    hourglassHelp = document.getElementById('hourglassHelp');

    // Set event listeners
    startButtonA.addEventListener("click", startTimerA);
    startButtonB.addEventListener("click", startTimerB);
    resetButton.addEventListener("click", resetTimer);
    flipButton.addEventListener("click", flipTimer);
    hourglassHelp.addEventListener("click", hideHelp);
    
    // initialize colors
    startButtonA.style.backgroundColor = colorA;
    startButtonB.style.backgroundColor = colorB;

    hourglass.innerHTML = formatTime(countdownStart);
    
    changeState(0);
}

function changeState(state) {
    // Use this function to update various parameters and functions
    currentState = state;
    console.log("changing state to: " + state);
    // Update event listeners on timer
    hourglass.removeEventListener("click", pauseTimer);
    hourglass.removeEventListener("click", resumeTimer);
    hourglass.removeEventListener("click", changeTimer);
    switch (state) {
        case 0:
            hourglass.addEventListener("click", changeTimer);
            break;
        case 1:
            hourglass.addEventListener("click", pauseTimer);
            break;
        case 2:
            hourglass.addEventListener("click", pauseTimer);
            break;
        case 3:
            hourglass.addEventListener("click", resumeTimer);
            break;
        default:
            break;
    }

    // Update buttons and colors
    switch (state) {
        case 0:
            // Start
            console.log("start state");
            startButtonA.style.display = 'flex';
            startButtonB.style.display = 'flex';
            resetButton.style.display = 'none';
            flipButton.style.display = 'none';

            hourglassContainer.style.backgroundColor = "white";
            hourglass.style.backgroundColor = "white";
            break;
        case 1:
            // In progress A
            console.log("in progress state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'flex';

            flipButton.style.backgroundColor = colorB;

            hourglass.style.backgroundColor = colorA;
            hourglassContainer.style.backgroundColor = backgroundA;
            break;
        case 2:
            // In progress B
            console.log("in progress state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'flex';

            flipButton.style.backgroundColor = colorA;

            hourglass.style.backgroundColor = colorB;
            hourglassContainer.style.backgroundColor = backgroundB;
            break;
        case 3:
            // Stopped
            console.log("stopped state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            resetButton.style.display = 'flex';
            flipButton.style.display = 'none';

            break;
        case 4:
            // Timer expired
            console.log("expired state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            resetButton.style.display = 'flex';
            flipButton.style.display = 'none';

            hourglassContainer.style.backgroundColor = "black";
            hourglass.style.backgroundColor = "red";
            break;
        default:
            // default is start
            startButtonA.style.display = 'flex';
            startButtonB.style.display = 'flex';
            resetButton.style.display = 'none';
            flipButton.style.display = 'none';

            hourglassContainer.style.backgroundColor = "white";
            hourglass.style.backgroundColor = "white";
            break;
    }
}

function formatTime(ms) {
    // time passed in as milliseconds
    var min = Math.floor(ms / 60 / 1000);
    var sec = Math.floor((ms - (min * 60 * 1000)) / 1000);
    var mils = Math.floor((ms - (min * 60 * 1000) - (sec * 1000)) / 10);
    
    if (min < 10) {min = "0" + min};
    if (sec < 10) {sec = "0"+ sec};
    if (mils < 10) { mils = "0" + mils };

    // format as mm:ss:ms
    return min + ":" + sec + ":" + mils;
}

// on page load, execute below
init();