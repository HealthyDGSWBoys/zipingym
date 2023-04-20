import { Scene } from '@babylonjs/core';
import BuildCore from './build/BuildCore';

export default class Core {
  private static instance: Core;
  private constructor() {}
  public static async set(parent: HTMLElement) {
    if (this.instance == null) {
      this.instance = new Core();
      await this.instance.init(parent);
    }
  }
  private async init(parent: HTMLElement) {
    const { canvas, scene } = await BuildCore.build(parent);
    this._canvas = canvas;
    this._scene = scene;
  }
  private _canvas?: HTMLCanvasElement;
  private _scene?: Scene;
  public get rootElement(): HTMLElement {
    if (this._canvas == null || this._canvas.parentElement == null)
      throw new Error("Core isn't initalized");
    else return this._canvas.parentElement;
  }
  public get scene() {
    if (this._scene == null) throw new Error("Core isn't initalized");
    else return this._scene;
  }
}
