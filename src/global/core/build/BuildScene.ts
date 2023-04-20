import { Engine, Scene, TransformNode } from '@babylonjs/core';
import { Color4 } from '@babylonjs/core/Maths';

export default class BuildScene {
  public static async build(engine: Engine) {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.2, 0.5, 0.7, 1);
    scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    scene.addTransformNode(new TransformNode('@Root'));
    return scene;
  }
}
