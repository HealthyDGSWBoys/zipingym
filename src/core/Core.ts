import { Scene, TransformNode } from '@babylonjs/core';
import BuildCore from './build/BuildCore';
import ThreeCore from '$/core/ThreeCore';
import UICore from '$/core/UICore';
import DebugUI from './DebugUI';
import { RoadMeshs } from './WorldCore/WorldCore';
import WorldCoreImpl from './WorldCore/WorldCoreImpl';
import colaTheme from '$asset/model/stage1_5.glb';

export default class Core {
  private constructor() {}

  public roadMeshs?: RoadMeshs;
  public static async set(parent: HTMLElement): Promise<Core> {
    const core = new Core();
    await core.init(parent);
    return core;
  }
  private async init(parent: HTMLElement) {
    const { canvas, scene } = await BuildCore.build(parent);
    this._scene = scene;

    this._root = new TransformNode('@root');
    this._scene.addTransformNode(this._root);

    this._threeCore = new ThreeCore(this._scene);
    await DebugUI.init(this._scene);
    await this.threeCore.init();

    this.roadMeshs = await WorldCoreImpl.load([colaTheme], this.scene);
    this.threeCore.run();
  }
  private _threeCore?: ThreeCore;
  private _scene?: Scene;
  private _root?: TransformNode;
  public get threeCore(): ThreeCore {
    if (this._threeCore == null) throw new Error("Core isn't initalized");
    else return this._threeCore;
  }

  public get root(): TransformNode {
    if (this._root == null) throw new Error("Core isn't initalized");
    else return this._root;
  }
  public get scene(): Scene {
    if (this._scene == null) throw new Error("Core isn't initalized");
    else return this._scene;
  }
}
