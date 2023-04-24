import WorldData from '$/data/WorldData/WorldData';
import Tree from '$/util/Tree';
import { Vector3 } from '@babylonjs/core';
import Core from '../core/Core';
import UserData from '$/data/CharacterData/UserData';

export default class Data {
  private static instance: Data;

  public userData: UserData;
  public worldData: WorldData;

  private constructor(private core: Core) {
    this.userData = new UserData();
    this.worldData = new WorldData(
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
