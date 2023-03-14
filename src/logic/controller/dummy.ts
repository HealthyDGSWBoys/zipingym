import Controller from '$/package/Controller';
import AnimateControl from '$/util/AnimateControl';
import Route from '$/util/Route';
import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';

import raw from '$static/def/dummy.json';

export default class UserController extends Controller<BABYLON.TransformNode> {
  //@ts-ignore
  private route = new Route(raw);
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
        if (e.key == ' ') {
          const keyFrames = [
            {
              frame: 0,
              value: 0,
            },
            {
              frame: 120,
              value: 1.5,
            },
          ];

          xSlide.setKeys(keyFrames);
          scene.beginAnimation(usergroup, 0, 120);
        }
      });
      usergroup.rotation.x += 1;
      //   usergroup.addRotation(0, 1.5, 0);
      const frameRate = 120;
      const xSlide = new BABYLON.Animation(
        'xSlide',
        'rotation.y',
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      usergroup.animations.push(xSlide);

      this.addEventHandler('update', ({ deltaTime }) => {
        animatePos.update(deltaTime);
        animateRot.update(deltaTime);
      });
    });
  }
}
