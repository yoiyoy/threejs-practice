import * as THREE from 'three';

export default ({
  windowWidth,
  windowHeight,
}) => {
  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(0xFFFFFF);
  renderer.setSize(windowWidth, windowHeight);
  renderer.sortObjects = false;
  return renderer;
};
