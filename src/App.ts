import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';
import { Scene } from 'babylonjs';
import image from '../public/room.gltf';
// import beach from './beach2.glb'

export default class App {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  canvas: HTMLCanvasElement;

  constructor(engine: BABYLON.Engine) {
    this.engine = engine;
    this.canvas = this.engine.getRenderingCanvas()!;
    this.scene = new BABYLON.Scene(engine);
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
    this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.set();
  }
  private debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  public run = () => {
    this.debug(true);
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };

  private set = () => {
    var camera = new BABYLON.FlyCamera(
      'camera1',
      new BABYLON.Vector3(0, 25, 0),
      this.scene
    );
    camera.fov = 1.2;

    camera.attachControl(true);
    document.addEventListener('wheel', () => {
      camera.rotation.y += 0.01;
    });
    BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
    BABYLON.SceneLoader.Append('./', 'room.gltf', this.scene, (scene) => {
      scene.getLightByName('Point')!.intensity = 10000;
    });
  };
}
