import * as THREE from 'three';
import { createHolographicMaterial, createWireframeMaterial } from '../utils/threeHelpers';

// 1. CYBER ROVER (Mars exploration 6-wheel rover)
export const createRoverModel = (colorHex = '#FF5B35') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.7,
    roughness: 0.4,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Main Deck Chassis
  const chassisGeo = new THREE.BoxGeometry(0.7, 0.25, 1.1);
  const chassis = new THREE.Mesh(chassisGeo, holoMat);
  chassis.position.y = 0.2;
  group.add(chassis);

  const chassisWire = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.26, 1.12),
    wireMat
  );
  chassisWire.position.y = 0.2;
  group.add(chassisWire);

  // 6 Rugged Wheels (3 left, 3 right)
  const wheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16);
  const zPositions = [-0.4, 0, 0.4];

  zPositions.forEach((z) => {
    const wheelL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelL.rotation.z = Math.PI / 2;
    wheelL.position.set(-0.45, -0.05, z);
    group.add(wheelL);

    const wheelR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelR.rotation.z = Math.PI / 2;
    wheelR.position.set(0.45, -0.05, z);
    group.add(wheelR);
  });

  // Mast Camera Turret
  const mastGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.55);
  const mast = new THREE.Mesh(mastGeo, darkMetal);
  mast.position.set(-0.2, 0.55, -0.3);
  group.add(mast);

  const camHeadGeo = new THREE.BoxGeometry(0.28, 0.14, 0.18);
  const camHead = new THREE.Mesh(camHeadGeo, holoMat);
  camHead.position.set(-0.2, 0.82, -0.3);
  group.add(camHead);

  // High-gain communications dish
  const dishGeo = new THREE.ConeGeometry(0.22, 0.15, 16, 1, true);
  const dish = new THREE.Mesh(dishGeo, holoMat);
  dish.position.set(0.18, 0.45, 0.25);
  dish.rotation.x = -Math.PI / 4;
  group.add(dish);

  return group;
};

// 2. SENTINEL MECH
export const createMechModel = (colorHex = '#00F0FF') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const armorMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.15,
  });
  const visorMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const wireMat = createWireframeMaterial('#ffffff');

  // Armored Torso
  const torsoGeo = new THREE.BoxGeometry(0.75, 0.85, 0.55);
  const torso = new THREE.Mesh(torsoGeo, armorMat);
  torso.position.y = 0.25;
  group.add(torso);

  const torsoHolo = new THREE.Mesh(
    new THREE.BoxGeometry(0.77, 0.87, 0.57),
    wireMat
  );
  torsoHolo.position.y = 0.25;
  group.add(torsoHolo);

  // Head Unit
  const headGeo = new THREE.BoxGeometry(0.45, 0.38, 0.48);
  const head = new THREE.Mesh(headGeo, holoMat);
  head.position.set(0, 0.85, 0.05);
  group.add(head);

  // Optical Visor
  const visorGeo = new THREE.BoxGeometry(0.38, 0.12, 0.08);
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.85, 0.3);
  group.add(visor);

  // Shoulder Missile Pods
  const podGeo = new THREE.BoxGeometry(0.3, 0.4, 0.45);
  const podL = new THREE.Mesh(podGeo, holoMat);
  podL.position.set(-0.62, 0.45, -0.05);
  group.add(podL);

  const podR = podL.clone();
  podR.position.set(0.62, 0.45, -0.05);
  group.add(podR);

  // Articulated Legs
  const legGeo = new THREE.BoxGeometry(0.26, 0.7, 0.32);
  const legL = new THREE.Mesh(legGeo, armorMat);
  legL.position.set(-0.25, -0.35, 0);
  group.add(legL);

  const legR = legL.clone();
  legR.position.set(0.25, -0.35, 0);
  group.add(legR);

  return group;
};

// 3. INDUSTRIAL ROBOT ARM
export const createArmModel = (colorHex = '#FFB800') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Solid Pedestal Base
  const baseGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.2, 24);
  const base = new THREE.Mesh(baseGeo, metalMat);
  base.position.y = -0.4;
  group.add(base);

  // Shoulder Pivot Cylinder
  const pivotGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.3, 16);
  const pivot = new THREE.Mesh(pivotGeo, holoMat);
  pivot.position.y = -0.15;
  group.add(pivot);

  // Lower Arm Section (Angled up and forward)
  const arm1Geo = new THREE.BoxGeometry(0.22, 0.8, 0.22);
  const arm1 = new THREE.Mesh(arm1Geo, metalMat);
  arm1.position.set(0, 0.2, 0.15);
  arm1.rotation.x = -0.35;
  group.add(arm1);

  // Elbow Joint
  const elbowGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const elbow = new THREE.Mesh(elbowGeo, holoMat);
  elbow.position.set(0, 0.55, 0.3);
  group.add(elbow);

  // Upper Forearm Section (Horizontal)
  const arm2Geo = new THREE.BoxGeometry(0.18, 0.18, 0.75);
  const arm2 = new THREE.Mesh(arm2Geo, holoMat);
  arm2.position.set(0, 0.55, 0.65);
  group.add(arm2);

  const arm2Wire = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.19, 0.77),
    wireMat
  );
  arm2Wire.position.set(0, 0.55, 0.65);
  group.add(arm2Wire);

  // Rotating Wrist & Gripper Claws
  const wristGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.15, 16);
  const wrist = new THREE.Mesh(wristGeo, metalMat);
  wrist.rotation.x = Math.PI / 2;
  wrist.position.set(0, 0.55, 1.05);
  group.add(wrist);

  const clawGeo = new THREE.BoxGeometry(0.04, 0.25, 0.18);
  const clawL = new THREE.Mesh(clawGeo, holoMat);
  clawL.position.set(-0.1, 0.55, 1.2);
  group.add(clawL);

  const clawR = clawL.clone();
  clawR.position.set(0.1, 0.55, 1.2);
  group.add(clawR);

  // Center group bounding
  group.position.z = -0.4;

  return group;
};

// 4. AI SECURITY POD
export const createCyborgModel = (colorHex = '#00FF66') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const wireMat = createWireframeMaterial('#ffffff');

  // Central Recon Sphere
  const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const sphere = new THREE.Mesh(sphereGeo, holoMat);
  group.add(sphere);

  const wireSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.57, 16, 16),
    wireMat
  );
  group.add(wireSphere);

  // Glowing Optical Sensor Eye
  const eyeGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const eye = new THREE.Mesh(eyeGeo, coreMat);
  eye.position.set(0, 0, 0.45);
  group.add(eye);

  // Dual Stabilizer Wings
  const wingGeo = new THREE.BoxGeometry(1.6, 0.05, 0.45);
  const wings = new THREE.Mesh(wingGeo, holoMat);
  wings.position.y = 0;
  group.add(wings);

  // Rotating Scan Ring
  const ringGeo = new THREE.TorusGeometry(0.85, 0.03, 16, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: colorHex });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  group.add(ring);

  return group;
};
