import { Scene, TransformNode } from '@babylonjs/core';
import ItemCore from './ItemCore/ItemCore';
import WorldCore from './WorldCore/WorldCore';
import UserCore from './UserCore/UserCore';
import colaTheme from '$asset/model/stage1_5.glb';

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
  }
  protected update(): void {
    this.scene.render();
  }
}
