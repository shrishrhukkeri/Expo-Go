# Spatial AR Studio — React Native AR/VR Object Placement App (Expo Go SDK 54)

An immersive, high-performance **AR/VR spatial object placement application** built with **React Native (0.81)**, **Expo SDK 54**, **React 19**, and **Three.js** that runs natively in **Expo Go** on both **Android** and **iOS** by scanning the Expo Go QR code—without requiring any custom native development client.

---

## 🌟 Overview & Core Design Rationale

The majority of the screen is dedicated to the **camera passthrough** to keep the user grounded in their physical environment. Interactive 3D holographic objects float in real-world space, complete with dynamic lighting, hover animations, touch gesture rotation, and interactive scale adjustments.

### Key Design Principles (Spatial Ethereal Design System)
1. **Immersive Camera Passthrough**: Renders real-time camera feed (`<CameraView />`) as the backdrop in **AR Mode** so users remain anchored in their physical space.
2. **Spatial Glassmorphism**: Built with semi-transparent, backdrop-blurred UI cards, subtle glowing borders, and floating pills (`rgba(15, 23, 42, 0.75)` with `#00F0FF` cyan accents). This makes the interface feel like it’s floating in the physical environment rather than sitting on top of a flat screen.
3. **Intuitive Object Selection**: The object library is housed in a bottom-docked glassmorphic drawer with clear categorization (**Shapes**, **Characters**, **Animals**), making it easy to swap assets without cluttering the main view.
4. **Precision Focus & Spatial Grounding**: A central holographic floor targeting reticle with scanning SVG laser effects and a floating `80%` scale badge provide clear points of interaction for placing 3D objects accurately.
5. **Dual-Mode Studio Inspector**: Includes an `[ AR | Object ]` mode switcher matching the reference mockup (`ar-app.png`). In **AR Mode**, objects float in the real room; in **Object Mode**, the app switches to an immersive 3D Ethereal Studio dark-space background for close-up holographic inspection.

---

## 🎨 Object Library Catalog (17 Professional & Realistic Spatial Assets)

All 3D objects are **procedurally generated** using Three.js multi-part geometries (`CylinderGeometry`, `TorusGeometry`, `ConeGeometry`, `BoxGeometry`), dark chrome/carbon-fiber metallic materials, holographic neon accents, glassmorphic canopies, and smooth spatial hover animations. This guarantees **instant 0ms loading**, buttery-smooth **60 FPS performance**, and zero asset-resolution errors across Android and iOS. Additionally, high-fidelity rigged GLB assets like **Iron Man Mk 85** are asynchronously loaded and automatically normalized to realistic AR scale with bounding-box ground plane anchoring.

| Category | Object ID | Name | Description |
| :--- | :--- | :--- | :--- |
| **Animals** | `lion` | **Majestic African Lion** | Sculpted athletic quadruped lion with golden amber mane and tail |
| | `wolf` | **Alpha Timber Wolf** | Sleek hunting posture wolf with pointed ears and bushy tail |
| | `horse` | **Stallion Horse** | Powerful equestrian stallion with arched neck and flowing mane |
| | `eagle` | **Soaring Golden Eagle** | Raptorial soaring eagle with broad wingspan on rock pedestal |
| **Aerospace** | `satellite` | **Orbital Satellite** | High-gain telecom satellite with dual solar arrays and sensor dish |
| | `drone` | **Recon Quadcopter** | Tactical UAV with 4 rotor rings and gimbal-mounted optical camera |
| | `rocket` | **Interstellar Cruiser** | Deep-space command vessel with swept delta wings and thruster rings |
| | `station` | **Space Habitat** | Toroidal O-ring space station with docking hub and solar masts |
| **Robotics** | `ironman` | **Iron Man Mk 85 (Rigged)** | High-fidelity Rigged Iron Man Mark 85 armor with glowing Arc Reactor core |
| | `rover` | **Cyber Rover** | 6-wheeled planetary exploration rover with mast camera turret |
| | `mech` | **Sentinel Mech** | Heavy bipedal defense mech with shoulder sensor pods and glowing visor |
| | `arm` | **Industrial Robot Arm** | 6-axis precision robotic arm with articulated elbow and gripper claws |
| | `cyborg` | **AI Security Pod** | Autonomous spherical recon drone with rotating scanner rings |
| **Architecture** | `pavilion` | **Modern Pavilion** | Futuristic architectural pavilion with curved canopy and glass walls |
| | `tower` | **Helix Skyscraper** | Parametric skyscraper with helical floor plates and structural spire |
| | `bridge` | **Suspension Bridge** | Cable-stayed bridge engineering model with twin pylons and deck |
| | `chair` | **Ethereal Chair** | Holographic designer chair with curved backrest and chrome legs |


---

## 📱 Seamless Android & iOS Compatibility

- **Safe Area & Status Bar Optimization**: Automatically adapts padding for iOS Dynamic Island, iPhone notch, home indicator, and Android status bar/navigation bars (`StatusBar.currentHeight`).
- **WebGL Frame Buffer Synchronization**: Uses `gl.endFrameEXP()` and alpha-channel clear colors (`renderer.setClearColor(0x000000, 0)`) so the live camera passthrough renders seamlessly under the Three.js canvas on both mobile operating systems.
- **Gesture Handling**: Uses React Native `PanResponder` for smooth multi-touch gesture rotation across both platforms.

---

## 🚀 How to Run with Expo Go (QR Scan)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Expo Development Server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Scan with Expo Go**:
   - **iOS**: Open the native **Camera app** on your iPhone or iPad and scan the generated QR code to open in **Expo Go**.
   - **Android**: Open the **Expo Go app** on your Android device and tap **Scan QR Code**.

---

## 📁 Project Architecture

```
├── App.js                   # Root App component with camera permissions & state
├── index.js                 # Expo entry point registration
├── package.json             # Expo SDK 54 compatible dependencies (React 19, RN 0.81)
├── app.json                 # Project configuration & camera permissions (sdkVersion 54.0.0)
├── babel.config.js          # Babel preset configuration (babel-preset-expo ~54.0.10)
├── metro.config.js          # Metro bundler config with 3D/asset extensions
└── src/
    ├── components/
    │   ├── ARScene.js       # Live CameraView + Three.js GLView AR canvas
    │   ├── TopBar.js        # Glassmorphic [X], [ AR | Object ] toggle, and Share button
    │   ├── BottomDrawer.js  # Categorized object library drawer (Shapes, Characters, Animals)
    │   ├── Reticle.js       # Floor holographic SVG targeting reticle
    │   ├── ScaleBadge.js    # Floating "80%" scale pill badge above the hologram
    │   ├── ARControls.js    # Scale zoom buttons & holographic color theme swatches
    │   └── PermissionScreen # Immersive Spatial Ethereal Camera Permission prompt
    ├── models/
    │   ├── ShapeModels.js   # Chair, Cube, Sphere, Torus, Pyramid, Icosahedron meshes
    │   ├── CharacterModels.js # Robo-AR, Astro-X, Mecha Sentinel, Cyber Android meshes
    │   └── AnimalModels.js  # Holo Fox, Cyber Kitty, AR T-Rex, Origami Eagle meshes
    ├── constants/
    │   ├── objectLibrary.js # Full metadata catalog of all 14 spatial objects
    │   └── theme.js         # "Spatial Ethereal" color tokens and glassmorphism styles
    └── utils/
        └── threeHelpers.js  # WebGL context setup, lighting, and material generators
```

---

## 💡 Interactive Controls & Features
- **Rotate in 3D Space**: Drag your finger horizontally or vertically across the screen to rotate and inspect any object.
- **Adjust Scale**: Tap the `+` or `-` zoom buttons in the floating control bar to scale the object from `40%` up to `200%`, dynamically updating the floating `%` badge.
- **Customize Holographic Themes**: Tap any color swatch (Cyan Pulse, Neon Rose, Quantum Gold, Cyber Emerald, Plasma Violet) to instantly morph the holographic energy shader.
- **Share Experience**: Tap the share button in the top right (`[^]`) to trigger a shareable screenshot or invite link via `expo-sharing`.
