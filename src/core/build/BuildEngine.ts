import Config from '$/global/config/Config';
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine';
import { Engine } from '@babylonjs/core/Engines/engine';

export default class BuildEngine {
  public static async build(canvas: HTMLCanvasElement) {
    if (Config.get.engine == 'webgpu') {
      const webgpu = new WebGPUEngine(canvas);
      await webgpu.initAsync();
      return webgpu;
    } else {
      return new Engine(canvas);
    }
  }
}
