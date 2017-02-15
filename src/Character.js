import * as THREE from 'three';

const align = (axis, center, objects) => {
  const key = { x: 'width', y: 'height', z: 'depth' }[axis];
  const getShortest = objs =>
    objs.sort((a, b) =>
      a.geometry.parameters[key] - b.geometry.parameters[key])[0];
  const centerIndex = objects.includes(center)
    ? objects.indexOf(center)
    : undefined;
  const offSet = objects.slice(0, centerIndex)
    .reduce((preVal, curObj) => {
      const curObjs = Array.isArray(curObj) ? curObj : [curObj];
      const shortest = getShortest(curObjs);
      return preVal + shortest.geometry.parameters[key];
    }, 0) * (centerIndex ? 1 : 0.5);
  const centerPosition = center
    ? center.position[axis] - (center.geometry.parameters[key] / 2)
    : 0;
  const alignFrom = centerPosition - offSet;
  objects.reduce((preVal, curObj) => {
    const curObjs = Array.isArray(curObj) ? curObj : [curObj];
    curObjs.map(obj => obj.position[axis] = preVal + (obj.geometry.parameters[key] / 2));
    const shortest = getShortest(curObjs);
    return preVal + shortest.geometry.parameters[key];
  }, alignFrom);
  return objects;
};

const pivotLimb = (object) => {
  const pivot = new THREE.Object3D();
  const parent = object.parent;
  const offset = object.geometry.parameters.height / 2;
  parent.remove(object);
  pivot.add(object);
  parent.add(pivot);
  pivot.position.y = object.position.y;
  object.position.y = -offset;
  pivot.position.y += offset;
  return pivot;
};

const Hair = ({ blockSize }) => {
  const [width, hieht, depth] = [blockSize * 8, blockSize * 2, blockSize * 8];
  const geometry = new THREE.BoxGeometry(width, hieht, depth);
  const material = new THREE.MeshBasicMaterial({ color: 0x403C3C });
  return new THREE.Mesh(geometry, material);
};

const Head = ({ blockSize }) => {
  const [width, hieht, depth] = [blockSize * 8, blockSize * 6, blockSize * 8];
  const geometry = new THREE.BoxGeometry(width, hieht, depth);
  const material = new THREE.MeshBasicMaterial({ color: 0xE7D8B6 });
  return new THREE.Mesh(geometry, material);
};

const Torso = ({ blockSize }) => {
  const [width, hieht, depth] = [blockSize * 8, blockSize * 12, blockSize * 4];
  const bodyGeometry = new THREE.BoxGeometry(width, hieht, depth);
  const material = new THREE.MeshBasicMaterial({ color: 0x6DD9AB });
  return new THREE.Mesh(bodyGeometry, material);
};

const Arm = ({ blockSize }) => {
  const [width, hieht, depth] = [blockSize * 4, blockSize * 12, blockSize * 4];
  const geometry = new THREE.BoxGeometry(width, hieht, depth);
  const material = new THREE.MeshBasicMaterial({ color: 0x7CC6C6 });
  return new THREE.Mesh(geometry, material);
};

const Leg = ({ blockSize }) => {
  const [width, hieht, depth] = [blockSize * 4, blockSize * 12, blockSize * 4];
  const geometry = new THREE.BoxGeometry(width, hieht, depth);
  const material = new THREE.MeshBasicMaterial({ color: 0x558A8A });
  return new THREE.Mesh(geometry, material);
};

export default ({
  name,
  blockSize,
}) => {
  const character = new THREE.Object3D();
  const hair = Hair({ blockSize });
  const head = Head({ blockSize });
  const torso = Torso({ blockSize });
  character.name = name;
  let [leftArm, rightArm] = [Arm({ blockSize }), Arm({ blockSize })];
  let [leftLeg, rightLeg] = [Leg({ blockSize }), Leg({ blockSize })];

  character.add(hair);
  character.add(head);
  character.add(torso);
  character.add(leftArm);
  character.add(rightArm);
  character.add(leftLeg);
  character.add(rightLeg);
  align('x', torso, [leftArm, torso, rightArm]);
  align('y', torso, [
    align('x', null, [rightLeg, leftLeg]),
    torso,
    head,
    hair,
  ]);
  [leftArm, rightArm, leftLeg, rightLeg] = [leftArm, rightArm, leftLeg, rightLeg].map(pivotLimb);

  character.walk = () => {
    const time = Date.now() * 0.005;
    leftLeg.rotation.x = Math.sin(time) * Math.cos(time);
    rightLeg.rotation.x = -Math.sin(time) * Math.cos(time);
    leftArm.rotation.x = -Math.sin(time) * Math.cos(time) * 0.3;
    rightArm.rotation.x = Math.sin(time) * Math.cos(time) * 0.3;
  };
  character.jump = () => {
    const time = Date.now() * 0.005;
    leftLeg.rotation.x = Math.sin(time);
    rightLeg.rotation.x = -Math.sin(time);
    leftArm.rotation.x = -Math.sin(time) * 0.5;
    rightArm.rotation.x = Math.sin(time) * 0.5;
    character.position.y = Math.sin(time) * 100;
  };
  return character;
};
