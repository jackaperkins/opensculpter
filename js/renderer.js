
$(function() {
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( 640, 480);
$('#canvas-holder').append( renderer.domElement );


var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var geometry = new THREE.SphereGeometry(2,.15,.15);
var material = new THREE.MeshPhongMaterial( { ambient: 0x444444, color: 0xA3585B, specular: 0x49D8FB, shininess: 80, perPixel: false, overdraw: true } );

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var original = [];

for(var i=0; i< cube.geometry.vertices.length; i++){
    original.push({
        x: cube.geometry.vertices[i].x,
        y: cube.geometry.vertices[i].y,
        z: cube.geometry.vertices[i].z,
    });
}

pointLight = new THREE.PointLight( 0xffffff, .8 );
//pointLight.lookAt(mesh)
pointLight.position = camera.position;

//pointLight.castShadow = true;
scene.add( pointLight );


camera.position.z = 5;
render();


function render() {
    //in your update/draw function
    if(io.coords){
        cube.position.x = 0.013*io.coords[0]-3;
        cube.position.y = -0.01*io.coords[1]+1;
    }

    cube.rotation.y += 0.008;
    cube.rotation.z += 0.007;
    distort(cube);

    //cube.rotateOnAxis(axis, 0.05);

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function distort(object) {
    var factor = .35 * 0.01*io.coords[0];
    factor *= factor;

   // object.geometry.vertices = temp;

    var  maxVertices = object.geometry.vertices.length;

    for (var i = 0; i < maxVertices; i++) {
        var vertex = object.geometry.vertices[i];

        vertex.x =  original[i].x + ( Math.random(1) - 0.5 ) * factor;
        vertex.y  = original[i].y + ( Math.random(1) - 0.5 ) * factor;
        vertex.z  = original[i].z + ( Math.random(1) - 0.5 ) * factor;
    }

    object.geometry.dynamic = true;
    object.geometry.verticesNeedUpdate = true;
}

});


