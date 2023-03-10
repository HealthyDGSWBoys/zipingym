import Controller from '$/package/Controller';
import AnimateControl from '$/util/AnimateControl';
import Route from '$/util/Route';
import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import raw from '$static/def/dummy.json';

export default class UserController extends Controller<BABYLON.TransformNode> {
  private route = new Route(raw);
  private moving: number = 0;
  protected onSet(): void {
    this.addEventHandler('_onTargetSet', () => {
      const usergroup: BABYLON.TransformNode = this.target;
      const usermesh: BABYLON.Mesh =
        usergroup.getChildMeshes()[0] as BABYLON.Mesh;
      const scene = this.share.scene;
      const animatePos = new AnimateControl(usergroup.position);
      const animateRot = new AnimateControl(usergroup.rotation);
      const { x, y, z } = scene.getTransformNodeByName('SpawnPoint')!.position;
      usergroup.position.set(x, y, z);

      this.addEventHandler('keydown', (e) => {
        if (e.key == 'w') {
          animatePos.addAnimate(new Vector3(0, 0, -2), 200);
        } else if (e.key == 'q' && this.moving < 0) {
          animatePos.addAnimate(new Vector3(1.5, 0, 0), 50);
          this.moving = 50;
        } else if (e.key == 'e' && this.moving < 0) {
          animatePos.addAnimate(new Vector3(-1.5, 0, 0), 50);
          this.moving = 50;
        }
      });
      console.log(this.route);
      this.addEventHandler('update', ({ deltaTime }) => {
        animatePos.update(deltaTime);
        animateRot.update(deltaTime);
        this.moving -= deltaTime;
      });
    });
  }
}
