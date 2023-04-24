import Config from '$/global/config/Config';
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine';
import { Engine } from '@babylonjs/core/Engines/engine';
import BuildCanvas from './canvas';

export default class BuildEngine {
  public static async build() {
    const canvas = BuildCanvas.build();
    if (Config.get.engine == 'webgpu') {
      const webgpu = new WebGPUEngine(canvas);
      await webgpu.initAsync();
      return webgpu;
    } else {
      return new Engine(canvas);
    }
  }
}
