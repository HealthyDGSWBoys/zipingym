import {
  Color4,
  DirectionalLight,
  HemisphericLight,
  Scene,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import buildEngine from './buildEngine';
import UpdateLoop from './UpdateLoop';
import Config from '../config/Config';
import '@babylonjs/inspector';

export default class Core {
  private static instance: Core;
  private parent: HTMLElement;
  private _scene: Scene;

  public static RootName = '@root';

  private constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  public async init() {
    this._scene = new Scene(await buildEngine());
    this.parent.appendChild(this.scene.getEngine().getRenderingCanvas()!);

    if (Config.get.debugUI) {
      this.scene.debugLayer.show({
        overlay: true,
      });
    } else {
      this.scene.debugLayer.hide();
    }
    this.scene.clearColor = new Color4(0.2, 0.5, 0.7, 1);
    this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.scene.addTransformNode(new TransformNode(Core.RootName));
    const sun = new DirectionalLight(
      'Sun',
      this.root.position.add(new Vector3(0, -100, 0)),
      this.scene
    );
    sun.intensity = 5;

    const point = new HemisphericLight(
      'Point',
      this.root.position.add(new Vector3(0, -100, 0)),
      this.scene
    );
    point.intensity = 0.2;
  }

  public static set(parent: HTMLElement) {
    if (this.instance == null) {
      this.instance = new Core(parent);
      UpdateLoop.set();
    }
  }

  public static run() {
    this.instance.scene.getEngine().runRenderLoop(() => {
      UpdateLoop.get.update();
    });
  }

  public static get get() {
    return this.instance;
  }

  public get scene(): Scene {
    return this._scene!;
  }

  public get root(): TransformNode {
    return this.scene.getNodeByName(Core.RootName)! as TransformNode;
  }
}
