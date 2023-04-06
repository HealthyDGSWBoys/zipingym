import { Engine, WebGPUEngine } from '@babylonjs/core';

const buildEngine = () => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  if (WebGPUEngine.IsSupported) {
    return new WebGPUEngine(canvas);
  } else {
    return new Engine(canvas);
  }
};

export default buildEngine;
