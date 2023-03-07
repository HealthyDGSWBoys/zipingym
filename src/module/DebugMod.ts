import DummyMap from '$/logic/map/DummyMap';
import Module from '$app/Module';
import * as BABYLON from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new GLTFFileLoader());
export default class DebugMod extends Module {
  protected onSet(): void {
    this.addChild(DummyMap);
    // this.addEventHandler('update', (e) => console.log(e.deltaTime));
  }
}
