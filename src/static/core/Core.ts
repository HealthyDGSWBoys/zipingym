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
  //@ts-expect-error
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
