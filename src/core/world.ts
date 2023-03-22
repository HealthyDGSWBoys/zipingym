import Core from './core';
import dummyMap from '$static/model/dummy.glb';
import { AssetContainer } from 'babylonjs';
import { LoadAll } from '$/function/Load';

export default class World extends Core {
  private static WorldModelFile: Map<string, string> = new Map([
    ['dummy', dummyMap],
  ]);
  private worldModel: Map<string, AssetContainer>;
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      LoadAll(World.WorldModelFile, this.scene)
        .then((world) => {
          this.worldModel = world;
          const dummyMap = this.worldModel.get('dummy');
          if (dummyMap != undefined) {
            dummyMap.addAllToScene();
            resolve();
          } else {
            reject('NO MAP EXIST');
          }
        })
        .catch(reject);
    });
  };
  public setsync = () => {};
  public loop = (deltaTime: number) => {};
}
