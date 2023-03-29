import Core from './core';
import start from '$static/model/dummy.glb';
import testThema from '$static/model/testmap.glb';
import {
  AssetContainer,
  Mesh,
  MeshBuilder,
  Texture,
  Color3,
  TransformNode,
  SpotLight,
  Vector3,
  DirectionalLight,
  PointLight,
  HemisphericLight,
} from '@babylonjs/core';
import { LoadAll } from '$/function/Load';
import WorldManager from '$/class/world/worldManager';
import ColaTexture from '$static/material/Cola2.jpg';
import BumpTexture from '$static/material/LavaBump2.jpg';
import { LavaMaterial } from '@babylonjs/materials';

export default class World extends Core {
  private static WorldModelFile: Map<string, string> = new Map([
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
          // const Spawnpoint = new TransformNode('SpawnPoint', this.scene);
          this.worldModel.get('start').addAllToScene();

          resolve();
        })
        .catch(reject);
    });
  };
  public setsync = () => {
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

    const testThema = this.worldModel.get('testThema');
    if (testThema != undefined) {
      this.worldManagers.set('test', new WorldManager(testThema));
      this.share.worldEngine.setWorldManager(this.worldManagers.get('test'));
    }
    const testManager = this.worldManagers.get('test')!.list;

    const spawnpoint = this.scene.getNodeByName('SpawnPoint') as Mesh;

    const newRoad = testManager[0].clone();
    newRoad.name = '-1';
    newRoad.parent = spawnpoint;
    newRoad.position.set(0, 0, -15);

    var ground = MeshBuilder.CreateGround(
      'lava',
      { width: 512, height: 512, subdivisions: 128 },
      this.scene
    );
    ground.position.set(0, -5, 0);
    var lavaMaterial = new LavaMaterial('lava', this.scene);
    lavaMaterial.noiseTexture = new Texture(BumpTexture, this.scene); // Set the bump texture
    lavaMaterial.diffuseTexture = new Texture(ColaTexture, this.scene);
    lavaMaterial.diffuseTexture.name = 'lavaMaterialdiffuseTexture';
    lavaMaterial.speed = 0.2;
    lavaMaterial.fogColor = new Color3(0.3, 0, 0);
    ground.material = lavaMaterial;
  };
  public loop = (deltaTime: number) => {};
}
