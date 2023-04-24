import { Scene } from '@babylonjs/core';
import BuildCore from './build/BuildCore';
import ThreeCore from '$/core/ThreeCore';
import UICore from '$/core/UICore';
import DebugUI from './DebugUI';

export default class Core {
  private constructor() {}
  public static async set(parent: HTMLElement): Promise<Core> {
    const core = new Core();
    await core.init(parent);
    return core;
  }
  private async init(parent: HTMLElement) {
    const { canvas, scene } = await BuildCore.build(parent);
    this._canvas = canvas;
    this._scene = scene;
    this._threeCore = new ThreeCore(this._scene);
    this._uiCore = new UICore(this._canvas.parentElement!);

    await DebugUI.init(this._scene);
    await this.threeCore.init();

    this.threeCore.run();
  }
  private _threeCore?: ThreeCore;
  private _uiCore?: UICore;
  private _canvas?: HTMLCanvasElement;
  private _scene?: Scene;
  public get threeCore(): ThreeCore {
    if (this._threeCore == null) throw new Error("Core isn't initalized");
    else return this._threeCore;
  }
  public get uiCore(): UICore {
    if (this._uiCore == null) throw new Error("Core isn't initalized");
    else return this._uiCore;
  }
}
