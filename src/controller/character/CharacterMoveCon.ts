import { Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import CharacterAnimationCon from './CharacterAnimationCon';
import Route from '$util/Route';
import raw from '$static/def/dummy.json';

export default class CharacterMoveCon extends Controller<BABYLON.TransformNode> {
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

      const animationController = this.addChild(
        CharacterAnimationCon
      ).setTarget(userGroup);
      const animateMove = (value: Vector3, type: 'position' | 'rotation') => {
        animationController.executeEventDirectly('__animateMove', {
          value,
          type,
        });
      };

      this.addEventHandler('keydown', (e) => {
        const move = CharacterMoveCon.KeyMap.get(e.key);
        console.log(move);
        if (move != undefined) {
          //@ts-ignore
          const result = route.move(move);
          if (move == 'f') {
            if (result == 1) {
              animateMove(new Vector3(0, 0, -1), 'position');
            }
          } else if (e.key == 'q') {
            if (result == 1) {
              animateMove(new Vector3(1, 0, 0), 'position');
            } else if (result == -1) {
              animateMove(new Vector3(Math.PI / 1, 0, 0), 'rotation');
            }
          } else if (e.key == 'e') {
            if (result == 1) {
              animateMove(new Vector3(-1, 0, 0), 'position');
            } else if (result == -1) {
              animateMove(new Vector3(-Math.PI / 1, 0, 0), 'rotation');
            }
          }
        }
      });
    });
  }
}
