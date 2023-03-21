import { AnimationController, Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import Route from '$util/Route';
import raw from '$static/def/dummy.json';
import { Vector3 } from 'babylonjs';
import { Route2 } from '$util/Route2';

export default class CharacterController extends Controller<BABYLON.TransformNode> {
  private static KeyMap = new Map([
    ['w', 'f'],
    ['q', 'l'],
    ['e', 'r'],
  ]);
  protected onSet(): void {
    this.addEventHandler('_target', () => {
      const userGroup = this.target;
      //@ts-ignore
      const route = new Route(raw) as Route2;

      const spawnpoint = (
        this.scene.getNodeByName('SpawnPoint') as BABYLON.TransformNode
      ).position;
      userGroup.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);

      const animationPositionController = this.addChild(
        AnimationController
      ).setTarget({
        target: userGroup,
        value: 'position',
      });
      const animationRotationController = this.addChild(
        AnimationController
      ).setTarget({
        target: userGroup,
        value: 'rotation',
      });
      const rotDuration: number = 100;
      const moveDuration: number = 200;
      const animateMove = (value: Vector3, type: 'position' | 'rotation') => {
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
      };

      this.addEventHandler('keydown', (e) => {
        if (e.key == 'w') {
          const move: 'f' = CharacterController.KeyMap.get('w') as 'f';
          const result = route.move(move);
        } else if (e.key == 'q') {
        } else if (e.key == 'e') {
        }
      });
    });
  }
}
