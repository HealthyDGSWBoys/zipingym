import { TransformNode, Vector3 } from '@babylonjs/core';
import CustomAnimation from './CustomAnimation';

export default class AccelateAnimation implements CustomAnimation {
  private target: TransformNode;
  private type: 'position' | 'rotation';
  private frameRate: number = 60;
  private animationQueue = new Array<{
    onmillsec: Vector3;
    duration: number;
  }>();
  constructor(target: TransformNode, type: 'position' | 'rotation') {
    this.target = target;
    this.type = type;
    setInterval(this.update.bind(this), 1000 / this.frameRate);
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
  private update() {
    const deltaTime = 1000 / 60;
    this.animationQueue.forEach(({ onmillsec, duration }, idx) => {
      const delta = duration - deltaTime <= 0 ? duration : deltaTime;
      if (delta > 0) {
        this.target[this.type] = this.target[this.type].add(
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
  }
}
