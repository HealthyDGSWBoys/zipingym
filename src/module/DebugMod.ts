import Module from '$app/Module';
import * as BABYLON from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';
import model from '$static/model/beach2.glb';

BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());
export default class DebugMod extends Module {
  protected set(): void {
    const scene = this.share.scene;
    BABYLON.SceneLoader.Append('./', model.substring(1), scene, (scene) => {
      scene.getLightByName('Point')!.intensity = 10000;
    });
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  }
}
