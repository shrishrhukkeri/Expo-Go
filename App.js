import React, { useState } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import * as Haptics from 'expo-haptics';

import ARScene from './src/components/ARScene';
import TopBar from './src/components/TopBar';
import BottomDrawer from './src/components/BottomDrawer';
import Reticle from './src/components/Reticle';
import ScaleBadge from './src/components/ScaleBadge';
import ARControls from './src/components/ARControls';
import PermissionScreen from './src/components/PermissionScreen';
import { OBJECT_LIBRARY } from './src/constants/objectLibrary';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState('AR'); // 'AR' (Camera passthrough) | 'Object' (Studio 3D)
  const [selectedObj, setSelectedObj] = useState(OBJECT_LIBRARY[0]); // Default: Majestic African Lion
  const [scale, setScale] = useState(0.85); // Default scale 85%
  const [selectedColor, setSelectedColor] = useState('#FFB800'); // Default amber gold
  const [rotationOffset, setRotationOffset] = useState({ x: 0, y: 0 });

  // Handle resetting rotation and scale
  const handleReset = () => {
    setScale(0.85);
    setSelectedColor(selectedObj?.color || '#FFB800');
    setRotationOffset({ x: 0, y: 0 });
  };

  // Handle Share / Capture AR Experience
  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        Alert.alert(
          'Share AR Experience',
          `Sharing your spatial hologram: ${selectedObj.name} (${Math.round(
            scale * 100
          )}% scale). Scan Expo Go QR to test with friends!`,
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        Alert.alert(
          'Spatial AR Studio',
          `Active Hologram: ${selectedObj.name} in ${mode} mode.`
        );
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  // When a new object is selected from the bottom drawer
  const handleSelectObject = (obj) => {
    setSelectedObj(obj);
    setScale(obj.defaultScale || 0.85);
    setSelectedColor(obj.color);
  };

  // If camera permission hasn't been granted yet
  if (!permission || !permission.granted) {
    return <PermissionScreen onRequestPermission={requestPermission} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 3D AR/VR Scene (Camera background + WebGL hologram overlay) */}
      <ARScene
        mode={mode}
        selectedObj={selectedObj}
        scale={scale}
        selectedColor={selectedColor}
        rotationOffset={rotationOffset}
        onRotateChange={setRotationOffset}
      />

      {/* Floor Holographic Targeting Reticle (only shown in AR Mode) */}
      <Reticle visible={mode === 'AR'} color={selectedColor} />

      {/* Floating Scale Indicator Badge above Hologram */}
      <ScaleBadge scale={scale} visible={true} />

      {/* Top Control Bar ([ AR | Object ], Share) */}
      <TopBar
        mode={mode}
        onToggleMode={setMode}
        onReset={handleReset}
        onShare={handleShare}
      />

      {/* Spatial AR Controls: Zoom In/Out on the right */}
      <ARControls
        scale={scale}
        onScaleChange={setScale}
      />

      {/* Bottom-Docked Library Drawer categorized by Shapes, Characters, and Animals */}
      <BottomDrawer
        selectedObjId={selectedObj.id}
        onSelectObject={handleSelectObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070E',
  },
});
