import "./index.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const camera = new THREE.PerspectiveCamera(74, width / height, 0.1, 10);
camera.position.z = 5;

const scene = new THREE.Scene();

const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.03;

const spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(-5, 2, 2);

scene.add(spotLight);

const loader = new THREE.TextureLoader();

const group = new THREE.Group();

const geo = new THREE.IcosahedronGeometry(1, 16);

const earthMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/8k_earth_daymap.jpg"),
});

const moonMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/8k_moon.jpg"),
});

const earth = new THREE.Mesh(geo, earthMaterial);
earth.scale.setScalar(1.5);

const moon = new THREE.Mesh(geo, moonMaterial);
moon.position.setX(2.5);
moon.scale.setScalar(0.3);

const cloudsMat = new THREE.MeshStandardMaterial({
  blending: THREE.AdditiveBlending,
  map: loader.load("/8k_earth_clouds.jpg"),
});

const clouds = new THREE.Mesh(geo, cloudsMat);
clouds.scale.setScalar(1.004);

const ambientLight = new THREE.AmbientLight(0x888888, 0.2);

const nightMat = new THREE.MeshStandardMaterial({
  blending: THREE.AdditiveBlending,
  map: loader.load("/8k_earth_nightmap.jpg"),
});

const nightEarth = new THREE.Mesh(geo, nightMat);
nightEarth.scale.setScalar(1.003);

const glowMat = new THREE.MeshStandardMaterial({
  color: 0x0000f5,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
});

const glow = new THREE.Mesh(geo, glowMat);
glow.scale.setScalar(1.02);

earth.add(glow);
earth.add(clouds);
earth.add(nightEarth);

group.add(earth);
group.add(moon);

scene.add(ambientLight);
scene.add(group);

window.addEventListener("resize", (_) => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

function animate() {
  renderer.render(scene, camera);
  earth.rotateY(-0.0006);
  clouds.rotateY(-0.001);
  moon.rotateY(0.01);
  group.rotateY(0.005);
  controller.update();
  requestAnimationFrame(animate);
}

animate();
