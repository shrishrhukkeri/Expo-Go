# Spatial AR Studio — Step-by-Step User & Developer Guide

Welcome to **Spatial AR Studio**, an interactive React Native AR/VR spatial object placement application built for **Expo Go (SDK 54.0.0)**. This guide provides step-by-step instructions on how to clone the repository, run the application, and use every feature of the AR/VR studio.

---

## 1. Cloning the Repository & Initial Setup

### Clone the Repository

Open your terminal and clone the repository to your local machine:

```bash
git clone https://github.com/shrishrhukkeri/Expo-Go
cd "Expo Go"
```

### Dependency Management Note

Because there is no `.gitignore` file excluding `node_modules`, all pre-installed node packages are already present in the folder. However, **it is strongly recommended to run `npm install` once** after cloning. This ensures that any platform-specific binary links, C++ bindings, and local npm symlinks are correctly initialized for your operating system (macOS, Windows, or Linux):

```bash
npm install
```

---

## 2. Step-by-Step Running Guide

### Step 1: Start the Expo Development Server

Start the local Metro development server with a clean cache to ensure all assets and Three.js shaders load cleanly:

```bash
npx expo start -c
```

A QR code will appear in your terminal window.

### Step 2: Open in Expo Go (iOS or Android)

Make sure your mobile device has the latest **Expo Go app (SDK 54)** installed from the Apple App Store or Google Play Store.

- **On iOS (iPhone / iPad)**:
  1. Open your default **Camera** app.
  2. Point your camera at the QR code in the terminal.
  3. Tap the yellow **Open in Expo Go** banner that appears at the top of your screen.
- **On Android**:
  1. Open the **Expo Go** app directly.
  2. Tap **Scan QR Code** on the home screen.
  3. Point your camera at the QR code in the terminal.

> [!NOTE]
> Make sure your phone and your computer are connected to the same Wi-Fi network.

---

## 3. How to Use Spatial AR Studio

### 3.1 Camera Permission

When the app launches for the first time, you will see the **Spatial Ethereal Welcome Screen**.

- Tap **Enable Camera AR**.
- When prompted by your operating system, tap **Allow** so the app can render your live camera feed as the AR background.

### 3.2 Dual-Mode Studio Toggle (`[ AR | Object ]`)

At the top of the screen, use the glassmorphic segmented switch to toggle between two rendering environments:

- **`AR` Mode**: Activates your phone's camera passthrough. Your physical room becomes the background, anchored by a true 3D spatial ground reticle and contact shadow at `y = 0` (`AR GROUND PLANE LOCKED • 0.0m`).
- **`Object` Mode**: Replaces the live camera feed with an **Ethereal Dark-Space Studio** featuring a subtle glowing neon radial grid—perfect for inspecting holographic models in dark mode without background distraction.

### 3.3 Selecting 3D Holograms (Bottom Drawer)

The bottom of the screen features a glassmorphic library drawer divided into four professional category tabs:

- **Animals**:
  - *Majestic African Lion* (Sculpted athletic quadruped lion with golden amber mane and tail)
  - *Alpha Timber Wolf* (Sleek hunting posture wolf with pointed ears and bushy tail)
  - *Stallion Horse* (Powerful equestrian stallion with arched neck and flowing mane)
  - *Soaring Golden Eagle* (Raptorial soaring eagle with broad wingspan on rock pedestal)
- **Aerospace**:
  - *Orbital Satellite* (High-gain telecom satellite with dual solar arrays and sensor dish)
  - *Recon Quadcopter* (Tactical UAV with 4 rotor rings and gimbal-mounted optical camera)
  - *Interstellar Cruiser* (Deep-space command vessel with swept delta wings and thruster rings)
  - *Space Habitat* (Toroidal O-ring space station with docking hub and solar masts)
- **Robotics**:
  - *Iron Man Mk 85 (Rigged)* (High-fidelity Rigged Iron Man Mark 85 armor with glowing Arc Reactor core)
  - *Cyber Rover* (6-wheeled planetary exploration rover with mast camera turret)
  - *Sentinel Mech* (Heavy bipedal defense mech with shoulder sensor pods and glowing visor)
  - *Industrial Robot Arm* (6-axis precision robotic arm with articulated elbow and gripper claws)
  - *AI Security Pod* (Autonomous spherical recon drone with rotating scanner rings)
- **Architecture**:
  - *Modern Pavilion* (Futuristic architectural pavilion with curved canopy and glass walls)
  - *Helix Skyscraper* (Parametric skyscraper with helical floor plates and structural spire)
  - *Suspension Bridge* (Cable-stayed bridge engineering model with twin pylons and deck)
  - *Ethereal Chair* (Holographic designer chair with curved backrest and chrome legs)

Tap any item card to instantly place it grounded in 3D space with tactile haptic feedback.

### 3.4 Multi-Touch Gestures & Spatial Controls

- **Rotate in 3D Space**: Drag your finger horizontally or vertically anywhere on the screen to rotate and tilt the 3D hologram around any axis.
- **Scale / Zoom (`-` / `+`)**: Tap the zoom buttons in the floating right-aligned control bar above the drawer to scale the object from `40%` up to `200%`. The floating badge above the hologram dynamically updates (e.g., `85%`, `100%`, `120%`).
- **Share (`[^]`)**: Tap the share button in the top-right corner to share your current hologram setup with friends via `expo-sharing`.
- **Clean UI**: In accordance with professional spatial design, color theme swatches and reset cross buttons have been removed so the AR viewport remains clear and unobstructed.

---

## 4. Technical & Troubleshooting Notes

- **0ms Procedural Generation**: All 14 3D models are procedurally generated in Three.js (`src/models/`). This guarantees zero file-download latency and 60 FPS performance on both Android and iOS.
- **EXGL Multisampling Optimization**: In React Native Expo GL (`EXGL`), WebGL2 multisampled renderbuffers are not implemented by default. Our WebGL renderer (`src/utils/threeHelpers.js`) is configured with `antialias: false` to ensure your terminal and device logs remain 100% free of `EXGL: renderbufferStorageMultisample() isn't implemented yet!` errors.
