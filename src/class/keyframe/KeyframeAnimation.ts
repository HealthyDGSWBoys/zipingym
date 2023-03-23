import { TransformNode, Vector3, Animation } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import CustomAnimation from './CustomAnimation';

export default class KeyframeAnimation implements CustomAnimation {
  private target: TransformNode;
  private type: 'position' | 'rotation';
  // private animationQueue = new Array<{
  //   onmillsec: Vector3;
  //   duration: number;
  // }>();
  constructor(target: TransformNode, type: 'position' | 'rotation') {
    this.target = target;
    this.type = type;
  }
  public animate(type: 'add' | 'set', vector: Vector3, duration: number) {
    // const delta =
    //   type == 'add'
    //     ? vector.clone()
    //     : vector.clone().subtract(this.target[this.type]);
    // this.animationQueue.push({
    //   onmillsec: delta.divide(new Vector3().setAll(duration)),
    //   duration,
    // });

    BABYLON.Animation.CreateMergeAndStartAnimation(
      String(Math.random()),
      this.target,
      this.type,
      30,
      (30 * duration) / 1000,
      this.target[this.type],
      this.target[this.type].add(vector),
      BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    );
  }
  // public update(deltaTime: number) {
  //   this.animationQueue.forEach(({ onmillsec, duration }, idx) => {
  //     const delta = duration - deltaTime < 0 ? duration : deltaTime;
  //     this.target[this.type] = this.target[this.type].add(
  //       onmillsec.clone().multiply(new Vector3().setAll(delta))
  //     );
  //     this.animationQueue[idx].duration -= deltaTime;
  //     if (duration <= 0) {
  //       this.animationQueue.splice(idx, 1);
  //     }
  //   });
  // }
}
