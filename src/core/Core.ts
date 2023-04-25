import { Scene, TransformNode } from '@babylonjs/core';
import BuildCore from './build/BuildCore';
import ThreeCore from '$/core/ThreeCore';
import DebugUI from './DebugUI';

export default class Core {
  protected constructor() {}

  public static async set(parent: HTMLElement): Promise<Core> {
    const core = new Core();
    await core.init(parent);
    return core;
  }
  protected async init(parent: HTMLElement) {
    const { canvas, scene, root } = await BuildCore.build(parent);
    this._element = canvas.parentElement!;
    this._scene = scene;
    this._root = root;

    await DebugUI.init(this._scene);

    this._threeCore = new ThreeCore(this._scene, this._root);
  }
  private _scene?: Scene;
  private _root?: TransformNode;
  private _element?: HTMLElement;
  private _threeCore?: ThreeCore;

  public get scene(): Scene {
    if (this._scene == null) throw new Error("Core isn't initalized");
    else return this._scene;
  }
  public get root(): TransformNode {
    if (this._root == null) throw new Error("Core isn't initalized");
    else return this._root;
  }
  public get element(): HTMLElement {
    if (this._element == null) throw new Error("Core isn't initalized");
    else return this._element;
  }
  public get threeCore(): ThreeCore {
    if (this._threeCore == null) throw new Error("Core isn't initalized");
    else return this._threeCore;
  }
}
