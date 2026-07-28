import { Buffer } from 'buffer';

// 1. Ensure self is defined globally for Three.js GLTFLoader
if (typeof global !== 'undefined') {
  if (!global.self) {
    global.self = global;
  }
}

// 2. High-speed React Native ArrayBuffer -> Base64 Data URI polyfill for Three.js GLTFLoader
const OriginalBlob = global.Blob;
const originalCreateObjectURL =
  (global.URL && global.URL.createObjectURL) || function () {};

global.Blob = function Blob(parts, options) {
  try {
    return new OriginalBlob(parts, options);
  } catch (e) {
    const buffer = parts && parts[0];
    const mimeType = (options && options.type) || 'image/png';
    if (buffer) {
      let base64 = '';
      try {
        const uint8 = new Uint8Array(buffer);
        base64 = Buffer.from(
          uint8.buffer,
          uint8.byteOffset,
          uint8.byteLength
        ).toString('base64');
      } catch (err) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        base64 =
          typeof btoa === 'function' ? btoa(binary) : binary;
      }
      return {
        _base64DataUri: 'data:' + mimeType + ';base64,' + base64,
        size: buffer.byteLength || 0,
        type: mimeType,
      };
    }
    return { _base64DataUri: '', size: 0, type: mimeType };
  }
};

if (!global.URL) {
  global.URL = {};
}
global.URL.createObjectURL = function (blob) {
  if (blob && blob._base64DataUri) {
    return blob._base64DataUri;
  }
  if (typeof originalCreateObjectURL === 'function') {
    try {
      return originalCreateObjectURL(blob);
    } catch (e) {
      return blob && blob._base64DataUri ? blob._base64DataUri : '';
    }
  }
  return blob && blob._base64DataUri ? blob._base64DataUri : '';
};

global.URL.revokeObjectURL = function (url) {
  // no-op for data URIs
};
