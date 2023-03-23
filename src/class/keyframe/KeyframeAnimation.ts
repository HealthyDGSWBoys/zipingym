import { TransformNode, Vector3, Animation } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import CustomAnimation from './CustomAnimation';

export default class KeyframeAnimation implements CustomAnimation {
  private target: TransformNode;
  private type: 'position' | 'rotation';
  constructor(target: TransformNode, type: 'position' | 'rotation') {
    this.target = target;
    this.type = type;
  }
  public animate(type: 'add' | 'set', vector: Vector3, duration: number) {
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
}
