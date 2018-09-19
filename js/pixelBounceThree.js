// Initialize
var squareArray = [];
var wWidth = document.body.clientWidth;
var wHeight = document.body.clientHeight;

var scene, camera, renderer, geometry, material, cube;
var squareCount = 0;



function square() {
    // Randomize starting location
    this.xpos = Math.random() * wWidth;
    this.ypos = Math.random() * wHeight;
    this.xvelocity = ((Math.random() * 2) + 3) * (Math.random() < 0.5 ? -1 : 1); // between 3 to 5 or -3 to -5
    this.yvelocity = ((Math.random() * 2) + 3) * (Math.random() < 0.5 ? -1 : 1); // between 3 to 5 or -3 to -5
    this.squareSize = 10;

    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.x = this.xpos;
    this.cubeMesh.position.y = this.ypos;
}

function initSquares() {
    // start with 5 square
    squareArray.push(new square());
    squareArray.push(new square());
    squareArray.push(new square());
    squareArray.push(new square());
    squareArray.push(new square());
}

function initTHREE() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gs") });
    renderer.setSize(window.innerWidth, window.innerHeight);

    geometry = new THREE.BoxGeometry(10000, 10000, 10000);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


    camera.position.z = 100;

}

function drawSquares() {
    // add any new cubes to array
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    for (i = 0; i < squareArray.length - squareCount; i++) {
        scene.add(squareArray[i].cubeMesh);
        console.log("in loop, i = " + i);
    }
    squareCount = squareArray.length;
   
    renderer.render(scene, camera);

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



var animate = function () {
    requestAnimationFrame(animate);
    updateSquares();
    drawSquares();
}

// Begin here
	
initSquares();
initTHREE();

document.addEventListener("keydown", function (event) {
    squareArray.push(new square());
    console.log("# of squares: " + squareArray.length);
});
document.addEventListener("click", function (event) {
    squareArray.push(new square());
    console.log("# of squares: " + squareArray.length);
});

animate();