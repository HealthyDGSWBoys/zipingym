import WorldData from '$/data/WorldData/WorldData';
import Tree from '$/util/Tree';
import { Vector3 } from '@babylonjs/core';
import Core from '$/core/Core';
import UserData from '$/data/CharacterData/UserData';
import WorldCoreImpl from '$/core/WorldCore/WorldCoreImpl';
import UserCore from '$/core/UserCore/UserCore';

export default class Data {
  private static instance: Data;

  public userData: UserData;
  public worldData: WorldData;

  private constructor(private core: Core) {
    // core.threeCore.

    this.userData = new UserData(new UserCore(core.scene));
    this.worldData = new WorldData(
      new WorldCoreImpl(core.scene, core.root, core.roadMeshs!),
      new Tree({
        length: 3,
        origin: 'f',
        position: new Vector3(0, 0, -15),
        rotation: 'u',
      })
    );
  }
  public static async set(core: Core) {
    this.instance = new Data(core);
    return this.instance;
  }
}
