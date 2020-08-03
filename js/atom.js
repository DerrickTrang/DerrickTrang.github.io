// Initialize
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 90, 100);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// lights
var light = new THREE.PointLight( 0xffffff, 5, 100 );
light.position.set( 30, 50, 50 );
scene.add( light );

// table
var table = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 90, 90, 1),
    new THREE.MeshPhongMaterial({color: 0xB0B0B0})
);
table.position.set(0, 0, 0);
//table.rotation.x = Math.PI / 2;
//table.rotation.x += 3.14 / 2;
table.rotation.x += 80; // figure out this rotation thing later
scene.add(table);

//var geometry = new THREE.SphereGeometry( 1, 32, 32 );
//var material = new THREE.MeshBasicMaterial( {color: 0x00ff00 } );
//var sphere = new THREE.Mesh( geometry, material );
//scene.add( sphere );



var geometry = new THREE.BoxGeometry(10, 10, 10);

var material = new THREE.MeshPhongMaterial({color: 0xff0000});
//material.wireframe = true;

var cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 20, 0)
scene.add( cube );



// animate
function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );    
}
animate();