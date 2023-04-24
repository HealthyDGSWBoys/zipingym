import { Scene, TransformNode } from '@babylonjs/core';
import ItemCore from './ItemCore/ItemCore';
import WorldCore from './WorldCore/WorldCore';
import UserCore from './UserCore/UserCore';
import colaTheme from '$asset/model/stage1_5.glb';

abstract class OnOffCore {
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
  private root: TransformNode;
  constructor(scene: Scene) {
    super(scene);
    this.root = new TransformNode('@root');
    this.scene.addTransformNode(this.root);
  }
  public async init() {
    new WorldCore(
      this.scene,
      this.root,
      await WorldCore.load([colaTheme], this.scene)
    );
    new UserCore(this.scene);
    new ItemCore(this.scene);
  }
  protected update(): void {
    this.scene.render();
  }
}
