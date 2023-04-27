import {
  DirectionalLight,
  HemisphericLight,
  PointLight,
  Scene,
  TransformNode,
  Vector3,
} from '@babylonjs/core';

export abstract class OnOffCore {
  constructor(protected scene: Scene) {}

  public run() {
    this.scene.getEngine().runRenderLoop(this.update.bind(this));
  }
  public pause() {
    this.scene.getEngine().stopRenderLoop();
  }
  protected abstract update(): void;
}

export default class ThreeCore extends OnOffCore {
  constructor(scene: Scene, root: TransformNode) {
    super(scene);
    const sun = new DirectionalLight(
      'Sun',
      root.position.add(new Vector3(0, 1, 0)),
      scene
    );
    sun.intensity = 5;

    const point = new HemisphericLight(
      'Point',
      root.position.add(new Vector3(0, -100, 0)),
      scene
    );
    point.intensity = 0.2;
  }
  protected update(): void {
    this.scene.render();
  }
}
