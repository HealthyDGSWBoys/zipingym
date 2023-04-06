import { Scene } from '@babylonjs/core';
import buildEngine from './buildEngine';
import UpdateLoop from './UpdateLoop';

export default class Core {
  private static instance: Core;

  private parent: HTMLElement;

  public scene: Scene;
  private constructor(parent: HTMLElement) {
    this.parent = parent;
    this.scene = new Scene(buildEngine(parent));
  }

  public static set(parent: HTMLElement) {
    if (this.instance == null) {
      this.instance = new Core(parent);
      UpdateLoop.set();
      this.getScene.getEngine().runRenderLoop(() => {
        UpdateLoop.get.update();
      });
    }
  }

  public static get get() {
    return this.instance;
  }

  public static get getScene() {
    return this.instance.scene;
  }
}
