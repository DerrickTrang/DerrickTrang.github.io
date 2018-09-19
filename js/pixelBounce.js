// Initialize
var squareArray = [];
var wWidth = document.body.clientWidth;
var wHeight = document.body.clientHeight;


function square() {
    // Randomize starting location
    this.xpos = Math.random() * wWidth;
    this.ypos = Math.random() * wHeight;
    //this.xvelocity = ((Math.random() * 2) + 3) * (Math.random() < 0.5 ? -1 : 1); // between 3 to 5 or -3 to -5
    //this.yvelocity = ((Math.random() * 2) + 3) * (Math.random() < 0.5 ? -1 : 1); // between 3 to 5 or -3 to -5
    this.xvelocity = ((Math.random() * 10) + 1) * (Math.random() < 0.5 ? -1 : 1); // between 1 to 10 or -1 to -10
    this.yvelocity = ((Math.random() * 10) + 1) * (Math.random() < 0.5 ? -1 : 1); // between 1 to 10 or -1 to -10
    this.squareSize = 10;
}

function drawSquares() {
    var canvas = document.querySelector("#gs");
    var ctx = canvas.getContext("2d");

    canvas.width = wWidth;
    canvas.height = wHeight;

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, wWidth, wHeight);
    ctx.closePath();

    for (i = 0; i < squareArray.length; i++) {
		    
        ctx.beginPath();
        //ctx.fillStyle = "white";
        ctx.fillStyle = "rgba(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)";
        ctx.fillRect(squareArray[i].xpos, squareArray[i].ypos, squareArray[i].squareSize, squareArray[i].squareSize);
        ctx.closePath();

    }
}

function updateSquares() {

    for (i = 0; i < squareArray.length; i++) {

        // calculate square position
        squareArray[i].xpos = squareArray[i].xpos + squareArray[i].xvelocity;
        squareArray[i].ypos = squareArray[i].ypos + squareArray[i].yvelocity;
			
        if (squareArray[i].xpos >=wWidth) {
            squareArray[i].xpos = wWidth - squareArray[i].squareSize;
            squareArray[i].xvelocity = squareArray[i].xvelocity * -1;
        }
        if (squareArray[i].xpos <= 0) {
            squareArray[i].xpos = 0;
            squareArray[i].xvelocity = squareArray[i].xvelocity * -1
        }
        if (squareArray[i].ypos >= wHeight) {
            squareArray[i].ypos = wHeight - squareArray[i].squareSize;
            squareArray[i].yvelocity = squareArray[i].yvelocity * -1
        }
        if (squareArray[i].ypos <= 0) {
            squareArray[i].ypos = 0;
            squareArray[i].yvelocity = squareArray[i].yvelocity * -1
        }

    }
}

function addSquares(x) {
    for (i = 0; i < x; i++) {
        squareArray.push(new square());
    }
}

function pixels() {
    updateSquares();
    drawSquares();
    requestAnimationFrame(pixels);
}

function initAll() {		
    // start with 5 squares
    addSquares(5);
}

	
initAll();

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 8:
            squareArray = []; // backspace clears pixels
            break;
        case 32:
            addSquares(50); // spacebar adds 50 pixels
            break;        
        default:
            addSquares(1); // any other button adds 1
    }
    console.log("# of squares: " + squareArray.length);
});
document.addEventListener("click", function (event) {
    addSquares(10);
    console.log("# of squares: " + squareArray.length);
});

requestAnimationFrame(pixels);