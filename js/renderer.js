$(function() {
    var scene = new THREE.Scene();
//declared once at the top of your co
var axis = new THREE.Vector3(0.5,0.5,0);//tilted a bit on x and y - feel free to plug your different axis here

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( 640, 480);
$('#canvas-holder').append( renderer.domElement );


var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshPhongMaterial( { ambient: 0x444444, color: 0x19A8CB, specular: 0x49D8FB, shininess: 80, perPixel: false, overdraw: true } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


pointLight = new THREE.PointLight( 0xffffff, .8 );
//pointLight.lookAt(mesh)
pointLight.position = camera.position;

//pointLight.castShadow = true;
scene.add( pointLight );


camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    //in your update/draw function
    if(io.coords){
        cube.position.x = 0.01*io.coords[0]-3;
        cube.position.y = -0.01*io.coords[1]+1;
    }
    cube.rotation.y += 0.03;
     cube.rotation.z += 0.03;
    //cube.rotateOnAxis(axis, 0.05);
}
render();
});