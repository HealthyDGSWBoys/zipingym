import { Engine, WebGPUEngine } from '@babylonjs/core';

const buildEngine = async () => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  if (await WebGPUEngine.IsSupportedAsync) {
    const webgpu = new WebGPUEngine(canvas);
    await webgpu.initAsync();
    return webgpu;
  } else {
    return new Engine(canvas);
  }
};

export default buildEngine;
