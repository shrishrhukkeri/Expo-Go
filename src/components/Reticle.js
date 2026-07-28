import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Reticle({ visible = true }) {
  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.groundBadge}>
        <View style={styles.statusDot} />
        <Text style={styles.groundText}>AR GROUND PLANE LOCKED • 0.0m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 105,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 40,
  },
  groundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 7, 14, 0.75)',
    borderColor: '#00F0FF',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF66',
    marginRight: 8,
  },
  groundText: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

