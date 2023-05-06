import {
  Color3,
  Color4,
  CubeTexture,
  DirectionalLight,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  Scene,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3,
} from '@babylonjs/core';

export abstract class OnOffCore {
  constructor(protected scene: Scene) {}

  public run() {
    this.scene.getEngine().runRenderLoop(this.update.bind(this));
  }
  public pause() {
    this.scene.getEngine().stopRenderLoop();
  }
  protected abstract update(): void;
}

export default class ThreeCore extends OnOffCore {
  constructor(scene: Scene, root: TransformNode) {
    super(scene);
    const sun = new DirectionalLight(
      'Sun',
      root.position.add(new Vector3(0, -1, 0)),
      scene
    );
    sun.intensity = 1;

    const point = new HemisphericLight(
      'Point',
      root.position.add(new Vector3(0, 100, 0)),
      scene
    );

    const skybox = MeshBuilder.CreateBox('skyBox', { size: 1024 }, scene);
    const skyboxMaterial = new StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new Color3(1, 1, 1);
    skyboxMaterial.specularColor = new Color3(1, 1, 1);
    skybox.material = skyboxMaterial;

    point.intensity = 2;
    scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogColor = new Color3(0.8, 0.9, 1);
    scene.fogStart = 30;
    scene.fogEnd = 60;
    scene.fogDensity = 0.008;
  }

  protected update(): void {
    this.scene.render();
  }
}
