var objInterval;

var countdownStart = 60000; // countdown from 60000 ms (let user edit this later)
var countdownElapsed = 0; // total amount of time that has elapsed\
var countdownDelta = 0;
var startDate;

var startButton = document.getElementById('startButton');
var pauseButton = document.getElementById('pauseButton');
var resumeButton = document.getElementById('resumeButton');
var resetButton = document.getElementById('resetButton');
var flipButton = document.getElementById('flipButton');
var hourglass = document.getElementById('hourglass');

function showTimerValue() {
    
    countdownDelta = Date.now() - startDate;
    if (countdownStart - countdownElapsed - countdownDelta <= 0) {
        console.log("Expired!");
        hourglass.innerHTML = formatTime(0);
        clearInterval(objInterval);
        changeState(3);
    } else {
        hourglass.innerHTML = formatTime(countdownStart - countdownElapsed - countdownDelta);
    }
}

function startTimer() {
    countdownElapsed = 0;
    countdownDelta = 0;

    // Initialize start time
    startDate = Date.now();

    // Set timer to refresh every 25 ms
    objInterval = setInterval(showTimerValue, 25)

    
    // change state
    changeState(1);
}

function pauseTimer() {
    // Stop the timer
    clearInterval(objInterval);
    countdownElapsed += countdownDelta;

    changeState(2);
}

function resumeTimer() {
    startDate = Date.now();
    objInterval = setInterval(showTimerValue, 25)

    changeState(1);
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
    changeState(1);
}

function init() {
    countdownStart = 60000; // countdown from 60000 ms (let user edit this later)
    countdownElapsed = 0; // total amount of time that has elapsed\
    countdownDelta = 0;

    hourglass.innerHTML = formatTime(countdownStart);
    
    changeState(0);
}

function changeState(state) {
    // Use this function to update various parameters and functions
    switch (state) {
        case 0:
            // Start
            console.log("start state");
            startButton.style.display = 'block';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'none';

            hourglass.style.backgroundColor = "white";
            break;
        case 1:
            // In progress
            console.log("in progress state");
            startButton.style.display = 'none';
            pauseButton.style.display = 'block';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'block';

            hourglass.style.backgroundColor = "white";
            break;
        case 2:
            // Stopped
            console.log("stopped state");
            startButton.style.display = 'none';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'block';
            resetButton.style.display = 'block';
            flipButton.style.display = 'none';

            hourglass.style.backgroundColor = "white";
            break;
        case 3:
            // Timer expired
            console.log("expired state");
            startButton.style.display = 'none';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'block';
            flipButton.style.display = 'none';

            hourglass.style.backgroundColor = "red";
            break;
        default:
            // default is start
            startButton.style.display = 'block';
            pauseButton.style.display = 'none';
            resumeButton.style.display = 'none';
            resetButton.style.display = 'none';
            flipButton.style.display = 'none';

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