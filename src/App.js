import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

import Renderer from './Renderer';
import Camera from './Camera';
import Scene from './Scene';

THREE.OrbitControls = OrbitControls(THREE);

export default () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const container = document.createElement('div');

  const scene = Scene();
  const camera = Camera({ windowWidth, windowHeight });
  const renderer = Renderer({ windowWidth, windowHeight });
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const render = () => {
    renderer.render(scene, camera);
    scene.getObjectByName('character').walk();
  };
  const animate = () => {
    window.requestAnimationFrame(animate);
    render();
  };
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  controls.addEventListener('change', render);
  container.appendChild(renderer.domElement);

  return {
    container,
    animate,
    handleResize,
  };
};
