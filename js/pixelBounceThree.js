/* ------------------------ Variable Declarations ------------------------ */
var scene, camera, renderer, light, boundary, table, cubeGeometry;
var cubeArray = [];

var cameraRadius = 300;
var cameraPosition = 0;
var cameraSpeed = 0.007; // radians

// Options
var boundarySize = 100;

var cubeSize = 4;
var cubeSpeed = 2;

var showOptions = false;
var pauseCameraRotate = false;
var hideBounds = false;
var hideTable = false;

/* ------------------------ Functions ------------------------ */
// Cube object
function cube() {    

    // Randomize starting velocity
    this.xVelocityScale = Math.random();
    this.yVelocityScale = Math.random();
    this.zVelocityScale = Math.random();

	this.xVelocity = this.xVelocityScale * cubeSpeed * (Math.random() < 0.5 ? -1 : 1);
    this.yVelocity = this.yVelocityScale * cubeSpeed * (Math.random() < 0.5 ? -1 : 1);
    this.zVelocity = this.zVelocityScale * cubeSpeed * (Math.random() < 0.5 ? -1 : 1);

    this.cubeMesh = new THREE.Mesh(cubeGeometry, 
        new THREE.MeshPhongMaterial({ color: "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)" }));    
    this.cubeMesh.name = "cube";
        
    // Randomize starting location
    let cubePosLimit = (boundarySize / 2) - (cubeSize / 2);
    this.cubeMesh.position.x = Math.random() * cubePosLimit;
    this.cubeMesh.position.y = Math.random() * cubePosLimit;
    this.cubeMesh.position.z = Math.random() * cubePosLimit;    
}

function initTHREE() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    light = new THREE.DirectionalLight( 0xFFFFFF, 2 );
    light.position.set( 20, 150, 100 );
    light.castShadow = true;
    scene.add(light);

    boundary = new THREE.Mesh(new THREE.BoxGeometry(boundarySize, boundarySize, boundarySize), 
        new THREE.MeshBasicMaterial({color: 0x34ebe5, wireframe: true })
        );
    boundary.name = "boundary";
    scene.add(boundary);    

    table = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 500, 1),
        new THREE.MeshPhongMaterial({color: 0x282828})
        );
    table.name = "table";
    table.position.set(0, (-boundarySize / 2) - 1, 0);
    table.rotation.x = Math.PI * 3 / 2;
    scene.add(table);

    cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);    
}

function updateCubes() {

    if(cubeGeometry.parameters.width != cubeSize) {
        cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);    
    }

    for (let i = 0; i < cubeArray.length; i++) {

        // Update cube size
        if(cubeArray[i].cubeMesh.geometry.parameters.width != cubeSize) {
            cubeArray[i].cubeMesh.geometry = cubeGeometry;
        }

        // Update cube velocity
        if(cubeArray[i].xVelocity >= 0) {
            cubeArray[i].xVelocity = cubeArray[i].xVelocityScale * cubeSpeed;
        } else {
            cubeArray[i].xVelocity = cubeArray[i].xVelocityScale * cubeSpeed * -1;
        }

        if(cubeArray[i].yVelocity >= 0) {
            cubeArray[i].yVelocity = cubeArray[i].yVelocityScale * cubeSpeed;
        } else {
            cubeArray[i].yVelocity = cubeArray[i].yVelocityScale * cubeSpeed * -1;
        }

        if(cubeArray[i].zVelocity >= 0) {
            cubeArray[i].zVelocity = cubeArray[i].zVelocityScale * cubeSpeed;
        } else {
            cubeArray[i].zVelocity = cubeArray[i].zVelocityScale * cubeSpeed * -1;
        }  

        // Update cube position
        let cubePosLimit = (boundarySize / 2) - (cubeSize / 2);

        cubeArray[i].cubeMesh.position.x += cubeArray[i].xVelocity;
        if (cubeArray[i].cubeMesh.position.x > cubePosLimit) {
            cubeArray[i].cubeMesh.position.x = cubePosLimit;
            cubeArray[i].xVelocity *= -1;
        } else if (cubeArray[i].cubeMesh.position.x < (cubePosLimit * -1)) {
            cubeArray[i].cubeMesh.position.x = -cubePosLimit;
            cubeArray[i].xVelocity *= -1;
        }

        cubeArray[i].cubeMesh.position.y += cubeArray[i].yVelocity;
        if (cubeArray[i].cubeMesh.position.y > cubePosLimit) {
            cubeArray[i].cubeMesh.position.y = cubePosLimit;
            cubeArray[i].yVelocity *= -1;
        } else if (cubeArray[i].cubeMesh.position.y < (cubePosLimit * -1)) {
            cubeArray[i].cubeMesh.position.y = -cubePosLimit;
            cubeArray[i].yVelocity *= -1;
        }

        cubeArray[i].cubeMesh.position.z += cubeArray[i].zVelocity;
        if (cubeArray[i].cubeMesh.position.z > cubePosLimit) {
            cubeArray[i].cubeMesh.position.z = cubePosLimit;
            cubeArray[i].zVelocity *= -1;
        } else if (cubeArray[i].cubeMesh.position.z < (cubePosLimit * -1)) {
            cubeArray[i].cubeMesh.position.z = -cubePosLimit;
            cubeArray[i].zVelocity *= -1;
        }
    }
}

function drawScene() {
    // Update renderr suze
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update boundary
    if(boundary.geometry.parameters.width != boundarySize) {
        boundary.geometry = new THREE.BoxGeometry(boundarySize, boundarySize, boundarySize);
    }    
    if(hideBounds && scene.getObjectByName("boundary")) {
        scene.remove(scene.getObjectByName("boundary"));        
    } else if(!hideBounds && !scene.getObjectByName("boundary")) {
        scene.add(boundary);
    }

    // Update table
    table.position.set(0, (-boundarySize / 2) - 1, 0);
    if(hideTable && scene.getObjectByName("table")) {
        scene.remove(scene.getObjectByName("table"));        
    } else if(!hideTable && !scene.getObjectByName("table")) {
        scene.add(table);
    }

    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.set(cameraRadius * Math.cos(cameraPosition), 100, cameraRadius * Math.sin(cameraPosition));    
    if(!pauseCameraRotate) {        
        cameraPosition = (cameraPosition + cameraSpeed) % 360;
    }
    camera.lookAt(0, 0, 0);

    // Draw scene
    renderer.render(scene, camera);
}

function addCubes(x) {
	for (let i = 0; i < x; i++) {
        cubeArray.push(new cube());
        scene.add(cubeArray[cubeArray.length - 1].cubeMesh);        
    }
}

function removeCubes() {
    cubeArray = [];
    while(scene.getObjectByName("cube")) {
        scene.remove(scene.getObjectByName("cube"));
    }
}

function toggleOptions() {    
    showOptions = !showOptions;
    let options = document.getElementsByClassName("options");
    for(let i = 0; i < options.length; i++) {
        if(showOptions) {
            options[i].style.display = "block";        
            document.getElementById("btnToggleOptions").style.color = "black";
            document.getElementById("btnToggleOptions").style.backgroundColor = "aquamarine";
        } else {
            options[i].style.display = "none"; 
            document.getElementById("btnToggleOptions").style.color = "white";
            document.getElementById("btnToggleOptions").style.backgroundColor = "ForestGreen";
        }        
    }    
}

function toggleRotate() {
    let btnRotate = document.getElementById("btnRotateCamera");
    if(btnRotate.checked) {
        pauseCameraRotate = true;
    } else {
        pauseCameraRotate = false;
    }
}

function toggleBounds() {
    let btnHideBounds = document.getElementById("btnHideBounds");
    if(btnHideBounds.checked) {
        hideBounds = true;
    } else {
        hideBounds = false;
    }
}

function toggleTable() {
    let btnHideTable = document.getElementById("btnHideTable");
    if(btnHideTable.checked) {
        hideTable = true;
    } else {
        hideTable = false;
    }
}

function changeBoundarySize() {
    let slider = document.getElementById("sliderBoundarySize");
    if(slider.valueAsNumber < cubeSize) {
        slider.valueAsNumber = cubeSize + 1;
    }
    boundarySize = slider.valueAsNumber;    
}

function changeCubeSize() {
    let slider = document.getElementById("sliderCubeSize");
    if(slider.valueAsNumber > boundarySize) {
        slider.valueAsNumber = boundarySize - 1;
    }
    cubeSize = slider.valueAsNumber;
}

function changeCubeSpeed() {
    let slider = document.getElementById("sliderCubeSpeed");
    cubeSpeed = slider.valueAsNumber;
}

function changeCameraDistance() {
    let slider = document.getElementById("sliderCameraDistance");
    cameraRadius = slider.valueAsNumber;
}

function animate() {    
    updateCubes();
    drawScene();
    requestAnimationFrame(animate);
}

/* ------------------------ Script execution start ------------------------ */
initTHREE();
addCubes(5);

// Add event listeners
document.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case 8:
			removeCubes(); // backspace clears pixels
			break;
		case 32:
			addCubes(50); // spacebar adds 50
            break;        
        case 16: 
            break; // shift does nothing
		default:
			addCubes(1); // any other button adds 1 cube
	} 
});

renderer.domElement.addEventListener("click", function (event) {
	addCubes(5); // click/tap adds 5 cubes
});

document.getElementById("btnToggleOptions").addEventListener("click", toggleOptions);
document.getElementById("btnRotateCamera").addEventListener("click", toggleRotate);
document.getElementById("btnHideBounds").addEventListener("click", toggleBounds);
document.getElementById("btnHideTable").addEventListener("click", toggleTable);
document.getElementById("sliderBoundarySize").addEventListener("input", changeBoundarySize);
document.getElementById("sliderCubeSize").addEventListener("input", changeCubeSize);
document.getElementById("sliderCubeSpeed").addEventListener("input", changeCubeSpeed);
document.getElementById("sliderCameraDistance").addEventListener("input", changeCameraDistance);

// Begin animation loop
animate(); 