var scene, camera, renderer, geometry, light, boundary, table;
var cubeArray = [];

var cameraRadius = 300;
var cameraPosition = 0;
var pauseCameraRotate = false;

var boundarySize = 100;
var cubeSize = 10;
var cubeMaxSpeed = 0.7;

var pinching, zoomDist;

function cube() {
    // Randomize starting velocity
	this.xvelocity = ((Math.random() * cubeMaxSpeed) + 1) * (Math.random() < 0.5 ? -1 : 1);
    this.yvelocity = ((Math.random() * cubeMaxSpeed) + 1) * (Math.random() < 0.5 ? -1 : 1);
    this.zvelocity = ((Math.random() * cubeMaxSpeed) + 1) * (Math.random() < 0.5 ? -1 : 1);

    this.cubeMesh = new THREE.Mesh(geometry, 
        new THREE.MeshPhongMaterial({ color: "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)" }));    
    
    // Randomize starting location
    this.cubeMesh.position.x = Math.random() * ((boundarySize / 2) - (cubeSize / 2));
    this.cubeMesh.position.y = Math.random() * ((boundarySize / 2) - (cubeSize / 2));
    this.cubeMesh.position.z = Math.random() * ((boundarySize / 2) - (cubeSize / 2));
}

function initTHREE() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);    
    camera.position.set(0, 100, cameraRadius);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    geometry = new THREE.BoxGeometry(10, 10, 10);    

    light = new THREE.DirectionalLight( 0xFFFFFF, 2 );
    //light.position.set( 20, 100, 100 );
    light.position.set( 20, 50, 100 );
    light.castShadow = true;

    boundary = new THREE.Mesh(
        new THREE.BoxGeometry(boundarySize, boundarySize, boundarySize), 
        new THREE.MeshBasicMaterial({color: 0x34ebe5, wireframe: true }));    

    // table
    table = new THREE.Mesh(
                new THREE.PlaneGeometry(500, 500, 500, 1),
                new THREE.MeshPhongMaterial({color: 0x282828})
                );
                table.position.set(0, (-boundarySize / 2) - 1, 0);
                table.rotation.x = Math.PI * 3 / 2;
}

function updateCubes() {

    for (i = 0; i < cubeArray.length; i++) {

        // calculate cube position
        cubeArray[i].cubeMesh.position.x = cubeArray[i].cubeMesh.position.x + cubeArray[i].xvelocity;
        cubeArray[i].cubeMesh.position.y = cubeArray[i].cubeMesh.position.y + cubeArray[i].yvelocity;
        cubeArray[i].cubeMesh.position.z = cubeArray[i].cubeMesh.position.z + cubeArray[i].zvelocity;
			
        if (cubeArray[i].cubeMesh.position.x >=((boundarySize / 2) - (cubeSize / 2))) {
            cubeArray[i].xvelocity = cubeArray[i].xvelocity * -1;
        }
        if (cubeArray[i].cubeMesh.position.x <= (((boundarySize / 2) - (cubeSize / 2)) * -1)) {
            cubeArray[i].xvelocity = cubeArray[i].xvelocity * -1
        }

        if (cubeArray[i].cubeMesh.position.y >= ((boundarySize / 2) - (cubeSize / 2))) {
            cubeArray[i].yvelocity = cubeArray[i].yvelocity * -1
        }
        if (cubeArray[i].cubeMesh.position.y <= (((boundarySize / 2) - (cubeSize / 2)) * -1)) {
            cubeArray[i].yvelocity = cubeArray[i].yvelocity * -1
        }
        
        if (cubeArray[i].cubeMesh.position.z >= ((boundarySize / 2) - (cubeSize / 2))) {
            cubeArray[i].zvelocity = cubeArray[i].zvelocity * -1
        }
        if (cubeArray[i].cubeMesh.position.z <= (((boundarySize / 2) - (cubeSize / 2)) * -1)) {
            cubeArray[i].zvelocity = cubeArray[i].zvelocity * -1
        }
    }
}

function drawScene() {    
    // clear out existing children items
    while (scene.children.length) {
        scene.remove(scene.children[0]);
    }

    // draw light
    scene.add(light);

    // draw boundary
    scene.add(boundary);    

    // draw table
    scene.add(table);

    // add all cubes to scene
    for (i = 0; i < cubeArray.length; i++) {
        scene.add(cubeArray[i].cubeMesh);
    }   

    // update camera
    if(!pauseCameraRotate) {
        camera.position.set(cameraRadius * Math.cos(cameraPosition), 100, cameraRadius * Math.sin(cameraPosition));
        camera.lookAt(0, 0, 0);
        cameraPosition = (cameraPosition + 0.007) % 360;
    }    

    // draw scene
    renderer.render(scene, camera);
}

function addCubes(x) {
	for (i = 0; i < x; i++) {
		cubeArray.push(new cube());
    }
}

function toggleRotate() {
    pauseCameraRotate = !pauseCameraRotate;
}

function zoomCameraInit() {
    zoomDist = 0;
}

function zoomCamera(e) {
    var dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY);

    if (zoomDist = 0) {
        zoomDist = dist;
    } else {
        cameraRadius += dist - zoomDist;
    }    
}

function animate() {    
    updateCubes();
    drawScene();
    requestAnimationFrame(animate);
}

// Begin here
initTHREE();
addCubes(5);

document.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case 8:
			cubeArray = []; // backspace clears pixels
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

document.getElementById("btnRotateCamera").addEventListener("click", toggleRotate);

// experimenting with a "pinch" event listener
renderer.domElement.addEventListener("ontouchstart", function(event) {
    if(event.touches.length === 2) {
        zoomCameraInit(event);
        pinching = true;
    }
});

renderer.domElement.addEventListener("ontouchmove", function(event) {
    if(pinching) {
        zoomCamera(event);
    }
});

renderer.domElement.addEventListener("ontouchend", function() {
    if(pinching) {
        pinching = false;
    }
});

animate(); 