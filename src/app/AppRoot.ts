import appConfig from './config';
import * as BABYLON from 'babylonjs';
import Module from '../package/Module';
import EventFall from '$/event/EventFall';
import BabyEvent from '$/event/BabyEvent';
import ShareMemory from './ShareMemory';
import DeltaClock from '$/util/DeltaClock';

export default class AppRoot extends EventFall {
  private root: HTMLElement;
  private canvas: HTMLCanvasElement;
  private config: appConfig;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private share: ShareMemory;

  private running: boolean = false;

  private deltaClock: DeltaClock = new DeltaClock();
  constructor(root: HTMLElement, config: appConfig) {
    super(EventFall.MakeMotherlessFall());
    this.root = root;
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.root.appendChild(this.canvas);

    this.engine = this.buildEngine(this.canvas);
    this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0.2, 0.5, 0.7, 1);

    this.share = {
      scene: this.scene,
      engine: this.engine,
      highlite: new BABYLON.HighlightLayer('highlite_layer', this.scene),
      ...config,
    };

    this.debug();
    this.engine.runRenderLoop(this.loop.bind(this));
  }

  private buildEngine = (canvas: HTMLCanvasElement): BABYLON.Engine => {
    if (BABYLON.WebGPUEngine.IsSupported) {
      return new BABYLON.WebGPUEngine(canvas);
    } else {
      return new BABYLON.Engine(this.canvas);
    }
  };
  private debug() {
    if (this.config.debugUI) {
      this.scene.debugLayer.show({ overlay: false });
    } else {
      this.scene.debugLayer.hide();
    }
  }
  private loop() {
    if (this.running) {
      this.generateEvent(
        new BabyEvent('update', { deltaTime: this.deltaClock.getDeltaTime() })
      );
      this.scene.render();
    }
  }
  protected appendMember(
    Member: new (parent: EventFall, scene: ShareMemory) => Module
  ) {
    const member = new Member(this, this.share);
    this.children.push(member);
  }
  public run() {
    this.generateEvent(new BabyEvent('setting', {}));
    this.deltaClock.play();
    this.running = true;
  }
  public pause() {
    this.deltaClock.pause();
    this.running = false;
  }
  protected isRoot = () => true;
}
