import { Scene } from '@babylonjs/core';
import { RawConfig } from '../config/Config';
import buildEngine from './buildEngine';

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
    }
  }

  public static get get() {
    return this.instance;
  }
}
