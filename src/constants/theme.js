import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Spatial Ethereal palette
  primary: '#00F0FF',     // Cyan Pulse
  secondary: '#FF0055',   // Neon Rose
  accent: '#FFB800',      // Quantum Gold
  emerald: '#00FF66',     // Cyber Emerald
  violet: '#A855F7',      // Plasma Violet
  orange: '#FF5B35',      // Ethereal Orange
  white: '#FFFFFF',
  black: '#000000',

  // Glassmorphism backgrounds & borders
  glassDark: 'rgba(15, 23, 42, 0.75)',
  glassMedium: 'rgba(255, 255, 255, 0.18)',
  glassLight: 'rgba(255, 255, 255, 0.28)',
  glassBorder: 'rgba(255, 255, 255, 0.22)',
  glassGlow: 'rgba(0, 240, 255, 0.45)',

  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
};

export const DIMENSIONS = {
  width,
  height,
  topBarHeight: 60,
  bottomDrawerHeight: 240,
  reticleSize: 180,
};

export const THEME_COLOR_OPTIONS = [
  { id: 'cyan', name: 'Cyan Pulse', hex: COLORS.primary },
  { id: 'rose', name: 'Neon Rose', hex: COLORS.secondary },
  { id: 'gold', name: 'Quantum Gold', hex: COLORS.accent },
  { id: 'emerald', name: 'Cyber Emerald', hex: COLORS.emerald },
  { id: 'violet', name: 'Plasma Violet', hex: COLORS.violet },
];

export const GLASS_STYLES = StyleSheet.create({
  pillButton: {
    backgroundColor: COLORS.glassDark,
    borderColor: COLORS.glassBorder,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  circleButton: {
    backgroundColor: COLORS.glassDark,
    borderColor: COLORS.glassBorder,
    borderWidth: 1.5,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  drawerCard: {
    backgroundColor: COLORS.glassDark,
    borderColor: COLORS.glassBorder,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
