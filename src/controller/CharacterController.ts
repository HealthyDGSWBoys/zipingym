import { Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import Route from '$util/Route';
import raw from '$static/def/dummy.json';
import { Vector3 } from 'babylonjs';

export default class CharacterController extends Controller<BABYLON.TransformNode> {
  protected onSet(): void {
    this.addEventHandler('_target', () => {
      const userGroup = this.target;
      //@ts-ignore
      const route = new Route(raw);

      const spawnpoint = (
        this.scene.getNodeByName('SpawnPoint') as BABYLON.TransformNode
      ).position;
      userGroup.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);
      //   console.log(route);
      this.addEventHandler('keydown', (e) => {
        // if (e.key == 'w') {
        //   if (route.move('f') == 1) {
        //     this.animateVec(
        //       userGroup,
        //       'position',
        //       new BABYLON.Vector3(0, 0, -2),
        //       200
        //     );
        //   }
        // } else if (e.key == 'q') {
        //   if (route.move('l') == 1) {
        //     this.animateVec(
        //       userGroup,
        //       'position',
        //       new BABYLON.Vector3(1.5, 0, 0),
        //       200
        //     );
        //   }
        // } else if (e.key == 'e') {
        //   if (route.move('r') == 1) {
        //     this.animateVec(
        //       userGroup,
        //       'position',
        //       new BABYLON.Vector3(-1.5, 0, 0),
        //       200
        //     );
        //   }
        // }

        if (e.key == 'w') {
          if (route.move('f') == 1) {
            this.target.position = this.target.position.add(
              new Vector3(0, 0, -2)
            );
          }
        } else if (e.key == 'q') {
          if (route.move('l') == 1) {
            this.target.position = this.target.position.add(
              new Vector3(1.5, 0, 0)
            );
          }
        } else if (e.key == 'e') {
          const rightMovement = route.move('r');
          if (rightMovement == 1) {
            this.target.position = this.target.position.add(
              new Vector3(-1.5, 0, 0)
            );
          } else if (rightMovement == -1) {
            this.target.addRotation(0, Math.PI / 2, 0);
          }
        }
      });
    });
  }
}
