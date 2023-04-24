import { TransformNode, Vector3 } from '@babylonjs/core';
import CustomAnimation from './CustomAnimation';
import UpdateLoop from '$/@legacy/legacyCore/UpdateLoop';

export default class AccelateAnimation implements CustomAnimation {
  private target: TransformNode;
  private type: 'position' | 'rotation';
  private animationQueue = new Array<{
    onmillsec: Vector3;
    duration: number;
  }>();
  public report: (vec: Vector3) => void = () => 1;
  constructor(target: TransformNode, type: 'position' | 'rotation') {
    this.target = target;
    this.type = type;
    UpdateLoop.get.append(this.update.bind(this));
  }
  public animate(type: 'add' | 'set', vector: Vector3, duration: number) {
    const delta =
      type == 'add'
        ? vector.clone()
        : vector.clone().subtract(this.target[this.type]);
    this.animationQueue.push({
      onmillsec: delta.divide(new Vector3().setAll(duration)),
      duration,
    });
  }
  private update(deltaTime: number) {
    const final = new Vector3();
    this.animationQueue.forEach(({ onmillsec, duration }, idx) => {
      const delta = duration - deltaTime <= 0 ? duration : deltaTime;
      if (delta > 0) {
        final.addInPlace(
          onmillsec.clone().multiply(new Vector3().setAll(delta))
        );
        this.animationQueue[idx].duration -= deltaTime;
      }
    });

    for (let i = 0; i < this.animationQueue.length; i++) {
      if (this.animationQueue[i].duration <= 0) {
        this.animationQueue.splice(i, 1);
        i--;
      }
    }
    this.target[this.type] = this.target[this.type].add(final);
    this.report(final.divide(new Vector3().setAll(deltaTime)));
  }
}
