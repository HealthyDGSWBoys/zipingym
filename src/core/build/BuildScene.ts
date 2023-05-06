import { Engine, Scene, TransformNode } from '@babylonjs/core';
import { Color4 } from '@babylonjs/core/Maths';

export default class BuildScene {
  public static async build(engine: Engine) {
    const scene = new Scene(engine);
    scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    return scene;
  }
}
