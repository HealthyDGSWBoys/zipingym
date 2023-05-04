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

  public userData: UserData;
  public worldData: WorldData;

  private constructor(private core: LoadCore) {
    this.userData = new UserData(
      new UserCore(core.scene, core.root, core.humanMeshs!)
    );
    this.worldData = new WorldData(
      new WorldCoreImpl(
        core.scene,
        core.root,
        core.roadMeshs!,
        core.itemsMeshs!
      )
    );
  }
  public static async set(core: LoadCore) {
    this.instance = new Data(core);
    return this.instance;
  }
}
