import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export const loadFont = async (fontUrl: string) => {
  const loader = new FontLoader();
  return new Promise((resolve, reject) => {
    loader.load(fontUrl, resolve, undefined, reject);
  });
}; 