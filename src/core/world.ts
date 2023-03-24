import Core from './core';
import dummyMap from '$static/model/dummy.glb';
import start from '$static/model/start.glb';
import testThema from '$static/model/testmap.glb';
import { AssetContainer, Mesh, TransformNode } from 'babylonjs';
import { LoadAll } from '$/function/Load';
import WorldManager from '$/class/world/worldManager';

export default class World extends Core {
  private static WorldModelFile: Map<string, string> = new Map([
    ['dummy', dummyMap],
    ['start', start],
    ['testThema', testThema],
  ]);
  private worldModel: Map<string, AssetContainer>;
  private worldManagers: Map<string, WorldManager> = new Map();
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      LoadAll(World.WorldModelFile, this.scene)
        .then((world) => {
          this.worldModel = world;
          const dummyMap = this.worldModel.get('start');
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
  public setsync = () => {
    const testThema = this.worldModel.get('testThema');
    if (testThema != undefined) {
      this.worldManagers.set('test', new WorldManager(testThema));
    }
    const testManager = this.worldManagers.get('test')!.list;

    const spawnpoint = this.scene.getNodeByName('SpawnPoint') as Mesh;

    const newRoad = testManager[0].clone();
    newRoad.parent = spawnpoint;
    newRoad.position.set(0, 0, -10);
  };
  public loop = (deltaTime: number) => {};
}
