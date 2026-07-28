import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Share2 } from 'lucide-react-native';
import { COLORS, GLASS_STYLES } from '../constants/theme';
import * as Haptics from 'expo-haptics';

export default function TopBar({ mode, onToggleMode, onReset, onShare }) {
  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onToggleMode(newMode);
    }
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onReset();
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onShare();
  };

  return (
    <View style={styles.container}>
      {/* Left: Spacer to maintain center alignment */}
      <View style={{ width: 44 }} />

      {/* Center: Segmented Mode Control [ AR | Object ] */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            mode === 'AR' && styles.segmentActive,
          ]}
          onPress={() => handleModeChange('AR')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentText,
              mode === 'AR' && styles.segmentTextActive,
            ]}
          >
            AR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentButton,
            mode === 'Object' && styles.segmentActive,
          ]}
          onPress={() => handleModeChange('Object')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentText,
              mode === 'Object' && styles.segmentTextActive,
            ]}
          >
            Object
          </Text>
        </TouchableOpacity>
      </View>

      {/* Right: Share Button */}
      <TouchableOpacity
        style={GLASS_STYLES.circleButton}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <Share2 color={COLORS.textPrimary} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 10 : 54;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderRadius: 28,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  segmentButton: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: 'rgba(0, 240, 255, 0.25)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  segmentText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  segmentTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
