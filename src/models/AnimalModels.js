import * as THREE from 'three';
import { createHolographicMaterial, createWireframeMaterial } from '../utils/threeHelpers';

// 1. MAJESTIC AFRICAN LION
export const createLionModel = (colorHex = '#FFB800') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.2,
    roughness: 0.7,
  });
  const maneMat = new THREE.MeshStandardMaterial({
    color: 0x92400e,
    metalness: 0.1,
    roughness: 0.8,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Muscled Quadruped Torso (centered so legs reach y = 0)
  const torsoGeo = new THREE.BoxGeometry(0.55, 0.45, 0.9);
  const torso = new THREE.Mesh(torsoGeo, bodyMat);
  torso.position.set(0, 0.45, 0);
  group.add(torso);

  const torsoWire = new THREE.Mesh(
    new THREE.BoxGeometry(0.57, 0.47, 0.92),
    wireMat
  );
  torsoWire.position.set(0, 0.45, 0);
  group.add(torsoWire);

  // Sculpted Golden Mane around neck & shoulders
  const maneGeo = new THREE.DodecahedronGeometry(0.38, 1);
  const mane = new THREE.Mesh(maneGeo, maneMat);
  mane.position.set(0, 0.62, 0.35);
  group.add(mane);

  // Lion Head & Snout
  const headGeo = new THREE.BoxGeometry(0.32, 0.3, 0.35);
  const head = new THREE.Mesh(headGeo, holoMat);
  head.position.set(0, 0.65, 0.58);
  group.add(head);

  // 4 Sturdy Legs resting exactly at y = 0
  const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.45, 12);
  const legPositions = [
    [-0.2, 0.225, 0.32],
    [0.2, 0.225, 0.32],
    [-0.2, 0.225, -0.32],
    [0.2, 0.225, -0.32],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, bodyMat);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // Articulated Tail & Tuft
  const tailGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.55, 8);
  const tail = new THREE.Mesh(tailGeo, bodyMat);
  tail.position.set(0, 0.5, -0.65);
  tail.rotation.x = -Math.PI / 4;
  group.add(tail);

  const tuftGeo = new THREE.SphereGeometry(0.07, 8, 8);
  const tuft = new THREE.Mesh(tuftGeo, maneMat);
  tuft.position.set(0, 0.72, -0.85);
  group.add(tuft);

  return group;
};

// 2. ALPHA TIMBER WOLF
export const createWolfModel = (colorHex = '#00F0FF') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const wolfMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.2,
    roughness: 0.6,
  });
  const chestMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.1,
    roughness: 0.7,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Sleek Hunting Torso
  const torsoGeo = new THREE.BoxGeometry(0.44, 0.38, 0.86);
  const torso = new THREE.Mesh(torsoGeo, wolfMat);
  torso.position.set(0, 0.45, 0);
  group.add(torso);

  const torsoWire = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.4, 0.88),
    wireMat
  );
  torsoWire.position.set(0, 0.45, 0);
  group.add(torsoWire);

  // Angled Chest
  const chestGeo = new THREE.BoxGeometry(0.4, 0.36, 0.35);
  const chest = new THREE.Mesh(chestGeo, chestMat);
  chest.position.set(0, 0.45, 0.25);
  group.add(chest);

  // Wolf Head & Sharp Snout
  const headGeo = new THREE.BoxGeometry(0.26, 0.26, 0.34);
  const head = new THREE.Mesh(headGeo, holoMat);
  head.position.set(0, 0.6, 0.55);
  group.add(head);

  const snoutGeo = new THREE.ConeGeometry(0.12, 0.26, 4);
  const snout = new THREE.Mesh(snoutGeo, wolfMat);
  snout.position.set(0, 0.56, 0.76);
  snout.rotation.x = Math.PI / 2;
  snout.rotation.y = Math.PI / 4;
  group.add(snout);

  // Pointed Triangular Ears
  const earGeo = new THREE.ConeGeometry(0.06, 0.18, 4);
  const earL = new THREE.Mesh(earGeo, wolfMat);
  earL.position.set(-0.09, 0.78, 0.52);
  group.add(earL);

  const earR = earL.clone();
  earR.position.set(0.09, 0.78, 0.52);
  group.add(earR);

  // 4 Agile Legs resting at y = 0
  const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.45, 12);
  const legPositions = [
    [-0.16, 0.225, 0.3],
    [0.16, 0.225, 0.3],
    [-0.16, 0.225, -0.3],
    [0.16, 0.225, -0.3],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, wolfMat);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // Bushy Tail
  const tailGeo = new THREE.ConeGeometry(0.1, 0.5, 8);
  const tail = new THREE.Mesh(tailGeo, wolfMat);
  tail.position.set(0, 0.45, -0.65);
  tail.rotation.x = -Math.PI / 3;
  group.add(tail);

  return group;
};

// 3. STALLION HORSE
export const createHorseModel = (colorHex = '#FF5B35') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const horseMat = new THREE.MeshStandardMaterial({
    color: 0x9a3412,
    metalness: 0.3,
    roughness: 0.5,
  });
  const maneMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.2,
    roughness: 0.6,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Equestrian Body
  const torsoGeo = new THREE.BoxGeometry(0.5, 0.44, 0.96);
  const torso = new THREE.Mesh(torsoGeo, horseMat);
  torso.position.set(0, 0.5, 0);
  group.add(torso);

  const torsoWire = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.46, 0.98),
    wireMat
  );
  torsoWire.position.set(0, 0.5, 0);
  group.add(torsoWire);

  // Arched Neck
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.22, 0.48, 12);
  const neck = new THREE.Mesh(neckGeo, horseMat);
  neck.position.set(0, 0.75, 0.4);
  neck.rotation.x = Math.PI / 6;
  group.add(neck);

  // Horse Head
  const headGeo = new THREE.BoxGeometry(0.22, 0.24, 0.38);
  const head = new THREE.Mesh(headGeo, holoMat);
  head.position.set(0, 0.92, 0.58);
  head.rotation.x = -Math.PI / 12;
  group.add(head);

  // Flowing Mane along neck
  const maneGeo = new THREE.BoxGeometry(0.06, 0.45, 0.15);
  const mane = new THREE.Mesh(maneGeo, maneMat);
  mane.position.set(0, 0.8, 0.28);
  mane.rotation.x = Math.PI / 6;
  group.add(mane);

  // 4 Tall Legs with Hooves at y = 0
  const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.5, 12);
  const legPositions = [
    [-0.18, 0.25, 0.35],
    [0.18, 0.25, 0.35],
    [-0.18, 0.25, -0.35],
    [0.18, 0.25, -0.35],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, horseMat);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // Long Tail
  const tailGeo = new THREE.CylinderGeometry(0.06, 0.02, 0.6, 8);
  const tail = new THREE.Mesh(tailGeo, maneMat);
  tail.position.set(0, 0.45, -0.65);
  tail.rotation.x = -Math.PI / 4;
  group.add(tail);

  return group;
};

// 4. SOARING GOLDEN EAGLE
export const createEagleModel = (colorHex = '#FFB800') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0x78350f,
    metalness: 0.2,
    roughness: 0.7,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.5,
    roughness: 0.3,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Rock Pedestal resting at y = 0
  const rockGeo = new THREE.CylinderGeometry(0.25, 0.35, 0.25, 8);
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.1,
    roughness: 0.9,
  });
  const rock = new THREE.Mesh(rockGeo, rockMat);
  rock.position.set(0, 0.125, 0);
  group.add(rock);

  // Aerodynamic Raptorial Body
  const bodyGeo = new THREE.ConeGeometry(0.22, 0.65, 12);
  const body = new THREE.Mesh(bodyGeo, featherMat);
  body.position.set(0, 0.5, 0);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  // Broad Majestic Wingspan (Left & Right)
  const wingGeo = new THREE.BoxGeometry(1.5, 0.04, 0.4);
  const wingL = new THREE.Mesh(wingGeo, featherMat);
  wingL.position.set(-0.85, 0.55, 0);
  wingL.rotation.z = 0.15;
  group.add(wingL);

  const wingLWire = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.05, 0.42),
    wireMat
  );
  wingLWire.position.set(-0.85, 0.55, 0);
  wingLWire.rotation.z = 0.15;
  group.add(wingLWire);

  const wingR = new THREE.Mesh(wingGeo, featherMat);
  wingR.position.set(0.85, 0.55, 0);
  wingR.rotation.z = -0.15;
  group.add(wingR);

  const wingRWire = wingLWire.clone();
  wingRWire.position.set(0.85, 0.55, 0);
  wingRWire.rotation.z = -0.15;
  group.add(wingRWire);

  // Golden Wingtip Feathers
  const tipGeo = new THREE.BoxGeometry(0.35, 0.03, 0.38);
  const tipL = new THREE.Mesh(tipGeo, goldMat);
  tipL.position.set(-1.65, 0.68, 0);
  group.add(tipL);

  const tipR = tipL.clone();
  tipR.position.set(1.65, 0.68, 0);
  group.add(tipR);

  // Raptor Head & Hooked Yellow Beak
  const headGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const head = new THREE.Mesh(headGeo, holoMat);
  head.position.set(0, 0.6, 0.35);
  group.add(head);

  const beakGeo = new THREE.ConeGeometry(0.08, 0.22, 8);
  const beak = new THREE.Mesh(beakGeo, goldMat);
  beak.position.set(0, 0.56, 0.54);
  beak.rotation.x = Math.PI / 3;
  group.add(beak);

  // Tail Feathers
  const tailGeo = new THREE.BoxGeometry(0.35, 0.03, 0.45);
  const tail = new THREE.Mesh(tailGeo, featherMat);
  tail.position.set(0, 0.45, -0.45);
  tail.rotation.x = -0.2;
  group.add(tail);

  return group;
};
