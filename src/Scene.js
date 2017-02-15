import * as THREE from 'three';
import Character from './Character';

export default () => {
  const scene = new THREE.Scene();
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
  const ambientLight = new THREE.AmbientLight(0x333333);
  const character = Character({
    name: 'character',
    blockSize: 10,
  });

  directionalLight.position.z = 10;
  scene.add(directionalLight);
  scene.add(ambientLight);
  scene.add(character);
  return scene;
};
