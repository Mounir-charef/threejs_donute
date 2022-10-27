import './style.css'

import * as THREE from 'three';

import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const  lightPoint = new THREE.PointLight(0xffffff);
lightPoint.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff)


scene.add(lightPoint, ambientLight);

const lightHelper = new THREE.PointLightHelper(lightPoint)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.OctahedronGeometry();
    const material = new THREE.MeshStandardMaterial({
        color: 0xf365ff
    })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star)
}


Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('cattu.jpg')
scene.background = spaceTexture;

//MEEEEEEEE

const mounirTexture = new THREE.TextureLoader().load('mounir.jpg');

const mounir = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial( {
        map: mounirTexture
    })
);

//Moon
const moonTxt = new THREE.TextureLoader().load("moon.jpg");
const moonMap = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTxt,
        normalMap: moonMap
    })
)

scene.add(moon);

moon.position.z = 30;
moon.position.x = -10;

scene.add(mounir);


function moveCamera(){

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    mounir.rotation.x +=0.01;
    mounir.rotation.z +=0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;


}

document.body.onscroll = moveCamera

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x +=0.01;
    torus.rotation.y +=0.005;
    torus.rotation.z += 0.01;

    mounir.rotation.x +=0.01;
    mounir.rotation.y +=0.005;
    mounir.rotation.z +=0.01;

    renderer.render(scene, camera);
}

animate()