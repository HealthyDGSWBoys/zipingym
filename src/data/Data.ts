import WorldData from '$/data/WorldData/WorldData';
import UserData from '$/data/UserData/UserData';
import WorldCoreImpl from '$/core/WorldCore/WorldCoreImpl';
import UserCore from '$/core/UserCore/UserCore';
import { Scene, TransformNode } from '@babylonjs/core';
import UICore from '$/core/UICore/UICore';
import UIData from './UIData/UIData';

export default class Data {
  private static instance: Data;

  public userData!: UserData;
  public worldData!: WorldData;
  public uiData!: UIData;

  private constructor(private scene: Scene, private root: TransformNode) {}

  public async init() {
    const worldCore = new WorldCoreImpl(this.scene, this.root);
    await worldCore.init();
    this.worldData = new WorldData(worldCore);

    const userCore = new UserCore(this.scene, this.root);
    await userCore.init();
    this.userData = new UserData(userCore);

    const uiCore = new UICore(
      this.scene.getEngine().getRenderingCanvas()?.parentElement!
    );
    this.uiData = new UIData(uiCore);
  }

  public static async set(scene: Scene, root: TransformNode) {
    this.instance = new Data(scene, root);
    await this.instance.init();
    return this.instance;
  }
}
