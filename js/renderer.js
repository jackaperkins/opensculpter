/**
 * This is the script where we render the 3d objects using the dect data
 */


//this dollarsign wrapping a nameless function is all
// jquery making sure none of this runs till the page is ready
$(function () {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({
        alpha: true //alpha means the background is by default transparent so we can see webcam
    });

    // add the rendering element (canvas) to the DOM
    renderer.setSize(640, 480);
    $('#canvas-holder').append(renderer.domElement);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // creating our sphere and it's material
    var geometry = new THREE.SphereGeometry(1);
    var material = new THREE.MeshPhongMaterial({
        ambient: 0x444444,
        color: 0xA3585B,
        specular: 0x94D5B,
        shininess: 10,
        perPixel: false,
        overdraw: true
    });

    // actually it's a sphere, but the variable name is cube [ha ha ha]
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var original = [];

    for (var i = 0; i < cube.geometry.vertices.length; i++) {
        original.push({
            x: cube.geometry.vertices[i].x,
            y: cube.geometry.vertices[i].y,
            z: cube.geometry.vertices[i].z,
        });
    }

    pointLight = new THREE.PointLight(0xffffff, .8);
    //pointLight.lookAt(mesh)
    pointLight.position = camera.position;

    //pointLight.castShadow = true;
    scene.add(pointLight);

    camera.position.z = 5;
    render();

    function render() {
        //in your update/draw function
        if (io.coords) {
            cube.position.x = 0.015 * io.coords[0] - 3.4;
            cube.position.y = -0.01 * io.coords[1] + 1;
        }

        cube.rotation.y += 0.008;
        cube.rotation.z += 0.007;
        distort(cube);

        //cube.rotateOnAxis(axis, 0.05);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function distort(object) {
        var factor = .1 * 0.02 * io.coords[0];
        factor *= factor;

        var maxVertices = object.geometry.vertices.length;

        for (var i = 0; i < maxVertices; i++) {
            var vertex = object.geometry.vertices[i];

            vertex.x += (original[i].x - vertex.x) * 0.3 + (Math.random(1) - 0.5) * factor;
            vertex.y += (original[i].y - vertex.y) * 0.3 + (Math.random(1) - 0.5) * factor;
            vertex.z += (original[i].z - vertex.z) * 0.3 + (Math.random(1) - 0.5) * factor;
        }

        object.geometry.dynamic = true;
        object.geometry.verticesNeedUpdate = true;
    }

});