import Module from '$/package/Module';
import BabyEvent from '$/event/BabyEvent';
import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
export default abstract class Controller<T> extends Module {
  //@ts-ignore
  protected target: T;
  public setTarget(target: T) {
    this.target = target;
    this.generateEvent(new BabyEvent('_onTargetSet', {}, false), this);
  }
}
