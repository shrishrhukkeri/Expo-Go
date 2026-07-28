const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  'glb',
  'gltf',
  'png',
  'jpg',
  'obj',
  'mtl',
  'mp3',
  'wav'
);

config.resolver.sourceExts.push('cjs', 'mjs');

module.exports = config;
