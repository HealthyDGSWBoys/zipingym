import { Scene, TransformNode } from '@babylonjs/core';

export default class BuildRoot {
  public static async build(scene: Scene) {
    const root = new TransformNode('@root');
    scene.addTransformNode(root);
    return root;
  }
}
