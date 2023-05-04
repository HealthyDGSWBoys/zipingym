import WorldData from '$/data/WorldData/WorldData';
import Tree from '$/util/Tree';
import { Vector3 } from '@babylonjs/core';
import Core from '$/core/Core';
import UserData from '$/data/UserData/UserData';
import WorldCoreImpl from '$/core/WorldCore/WorldCoreImpl';
import UserCore from '$/core/UserCore/UserCore';
import LoadCore from '$/core/LoadCore';
import BuildItem from './WorldData/BuildItem';

export default class Data {
  private static instance: Data;

  public userData!: UserData;
  public worldData!: WorldData;

  private constructor(private core: LoadCore) {
    this.userData = new UserData(
      new UserCore(core.scene, core.root, core.humanMeshs!)
    );
  }

  public async init() {
    const worldCore = new WorldCoreImpl(this.core.scene, this.core.root);
    await worldCore.init();
    this.worldData = new WorldData(worldCore);
  }

  public static async set(core: LoadCore) {
    this.instance = new Data(core);
    await this.instance.init();
    return this.instance;
  }
}
