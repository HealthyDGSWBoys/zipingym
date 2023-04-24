import { Scene } from '@babylonjs/core';
import Config from '../config/Config';

export default class DebugUI {
  public static async init(scene: Scene) {
    if (Config.get.debugUI) {
      await import('@babylonjs/inspector');
      scene.debugLayer.show({
        overlay: false,
      });
    } else {
      scene.debugLayer.hide();
    }
  }
}
