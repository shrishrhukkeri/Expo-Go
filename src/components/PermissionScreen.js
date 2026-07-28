import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera, Sparkles } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

export default function PermissionScreen({ onRequestPermission }) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onRequestPermission();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Camera size={44} color={COLORS.primary} />
          <View style={styles.sparkleBadge}>
            <Sparkles size={16} color={COLORS.accent} />
          </View>
        </View>

        <Text style={styles.title}>Spatial AR Studio</Text>
        <Text style={styles.subtitle}>Holographic Object Placement</Text>

        <Text style={styles.description}>
          Experience 3D holographic shapes, characters, and creatures placed directly into your room. Allow camera access to enable real-time spatial AR tracking.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Camera size={20} color="#000" />
          <Text style={styles.buttonText}>Enable Camera AR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    maxWidth: 360,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 240, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  sparkleBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 36,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
  },
});
