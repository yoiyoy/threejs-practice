import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

import Character from './Character';

THREE.OrbitControls = OrbitControls(THREE);
const arrayFor = (length, fill) => [...Array(length)].map(() => fill);

let scene;
let container;
let camera;
let renderer;
const character = Character({ blockSize: 10 });

function render() {
  renderer.render(scene, camera);
  scene.getObjectByName('character').walk();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
  directionalLight.position.z = 10;

  scene.add(directionalLight);
  scene.add(new THREE.AmbientLight(0x333333));
  scene.add(character);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xFFFFFF);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  return scene;
}

init();
animate();
