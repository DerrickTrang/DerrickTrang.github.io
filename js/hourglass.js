var objInterval;

var countdownStart = 60000; // countdown from 60000 ms (let user edit this later)
var countdownElapsed = 0; // total amount of time that has elapsed\
var countdownDelta = 0;
var startDate;
var currentState;
var lastState;

var startButtonA;
var startButtonB;
var pauseButton;
var resumeButton;
var resetButton;
var flipButton;
var hourglass;

function showTimerValue() {
    
    countdownDelta = Date.now() - startDate;
    if (countdownStart - countdownElapsed - countdownDelta <= 0) {
        console.log("Expired!");
        hourglass.innerHTML = formatTime(0);
        clearInterval(objInterval);
        changeState(4);
    } else {
        hourglass.innerHTML = formatTime(countdownStart - countdownElapsed - countdownDelta);
    }
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

function init() {
    countdownStart = 60000; // countdown from 60000 ms (let user edit this later)
    countdownElapsed = 0; // total amount of time that has elapsed\
    countdownDelta = 0;
    currentState = 0;
    lastState = 0;

    // Retrieve all document elements
    startButtonA = document.getElementById('startButtonA');
    startButtonB = document.getElementById('startButtonB');
    pauseButton = document.getElementById('pauseButton');
    resumeButton = document.getElementById('resumeButton');
    resetButton = document.getElementById('resetButton');
    flipButton = document.getElementById('flipButton');
    hourglassContainer = document.getElementById('hourglassContainer');
    hourglass = document.getElementById('hourglass');

    // Set event listeners
    startButtonA.addEventListener("click", startTimerA);
    startButtonB.addEventListener("click", startTimerB);
    pauseButton.addEventListener("click", pauseTimer);
    resumeButton.addEventListener("click", resumeTimer);
    resetButton.addEventListener("click", resetTimer);
    flipButton.addEventListener("click", flipTimer);

    hourglass.innerHTML = formatTime(countdownStart);
    
    changeState(0);
}

function changeState(state) {
    // Use this function to update various parameters and functions
    currentState = state;
    console.log("changing state to: " + state);
    switch (state) {
        case 0:
            // Start
            console.log("start state");
            startButtonA.style.display = 'block';
            startButtonB.style.display = 'block';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
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
            pauseButton.style.display = 'block';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'block';

            flipButton.style.backgroundColor = "dodgerblue"

            hourglassContainer.style.backgroundColor = "coral";
            hourglass.style.backgroundColor = "orangered";
            break;
        case 2:
            // In progress B
            console.log("in progress state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            pauseButton.style.display = 'block';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'block';

            flipButton.style.backgroundColor = "orangered"

            hourglassContainer.style.backgroundColor = "skyblue";
            hourglass.style.backgroundColor = "dodgerblue";
            break;
        case 3:
            // Stopped
            console.log("stopped state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'block';
            resetButton.style.display = 'block';
            flipButton.style.display = 'none';

            break;
        case 4:
            // Timer expired
            console.log("expired state");
            startButtonA.style.display = 'none';
            startButtonB.style.display = 'none';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'block';
            flipButton.style.display = 'none';

            hourglassContainer.style.backgroundColor = "black";
            hourglass.style.backgroundColor = "red";
            break;
        default:
            // default is start
            startButtonA.style.display = 'block';
            startButtonB.style.display = 'block';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
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