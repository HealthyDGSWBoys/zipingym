import { Scene, Engine, Color4, WebGPUEngine } from '@babylonjs/core';
import '@babylonjs/inspector';
import Core from './core';
import DeltaClock from '$/util/DeltaClock';
import World from './world';
import User from './user';
import Development from './development';
import ShareMemory from './ShareMemory';
import WorldEngine from '$/util/WorldEngine';

export default class App extends Core {
  private children: Array<Core> = new Array();
  private deltaClock: DeltaClock = new DeltaClock();

  constructor(parent: HTMLElement, config: AppConfig) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    parent.appendChild(canvas);
    const scene = new Scene(App.BuildEngine(canvas));
    super({
      scene,
      worldEngine: new WorldEngine(
        {
          length: 20,
          origin: 'f',
          children: [],
        },
        scene
      ),
      ...config,
    });
    // 해상도 조정
    scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
    // 배경 색 설정
    scene.clearColor = new Color4(0.2, 0.5, 0.7, 1);

    this.debug(scene);

    this.set().then(() => {
      console.log('<<<GAME START>>>>');
      scene.getEngine().runRenderLoop(this.loop.bind(this));
    });
  }

  private static BuildEngine = (canvas: HTMLCanvasElement): Engine => {
    if (WebGPUEngine.IsSupported) {
      return new WebGPUEngine(canvas);
    } else {
      return new Engine(canvas);
    }
  };
  private debug(scene: Scene) {
    if (this.share.debugUI && this.share.production == false) {
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
      !this.share.production ? 'user_camera' : 'user_camera'
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
  production: boolean;
}
