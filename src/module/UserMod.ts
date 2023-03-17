import { Vector3 } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import { Module } from '@zipingym/babybabylon';

export default class UserMod extends Module {
  public onSet() {
    const camera = new BABYLON.FreeCamera(
      'camera',
      new Vector3(-10, 70, -10),
      this.share.scene
    );
    camera.fov = 1.2;
    camera.rotation.x = Math.PI / 2;
    camera.rotation.z = Math.PI;
    camera.attachControl(true);
  }
}
