import './polyfillBlob';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { toByteArray } from 'base64-js';

export async function loadGLBDirect(assetModule) {
  const asset = Asset.fromModule(assetModule);
  if (!asset.downloaded) {
    await asset.downloadAsync();
  }

  const uri = asset.localUri || asset.uri;

  let arrayBuffer;
  if (uri && (uri.startsWith('file://') || uri.startsWith('/'))) {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const uint8 = toByteArray(base64);
    arrayBuffer = uint8.buffer.slice(
      uint8.byteOffset,
      uint8.byteOffset + uint8.byteLength
    );
  } else {
    const response = await fetch(uri);
    const blob = await response.blob();
    arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.parse(
      arrayBuffer,
      '',
      (gltf) => resolve(gltf),
      (err) => reject(err)
    );
  });
}
