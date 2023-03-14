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

  protected animateVec(
    target: BABYLON.TransformNode,
    value: 'position' | 'rotation',
    goal: BABYLON.Vector3,
    duration: number
  ) {
    const animation = new BABYLON.Animation(
      'animation',
      value,
      1000,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animation.setKeys([
      {
        frame: 0,
        value: target[value],
      },
      {
        frame: duration,
        value: target[value].clone().add(goal),
      },
    ]);
    return this.getScene().beginDirectAnimation(
      target,
      [animation],
      0,
      duration,
      false
    );
  }
}
