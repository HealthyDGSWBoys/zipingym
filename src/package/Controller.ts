import Module from '$/package/Module';
import BabyEvent from '$/event/BabyEvent';
import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';
import { Vector3 } from 'babylonjs';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
export default abstract class Controller<T> extends Module {
  //@ts-ignore
  protected target: T;
  public setTarget(target: T) {
    this.target = target;
    this.generateEvent(new BabyEvent('_onTargetSet', {}, false), this);
    this.addEventHandler('update', ({ deltaTime }) => {
      this.animationQueue.map(
        ({ target, value, delta, duration, progress }, idx, arr) => {
          target[value] = target[value].add(
            delta
              .clone()
              .divide(new Vector3().setAll(duration))
              .multiply(new Vector3().setAll(deltaTime))
          );

          arr[idx].progress += deltaTime;
          if (duration < progress) {
            this.animationQueue.splice(idx, 1);
          }
        }
      );
    });
  }
  protected animationQueue: Array<{
    target: BABYLON.TransformNode;
    value: 'position' | 'rotation';
    delta: BABYLON.Vector3;
    duration: number;
    progress: number;
  }> = new Array();
  protected animateVec(
    target: BABYLON.TransformNode,
    value: 'position' | 'rotation',
    delta: BABYLON.Vector3,
    duration: number
  ) {
    this.animationQueue.push({
      target,
      value,
      delta,
      duration,
      progress: 0,
    });

    // const animation = new BABYLON.Animation(
    //   'animation',
    //   value,
    //   1000,
    //   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    //   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    // );
    // animation.setKeys([
    //   {
    //     frame: 0,
    //     value: target[value],
    //   },
    //   {
    //     frame: duration,
    //     value: target[value].clone().add(goal),
    //   },
    // ]);
    // return this.getScene().beginDirectAnimation(
    //   target,
    //   [animation],
    //   0,
    //   duration,
    //   false
    // );
  }
}
