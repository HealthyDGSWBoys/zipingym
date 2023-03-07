import Module from '$app/Module';
import * as BABYLON from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());
export default class DebugMod extends Module {
  protected onSet(): void {
    // this.addEventHandler('update', (e) => console.log(e.deltaTime));
  }
}
