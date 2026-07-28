import '../utils/polyfillBlob';
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Platform,
  Dimensions,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { GLView } from 'expo-gl';
import { setupThreeContext } from '../utils/threeHelpers';
import {
  createSatelliteModel,
  createDroneModel,
  createRocketModel,
  createStationModel,
} from '../models/AerospaceModels';
import {
  createRoverModel,
  createMechModel,
  createArmModel,
  createCyborgModel,
} from '../models/RoboticsModels';
import {
  createPavilionModel,
  createTowerModel,
  createBridgeModel,
  createChairModel,
} from '../models/ArchitectureModels';
import {
  createLionModel,
  createWolfModel,
  createHorseModel,
  createEagleModel,
} from '../models/AnimalModels';

const { width, height } = Dimensions.get('window');

export default function ARScene({
  mode = 'AR',
  selectedObj,
  scale = 0.85,
  selectedColor,
  rotationOffset,
  onRotateChange,
}) {
  const sceneRef = useRef(null);
  const currentModelRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const colorRef = useRef(selectedColor);
  const scaleRef = useRef(scale);

  // Keep refs up to date for the animation loop
  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // Touch gesture handler for rotating the 3D hologram
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.pageY < height - 220,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        evt.nativeEvent.pageY < height - 220 &&
        (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5),
      onPanResponderMove: (_, gestureState) => {
        const deltaY = gestureState.dx * 0.015;
        const deltaX = gestureState.dy * 0.015;
        if (currentModelRef.current) {
          currentModelRef.current.rotation.y = rotationRef.current.y + deltaY;
          currentModelRef.current.rotation.x = Math.max(
            -0.5,
            Math.min(0.5, rotationRef.current.x + deltaX)
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const deltaY = gestureState.dx * 0.015;
        const deltaX = gestureState.dy * 0.015;
        rotationRef.current.y += deltaY;
        rotationRef.current.x = Math.max(
          -0.5,
          Math.min(0.5, rotationRef.current.x + deltaX)
        );
        if (onRotateChange) {
          onRotateChange(rotationRef.current);
        }
      },
    })
  ).current;

  // Function to build a Three.js model based on object ID
  const buildModel = (id, colorHex) => {
    switch (id) {
      // Animals
      case 'lion':
        return createLionModel(colorHex);
      case 'wolf':
        return createWolfModel(colorHex);
      case 'horse':
        return createHorseModel(colorHex);
      case 'eagle':
        return createEagleModel(colorHex);
      // Aerospace
      case 'satellite':
        return createSatelliteModel(colorHex);
      case 'drone':
        return createDroneModel(colorHex);
      case 'rocket':
        return createRocketModel(colorHex);
      case 'station':
        return createStationModel(colorHex);
      // Robotics
      case 'rover':
        return createRoverModel(colorHex);
      case 'mech':
        return createMechModel(colorHex);
      case 'arm':
        return createArmModel(colorHex);
      case 'cyborg':
        return createCyborgModel(colorHex);
      // Architecture
      case 'pavilion':
        return createPavilionModel(colorHex);
      case 'tower':
        return createTowerModel(colorHex);
      case 'bridge':
        return createBridgeModel(colorHex);
      case 'chair':
        return createChairModel(colorHex);
      default:
        return createLionModel(colorHex);
    }
  };

  const onContextCreate = async (gl) => {
    const { renderer, scene, camera, floorGroup } = setupThreeContext(
      gl,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    );
    sceneRef.current = scene;

    // Load initial model
    const objId = selectedObj ? selectedObj.id : 'chair';
    const objColor = selectedColor || (selectedObj ? selectedObj.color : '#FF0055');
    const newModel = buildModel(objId, objColor);
    newModel.position.set(0, 0, 0);
    newModel.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    scene.add(newModel);
    currentModelRef.current = newModel;

    let startTime = Date.now();

    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);

      const elapsed = (Date.now() - startTime) * 0.001;

      if (currentModelRef.current) {
        // In AR Mode: rest solidly grounded at y = 0. In Object Mode: subtle hover animation.
        if (mode === 'AR') {
          currentModelRef.current.position.y = 0;
        } else {
          currentModelRef.current.position.y = Math.sin(elapsed * 2.0) * 0.05;
        }
        // Slow automatic ambient rotation plus user gesture rotation
        currentModelRef.current.rotation.y = rotationRef.current.y + elapsed * 0.4;
        // Apply target scale
        const currentScale = scaleRef.current;
        currentModelRef.current.scale.set(currentScale, currentScale, currentScale);
      }

      // Hide or show floor ring based on AR vs Object mode
      if (floorGroup) {
        floorGroup.visible = mode === 'AR';
      }

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    renderLoop();
  };

  // Rebuild or replace model when selected object or color theme changes
  useEffect(() => {
    if (sceneRef.current && selectedObj) {
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
      }
      const newModel = buildModel(selectedObj.id, selectedColor || selectedObj.color);
      newModel.position.set(0, 0, 0);
      newModel.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
      newModel.rotation.set(rotationRef.current.x, rotationRef.current.y, 0);
      sceneRef.current.add(newModel);
      currentModelRef.current = newModel;
    }
  }, [selectedObj?.id, selectedColor]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Background: Camera passthrough in AR mode, Ethereal Studio in Object mode */}
      {mode === 'AR' ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={styles.studioBackground}>
          <View style={styles.studioGrid} />
        </View>
      )}

      {/* Transparent WebGL Canvas for 3D Holographic Rendering */}
      <GLView
        style={StyleSheet.absoluteFill}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070E',
  },
  studioBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#070B16',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studioGrid: {
    width: Math.max(width, height) * 1.5,
    height: Math.max(width, height) * 1.5,
    borderRadius: Math.max(width, height) * 0.75,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.08)',
    backgroundColor: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(7,11,22,1) 70%)',
  },
});
