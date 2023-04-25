import { DirectionalLight, PointLight, Scene, Vector3 } from '@babylonjs/core';

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
  constructor(scene: Scene) {
    super(scene);
    const sunlight = new DirectionalLight('Sun', new Vector3(0, 10, 0), scene);
    sunlight.intensity = 1000;
    const pointLight = new PointLight('Point', new Vector3(0, 10, 0), scene);
    pointLight.intensity = 1000;
  }
  protected update(): void {
    this.scene.render();
  }
}
