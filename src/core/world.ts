import Core from './core';
import dummyMap from '$static/model/dummy.glb';
import start from '$static/model/start.glb';
import testThema from '$static/model/testmap.glb';
import { AssetContainer, Mesh } from 'babylonjs';
import { LoadAll } from '$/function/Load';
import WorldManager from '$/class/world/worldManager';
import ColaTexture from '$static/material/Cola2.jpg';
import BumpTexture from '$static/material/LavaBump2.jpg';
import * as BABYLON from 'babylonjs';
import { LavaMaterial } from 'babylonjs-materials';

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
      this.share.worldEngine.setWorldManager(this.worldManagers.get('test'));
    }
    const testManager = this.worldManagers.get('test')!.list;

    const spawnpoint = this.scene.getNodeByName('SpawnPoint') as Mesh;

    const newRoad = testManager[0].clone();
    newRoad.parent = spawnpoint;
    newRoad.position.set(0, 0, -15);

    var ground = BABYLON.MeshBuilder.CreateGround(
      'lava',
      { width: 512, height: 512, subdivisions: 128 },
      this.scene
    );
    ground.position.set(0, -5, 0);
    var lavaMaterial = new LavaMaterial('lava', this.scene);
    lavaMaterial.noiseTexture = new BABYLON.Texture(BumpTexture, this.scene); // Set the bump texture
    // lavaMaterial.noiseTexture.scale
    lavaMaterial.diffuseTexture = new BABYLON.Texture(ColaTexture, this.scene);
    lavaMaterial.diffuseTexture.name = 'lavaMaterialdiffuseTexture';
    lavaMaterial.speed = 0.2;
    lavaMaterial.fogColor = new BABYLON.Color3(0.3, 0, 0);
    // lavaMaterial.
    ground.material = lavaMaterial;
  };
  public loop = (deltaTime: number) => {};
}
