import * as THREE from 'three';
import { createHolographicMaterial, createWireframeMaterial } from '../utils/threeHelpers';

// 1. MODERN PAVILION (Architectural concept with canopy roof and terrace)
export const createPavilionModel = (colorHex = '#A855F7') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.5,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x60a5fa,
    metalness: 0.8,
    roughness: 0.1,
    transparent: true,
    opacity: 0.65,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Terrace Base
  const baseGeo = new THREE.BoxGeometry(1.6, 0.08, 1.2);
  const base = new THREE.Mesh(baseGeo, concreteMat);
  base.position.y = -0.4;
  group.add(base);

  const baseWire = new THREE.Mesh(
    new THREE.BoxGeometry(1.62, 0.09, 1.22),
    wireMat
  );
  baseWire.position.y = -0.4;
  group.add(baseWire);

  // 4 Structural Columns
  const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.85, 12);
  const colPositions = [
    [-0.65, 0.05, -0.45],
    [0.65, 0.05, -0.45],
    [-0.65, 0.05, 0.45],
    [0.65, 0.05, 0.45],
  ];

  colPositions.forEach(([x, y, z]) => {
    const col = new THREE.Mesh(colGeo, concreteMat);
    col.position.set(x, y, z);
    group.add(col);
  });

  // Glass Curtain Wall Interior
  const glassGeo = new THREE.BoxGeometry(1.1, 0.75, 0.8);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 0.05;
  group.add(glass);

  // Modernist Canopy Roof (Slightly angled cantilever)
  const roofGeo = new THREE.BoxGeometry(1.75, 0.08, 1.35);
  const roof = new THREE.Mesh(roofGeo, holoMat);
  roof.position.set(0, 0.52, 0);
  roof.rotation.x = -0.05;
  group.add(roof);

  const roofWire = new THREE.Mesh(
    new THREE.BoxGeometry(1.77, 0.09, 1.37),
    wireMat
  );
  roofWire.position.set(0, 0.52, 0);
  roofWire.rotation.x = -0.05;
  group.add(roofWire);

  return group;
};

// 2. HELIX SKYSCRAPER (Parametric twisted tower)
export const createTowerModel = (colorHex = '#00F0FF') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.2,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Central Structural Core
  const coreGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.5, 16);
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.y = 0.25;
  group.add(core);

  // 7 Helical Twisted Floor Plates
  const floorGeo = new THREE.BoxGeometry(0.78, 0.06, 0.78);
  const levels = 7;
  for (let i = 0; i < levels; i++) {
    const yPos = -0.35 + (i * 1.2) / (levels - 1);
    const angle = i * 0.25;

    const floor = new THREE.Mesh(floorGeo, holoMat);
    floor.position.y = yPos;
    floor.rotation.y = angle;
    group.add(floor);

    const floorWire = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.065, 0.8),
      wireMat
    );
    floorWire.position.y = yPos;
    floorWire.rotation.y = angle;
    group.add(floorWire);
  }

  // Vertical Antenna Spire
  const spireGeo = new THREE.CylinderGeometry(0.015, 0.03, 0.45);
  const spire = new THREE.Mesh(spireGeo, holoMat);
  spire.position.y = 1.2;
  group.add(spire);

  return group;
};

// 3. SUSPENSION BRIDGE (Cable-stayed engineering model)
export const createBridgeModel = (colorHex = '#FF5B35') => {
  const group = new THREE.Group();
  const holoMat = createHolographicMaterial(colorHex, 0.85);
  const pylonMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const wireMat = createWireframeMaterial('#ffffff');

  // Road Deck
  const deckGeo = new THREE.BoxGeometry(1.8, 0.06, 0.45);
  const deck = new THREE.Mesh(deckGeo, holoMat);
  deck.position.y = -0.15;
  group.add(deck);

  const deckWire = new THREE.Mesh(
    new THREE.BoxGeometry(1.82, 0.07, 0.47),
    wireMat
  );
  deckWire.position.y = -0.15;
  group.add(deckWire);

  // Twin H-Pylons
  const pylonGeo = new THREE.BoxGeometry(0.12, 1.1, 0.12);
  const pylonL = new THREE.Mesh(pylonGeo, pylonMat);
  pylonL.position.set(-0.5, 0.35, 0);
  group.add(pylonL);

  const pylonR = new THREE.Mesh(pylonGeo, pylonMat);
  pylonR.position.set(0.5, 0.35, 0);
  group.add(pylonR);

  // Crossbeam connecting pylons at top
  const crossGeo = new THREE.BoxGeometry(0.12, 0.06, 0.5);
  const crossL = new THREE.Mesh(crossGeo, holoMat);
  crossL.position.set(-0.5, 0.82, 0);
  group.add(crossL);

  const crossR = new THREE.Mesh(crossGeo, holoMat);
  crossR.position.set(0.5, 0.82, 0);
  group.add(crossR);

  // Suspension Cable Arcs (using angled cylinders)
  const cableGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.9);
  const cableMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Left pylon cables to deck ends
  const c1 = new THREE.Mesh(cableGeo, cableMat);
  c1.position.set(-0.7, 0.25, 0.15);
  c1.rotation.z = 0.6;
  group.add(c1);

  const c2 = new THREE.Mesh(cableGeo, cableMat);
  c2.position.set(0.7, 0.25, 0.15);
  c2.rotation.z = -0.6;
  group.add(c2);

  return group;
};

// 4. ETHEREAL DESIGNER CHAIR
export const createChairModel = (colorHex = '#FF0055') => {
  const group = new THREE.Group();
  const mat = createHolographicMaterial(colorHex, 0.85);
  const legMat = new THREE.MeshStandardMaterial({
    color: 0xddeeff,
    metalness: 0.8,
    roughness: 0.2,
  });

  // Seat
  const seatGeo = new THREE.BoxGeometry(1.2, 0.12, 1.1);
  const seat = new THREE.Mesh(seatGeo, mat);
  seat.position.y = 0;
  group.add(seat);

  // Curved Backrest
  const backGeo = new THREE.BoxGeometry(1.1, 1.0, 0.12);
  const back = new THREE.Mesh(backGeo, mat);
  back.position.set(0, 0.55, -0.48);
  back.rotation.x = -0.15;
  group.add(back);

  // Transparent Armrests
  const armMat = createHolographicMaterial('#ffffff', 0.5);
  const armLGeo = new THREE.BoxGeometry(0.1, 0.45, 0.9);
  const armL = new THREE.Mesh(armLGeo, armMat);
  armL.position.set(-0.55, 0.25, -0.05);
  armL.rotation.z = -0.1;
  group.add(armL);

  const armR = armL.clone();
  armR.position.set(0.55, 0.25, -0.05);
  armR.rotation.z = 0.1;
  group.add(armR);

  // Metallic Chrome Legs
  const legGeo = new THREE.CylinderGeometry(0.03, 0.02, 1.1, 16);
  const leg1 = new THREE.Mesh(legGeo, legMat);
  leg1.position.set(-0.5, -0.55, 0.45);
  leg1.rotation.z = 0.12;
  leg1.rotation.x = -0.12;
  group.add(leg1);

  const leg2 = leg1.clone();
  leg2.position.set(0.5, -0.55, 0.45);
  leg2.rotation.z = -0.12;
  group.add(leg2);

  const leg3 = leg1.clone();
  leg3.position.set(-0.45, -0.55, -0.45);
  leg3.rotation.x = 0.12;
  group.add(leg3);

  const leg4 = leg1.clone();
  leg4.position.set(0.45, -0.55, -0.45);
  leg4.rotation.z = -0.12;
  leg4.rotation.x = 0.12;
  group.add(leg4);

  return group;
};
