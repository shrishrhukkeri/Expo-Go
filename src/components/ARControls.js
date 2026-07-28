import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ZoomIn, ZoomOut } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

export default function ARControls({
  scale,
  onScaleChange,
}) {
  const handleScale = (delta) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newScale = Math.min(2.0, Math.max(0.4, Number((scale + delta).toFixed(2))));
    onScaleChange(newScale);
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Right-Aligned Scale Controls */}
      <View style={styles.scaleBar}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleScale(-0.1)}
          activeOpacity={0.7}
        >
          <ZoomOut size={16} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => handleScale(0.1)}
          activeOpacity={0.7}
        >
          <ZoomIn size={16} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 270,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 60,
  },
  colorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorDotActive: {
    transform: [{ scale: 1.2 }],
    borderColor: COLORS.white,
    borderWidth: 2,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  scaleBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  controlBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
