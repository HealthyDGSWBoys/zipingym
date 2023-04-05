import Core from './core';
import start from '$static/model/dummy.glb';
import testThema from '$static/model/room.glb';
import itemsGLB from '$static/model/items.glb';
import {
  AssetContainer,
  Mesh,
  MeshBuilder,
  Texture,
  Color3,
  Vector3,
  DirectionalLight,
  HemisphericLight,
} from '@babylonjs/core';
import { LoadAll } from '$/function/Load';
import WorldManager from '$/class/world/WorldManager';
import ColaTexture from '$static/material/Cola3.png';
import BumpTexture from '$static/material/LavaBump2.jpg';
import { LavaMaterial } from '@babylonjs/materials';
import ItemManager from '$/class/item/itemsManager';

enum worldModelEnum {
  start,
  testtheme,
  items,
}
enum worldThemeEnum {
  test,
}
export default class World extends Core {
  private static WorldModelFile: Map<worldModelEnum, string> = new Map([
    [worldModelEnum.start, start],
    [worldModelEnum.testtheme, testThema],
    [worldModelEnum.items, itemsGLB],
  ]);
  private worldModel: Map<worldModelEnum, AssetContainer>;
  private worldManagers: Map<worldThemeEnum, WorldManager> = new Map();
  private itemManager: ItemManager;

  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      LoadAll<worldModelEnum>(World.WorldModelFile, this.scene)
        .then((world) => {
          this.worldModel = world;
          this.worldModel.get(worldModelEnum.start).addAllToScene();
          resolve();
        })
        .catch(reject);
    });
  };
  public setsync = () => {
    this.itemManager = new ItemManager(
      this.worldModel.get(worldModelEnum.items)
    );

    const sun = new DirectionalLight(
      'Sun',
      this.scene
        .getTransformNodeByName('SpawnPoint')
        .position.add(new Vector3(0, -100, 0)),
      this.scene
    );
    sun.intensity = 5;

    const point = new HemisphericLight(
      'Point',
      this.scene
        .getTransformNodeByName('SpawnPoint')
        .position.add(new Vector3(0, -100, 0)),
      this.scene
    );
    point.intensity = 0.2;

    const testThema = this.worldModel.get(worldModelEnum.testtheme);
    if (testThema != undefined) {
      this.worldManagers.set(worldThemeEnum.test, new WorldManager(testThema));
      this.share.worldEngine.setWorldManager(
        this.worldManagers.get(worldThemeEnum.test)
      );
    }
    const testManager = this.worldManagers.get(worldThemeEnum.test)!.list;

    const spawnpoint = this.scene.getNodeByName('SpawnPoint') as Mesh;

    const newRoad = testManager[0].clone();
    newRoad.name = '-1';
    newRoad.parent = spawnpoint;
    newRoad.position.set(0, 0, -15);

    var ground = MeshBuilder.CreateGround(
      'lava',
      { width: 1024, height: 1024, subdivisions: 128 },
      this.scene
    );
    ground.position.set(0, -5, 0);
    var lavaMaterial = new LavaMaterial('lava', this.scene);
    const lavaTexture = new Texture(ColaTexture, this.scene);
    lavaTexture.level = 0.15;
    lavaMaterial.diffuseTexture = lavaTexture;
    lavaMaterial.alpha = 0.8;
    lavaMaterial.diffuseTexture.name = 'lavaMaterialdiffuseTexture';
    lavaMaterial.speed = 0.3;
    lavaMaterial.fogColor = new Color3(0, 0, 0);
    lavaMaterial.noiseTexture = new Texture(BumpTexture, this.scene);
    ground.material = lavaMaterial;
  };
  public loop = (deltaTime: number) => {};
}
