import { AnimationController, Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import Route from '$util/Route';
import raw from '$static/def/dummy.json';
import { Vector3 } from 'babylonjs';

export default class CharacterController extends Controller<BABYLON.TransformNode> {
  protected onSet(): void {
    this.addEventHandler('_target', () => {});
  }
}
