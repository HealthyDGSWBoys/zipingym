import { Scene, TransformNode } from '@babylonjs/core';
import buildEngine from './buildEngine';
import UpdateLoop from './UpdateLoop';
import Config from '../config/Config';
import '@babylonjs/inspector';

export default class Core {
  private static instance: Core;

  private parent: HTMLElement;

  private _scene: Scene;
  private constructor(parent: HTMLElement) {
    this.parent = parent;
    this._scene = new Scene(buildEngine());
    parent.appendChild(this.scene.getEngine().getRenderingCanvas()!);

    if (Config.get.debugUI) {
      this.scene.debugLayer.show({
        overlay: true,
      });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  public static set(parent: HTMLElement) {
    if (this.instance == null) {
      this.instance = new Core(parent);
      UpdateLoop.set();
    }
  }

  public static run() {
    this.instance.scene.getEngine().runRenderLoop(() => {
      UpdateLoop.get.update();
    });
  }

  public static get get() {
    return this.instance;
  }

  public get scene() {
    return this._scene;
  }

  public get root(): TransformNode {
    return this.scene.getNodeByName('$SpawnPoint') as TransformNode;
  }
}
