import * as THREE from 'three';

export default ({
  windowWidth,
  windowHeight,
}) => {
  const camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 2000);

  camera.position.z = 600;

  return camera;
};
