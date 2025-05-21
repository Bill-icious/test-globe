
import * as THREE from './three.module.js';

let scene, camera, renderer, earth, clouds, stars;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: loader.load('earthmap1k.jpg'),
        bumpMap: loader.load('earthbump.jpg'),
        bumpScale: 0.05,
        specularMap: loader.load('specularmap.jpg'),
        specular: new THREE.Color('grey')
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudMaterial = new THREE.MeshLambertMaterial({
        map: loader.load('earthCloud.png'),
        transparent: true
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Stars background
    const starGeometry = new THREE.SphereGeometry(90, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('galaxy.png'),
        side: THREE.BackSide
    });
    stars = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(stars);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate Earth and clouds based on scroll position
    const scrollFactor = window.scrollY * 0.002;
    if (earth) earth.rotation.y = scrollFactor;
    if (clouds) clouds.rotation.y = scrollFactor * 1.1;

    renderer.render(scene, camera);
}
