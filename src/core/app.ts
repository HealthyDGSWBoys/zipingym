import { Scene } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import Core from './core';
import DeltaClock from '$/util/DeltaClock';
import World from './world';
import User from './user';
import Development from './development';
import ShareMemory from './ShareMemory';

export default class App extends Core {
  private children: Array<Core> = new Array();
  private deltaClock: DeltaClock = new DeltaClock();

  constructor(parent: HTMLElement, config: AppConfig) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    parent.appendChild(canvas);
    const scene = new BABYLON.Scene(App.BuildEngine(canvas));
    super({
      scene,
      ...config,
    });

    scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    scene.clearColor = new BABYLON.Color4(0.2, 0.5, 0.7, 1);

    this.debug(scene);

    this.set().then(() => {
      console.log('<<<GAME START>>>>');
      scene.getEngine().runRenderLoop(this.loop.bind(this));
    });
  }

  private static BuildEngine = (canvas: HTMLCanvasElement): BABYLON.Engine => {
    if (BABYLON.WebGPUEngine.IsSupported) {
      return new BABYLON.WebGPUEngine(canvas);
    } else {
      return new BABYLON.Engine(canvas);
    }
  };
  private debug(scene: Scene) {
    if (this.share.debugUI) {
      scene.debugLayer.show({ overlay: false });
    } else {
      scene.debugLayer.hide();
    }
  }
  public loop = () => {
    const deltatime = this.deltaClock.getDeltaTime();
    this.children.forEach((child) => {
      child.loop(deltatime);
    });
    this.share.scene.render();
  };

  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      this.addChild(World);
      this.addChild(User);
      this.addChild(Development);

      Promise.all(
        this.children.map((child) => {
          return child.set();
        })
      )
        .then(() => {
          this.setsync();
          resolve();
        })
        .catch(reject);
    });
  };

  public setsync = () => {
    this.scene.activeCamera = this.scene.getCameraByName(
      true ? 'dev_camera' : 'user_camera'
    );
    this.children.forEach((child) => {
      child.setsync();
    });
  };
  private addChild(func: new (share: ShareMemory) => Core) {
    this.children.push(new func(this.share));
  }
}

export interface AppConfig {
  debugUI: boolean;
}
