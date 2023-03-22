import { Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import { AnimationController } from '@zipingym/babybabylon';
import { Vector3 } from 'babylonjs';

export default class CharacterAnimationCon extends Controller<BABYLON.TransformNode> {
  protected onSet(): void {
    this.addEventHandler('_target', () => {
      const target = this.target;
      const animationPositionController = this.addChild(
        AnimationController
      ).setTarget({
        target: target,
        value: 'position',
      });
      const animationRotationController = this.addChild(
        AnimationController
      ).setTarget({
        target: target,
        value: 'rotation',
      });
      const rotDuration: number = 100;
      const moveDuration: number = 200;

      this.addEventHandler('__animateMove', ({ value, type }) => {
        const controller =
          type === 'position'
            ? animationPositionController
            : animationRotationController;
        controller.executeEvent(
          'animate',
          {
            type: 'add',
            duration: type === 'position' ? moveDuration : rotDuration,
            vector: value,
          },
          false,
          controller
        );
      });
    });
  }
}

declare global {
  interface BabyEventMap {
    __animateMove: {
      value: Vector3;
      type: 'position' | 'rotation';
    };
  }
}
