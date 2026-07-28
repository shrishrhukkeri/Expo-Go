import * as THREE from 'three';
import { createHolographicMaterial, createWireframeMaterial } from '../utils/threeHelpers';

// 1. ORBITAL SATELLITE
export const createSatelliteModel = (colorHex = '#00F0FF') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.15,
  });
  const solarMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Central hexagonal instrument bus
  const bodyGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.75, 6);
  const body = new THREE.Mesh(bodyGeo, chromeMat);
  group.add(body);

  const bodyAccent = new THREE.Mesh(
    new THREE.CylinderGeometry(0.29, 0.29, 0.7, 6),
    wireMat
  );
  group.add(bodyAccent);

  // High-gain communications dish antenna
  const dishGeo = new THREE.ConeGeometry(0.38, 0.22, 24, 1, true);
  const dish = new THREE.Mesh(dishGeo, holoMat);
  dish.position.set(0, 0.58, 0.15);
  dish.rotation.x = Math.PI;
  group.add(dish);

  // Boom mast connecting dish
  const mastGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.3);
  const mast = new THREE.Mesh(mastGeo, chromeMat);
  mast.position.set(0, 0.45, 0.08);
  group.add(mast);

  // Dual Solar Panel Wings (Left & Right)
  const wingGeo = new THREE.BoxGeometry(1.4, 0.03, 0.5);
  const wingL = new THREE.Mesh(wingGeo, solarMat);
  wingL.position.set(-0.95, 0, 0);
  group.add(wingL);

  const wingLGrid = new THREE.Mesh(
    new THREE.BoxGeometry(1.41, 0.035, 0.51),
    wireMat
  );
  wingLGrid.position.set(-0.95, 0, 0);
  group.add(wingLGrid);

  const wingR = new THREE.Mesh(wingGeo, solarMat);
  wingR.position.set(0.95, 0, 0);
  group.add(wingR);

  const wingRGrid = wingLGrid.clone();
  wingRGrid.position.set(0.95, 0, 0);
  group.add(wingRGrid);

  // Thruster nozzle base
  const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.22, 16);
  const nozzle = new THREE.Mesh(nozzleGeo, holoMat);
  nozzle.position.set(0, -0.45, 0);
  group.add(nozzle);

  return group;
};

// 2. RECON QUADCOPTER DRONE
export const createDroneModel = (colorHex = '#00FF66') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.2,
  });
  const lensMat = new THREE.MeshBasicMaterial({ color: 0x00ff66 });
  const wireMat = createWireframeMaterial('#ffffff');

  // Central Fuselage Chassis
  const chassisGeo = new THREE.BoxGeometry(0.5, 0.18, 0.5);
  const chassis = new THREE.Mesh(chassisGeo, carbonMat);
  group.add(chassis);

  const chassisHolo = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.19, 0.52),
    wireMat
  );
  group.add(chassisHolo);

  // Cross Frame Arms
  const armGeo1 = new THREE.BoxGeometry(1.6, 0.06, 0.12);
  const arm1 = new THREE.Mesh(armGeo1, carbonMat);
  arm1.rotation.y = Math.PI / 4;
  group.add(arm1);

  const arm2 = new THREE.Mesh(armGeo1, carbonMat);
  arm2.rotation.y = -Math.PI / 4;
  group.add(arm2);

  // 4 Rotor Shrouds & Spinning Rotor Blades
  const shroudGeo = new THREE.TorusGeometry(0.24, 0.025, 12, 32);
  const positions = [
    [-0.55, 0.05, -0.55],
    [0.55, 0.05, -0.55],
    [-0.55, 0.05, 0.55],
    [0.55, 0.05, 0.55],
  ];

  positions.forEach(([x, y, z]) => {
    const shroud = new THREE.Mesh(shroudGeo, holoMat);
    shroud.position.set(x, y, z);
    shroud.rotation.x = Math.PI / 2;
    group.add(shroud);

    const bladeGeo = new THREE.BoxGeometry(0.44, 0.012, 0.05);
    const blade = new THREE.Mesh(bladeGeo, wireMat);
    blade.position.set(x, y, z);
    group.add(blade);
  });

  // Gimbal Optoelectronic Camera Dome
  const domeGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const dome = new THREE.Mesh(domeGeo, holoMat);
  dome.position.set(0, -0.16, 0.08);
  group.add(dome);

  const lensGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.position.set(0, -0.16, 0.22);
  group.add(lens);

  // Landing Skids
  const skidGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8);
  const skidL = new THREE.Mesh(skidGeo, carbonMat);
  skidL.position.set(-0.25, -0.22, 0);
  skidL.rotation.x = Math.PI / 2;
  group.add(skidL);

  const skidR = skidL.clone();
  skidR.position.set(0.25, -0.22, 0);
  group.add(skidR);

  return group;
};

// 3. INTERSTELLAR CRUISER
export const createRocketModel = (colorHex = '#FFB800') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.15,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x60a5fa,
    metalness: 0.8,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7,
  });

  // Main Fuselage Cylinder
  const bodyGeo = new THREE.CylinderGeometry(0.24, 0.32, 1.1, 24);
  const body = new THREE.Mesh(bodyGeo, hullMat);
  group.add(body);

  // Aerodynamic Nose Cone
  const noseGeo = new THREE.ConeGeometry(0.24, 0.5, 24);
  const nose = new THREE.Mesh(noseGeo, holoMat);
  nose.position.y = 0.8;
  group.add(nose);

  // Swept Delta Fins (3 symmetric fins)
  const finGeo = new THREE.BoxGeometry(0.04, 0.45, 0.55);
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const fin = new THREE.Mesh(finGeo, holoMat);
    fin.position.set(Math.cos(angle) * 0.32, -0.32, Math.sin(angle) * 0.32);
    fin.rotation.y = -angle;
    fin.rotation.x = 0.35;
    group.add(fin);
  }

  // Cockpit Canopy
  const canopyGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const canopy = new THREE.Mesh(canopyGeo, glassMat);
  canopy.position.set(0, 0.35, 0.15);
  canopy.scale.set(1.0, 1.4, 0.8);
  group.add(canopy);

  // Propulsion Ring
  const ringGeo = new THREE.TorusGeometry(0.48, 0.025, 16, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: colorHex });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.y = -0.45;
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  return group;
};

// 4. SPACE HABITAT
export const createStationModel = (colorHex = '#A855F7') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Outer Toroidal Habitat Ring
  const torusGeo = new THREE.TorusGeometry(0.85, 0.14, 24, 64);
  const torus = new THREE.Mesh(torusGeo, metalMat);
  torus.rotation.x = Math.PI / 2;
  group.add(torus);

  const torusAccent = new THREE.Mesh(
    new THREE.TorusGeometry(0.86, 0.15, 12, 32),
    wireMat
  );
  torusAccent.rotation.x = Math.PI / 2;
  group.add(torusAccent);

  // Central Hub Cylinder
  const hubGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16);
  const hub = new THREE.Mesh(hubGeo, holoMat);
  group.add(hub);

  // 4 Radial Connecting Spoke Arms
  const spokeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.7, 8);
  const spoke1 = new THREE.Mesh(spokeGeo, metalMat);
  spoke1.rotation.z = Math.PI / 2;
  group.add(spoke1);

  const spoke2 = new THREE.Mesh(spokeGeo, metalMat);
  spoke2.rotation.x = Math.PI / 2;
  group.add(spoke2);

  // Vertical Communications Spire
  const spireGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8);
  const spire = new THREE.Mesh(spireGeo, holoMat);
  group.add(spire);

  return group;
};
