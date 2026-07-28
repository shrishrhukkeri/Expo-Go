import * as THREE from 'three';

export const setupThreeContext = (gl, width, height) => {
  // Create WebGLRenderer compatible with React Native Expo GL
  const renderer = new THREE.WebGLRenderer({
    canvas: {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
      clientHeight: gl.drawingBufferHeight,
      clientWidth: gl.drawingBufferWidth,
    },
    context: gl,
    antialias: false,
    alpha: true,
  });

  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  renderer.setClearColor(0x000000, 0); // Transparent so camera shows through
  renderer.setPixelRatio(1);

  // Create Scene
  const scene = new THREE.Scene();

  // Create PerspectiveCamera
  const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.set(0, 0.5, 3.8);
  camera.lookAt(0, 0.35, 0);

  // Add Ethereal Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 0.8);
  dirLight2.position.set(-5, -3, -5);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xff0055, 1.5, 10);
  pointLight.position.set(0, 2, 2);
  scene.add(pointLight);

  // Create a True 3D Holographic Surface Ground Grid & Contact Shadow at y = 0
  const floorGroup = new THREE.Group();
  floorGroup.position.y = 0;

  // 1. Dark Radial Contact Shadow (anchors object to physical table/floor)
  const shadowGeo = new THREE.CircleGeometry(0.55, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = Math.PI / 2;
  shadowMesh.position.y = 0.001;
  floorGroup.add(shadowMesh);

  // 2. Outer Holographic Surface Target Ring
  const outerRingGeo = new THREE.RingGeometry(0.75, 0.78, 48);
  const holoRingMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, holoRingMat);
  outerRing.rotation.x = Math.PI / 2;
  outerRing.position.y = 0.002;
  floorGroup.add(outerRing);

  // 3. Inner Holographic Surface Ring
  const innerRingGeo = new THREE.RingGeometry(0.42, 0.44, 48);
  const innerRing = new THREE.Mesh(innerRingGeo, holoRingMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.002;
  floorGroup.add(innerRing);

  // 4. 3D Cardinal Tick Marks on the Ground Plane
  const tickGeo = new THREE.BoxGeometry(0.14, 0.004, 0.015);
  const tickMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

  const tickN = new THREE.Mesh(tickGeo, tickMat);
  tickN.position.set(0, 0.003, -0.76);
  tickN.rotation.y = Math.PI / 2;
  floorGroup.add(tickN);

  const tickS = new THREE.Mesh(tickGeo, tickMat);
  tickS.position.set(0, 0.003, 0.76);
  tickS.rotation.y = Math.PI / 2;
  floorGroup.add(tickS);

  const tickE = new THREE.Mesh(tickGeo, tickMat);
  tickE.position.set(0.76, 0.003, 0);
  floorGroup.add(tickE);

  const tickW = new THREE.Mesh(tickGeo, tickMat);
  tickW.position.set(-0.76, 0.003, 0);
  floorGroup.add(tickW);

  scene.add(floorGroup);

  return { renderer, scene, camera, lights: { ambientLight, dirLight1, dirLight2, pointLight }, floorGroup };
};

export const createHolographicMaterial = (colorHex, opacity = 0.85) => {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    metalness: 0.3,
    roughness: 0.1,
    transmission: 0,
    opacity: opacity,
    transparent: true,
    wireframe: false,
    emissive: new THREE.Color(colorHex),
    emissiveIntensity: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
};

export const createWireframeMaterial = (colorHex) => {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorHex),
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
};
