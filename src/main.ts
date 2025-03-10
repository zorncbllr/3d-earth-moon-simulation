import "./index.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Earth from "./class/earth";
import Moon from "./class/moon";
import { addStars } from "./class/stars";

let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

document.body.append(renderer.domElement);

const camera = new THREE.PerspectiveCamera(74, width / height, 0.1, 50);
camera.position.z = 5;

const scene = new THREE.Scene();

const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.03;

const spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(-5, 2, 2);

const ambientLight = new THREE.AmbientLight(0x888888, 0.2);

scene.add(spotLight);
scene.add(ambientLight);

const group = new THREE.Group();

const earth = new Earth();
const moon = new Moon();

group.add(earth);
group.add(moon);

scene.add(group);

addStars(scene);

window.addEventListener("resize", (_) => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

function animate() {
  renderer.render(scene, camera);

  earth.handleAnimation();
  moon.handleAnimation();
  group.rotateY(0.005);

  controller.update();

  requestAnimationFrame(animate);
}

animate();
