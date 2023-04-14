import { Engine, WebGPUEngine } from '@babylonjs/core';
import Config from '../config/Config';

const buildEngine = async () => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  if (Config.get.engine == 'webgpu') {
    const webgpu = new WebGPUEngine(canvas);
    await webgpu.initAsync();
    return webgpu;
  } else {
    return new Engine(canvas);
  }
};

export default buildEngine;
