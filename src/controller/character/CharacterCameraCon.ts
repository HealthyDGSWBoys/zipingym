import { Controller, Module } from '@zipingym/babybabylon';
import { Camera, FollowCamera, Mesh, TransformNode } from 'babylonjs';
import * as BABYLON from 'babylonjs';

export default class CharacterCameraMod extends Controller<Mesh> {
  protected onSet(): void {
    this.addEventHandler('_target', () => {
      const camera = new BABYLON.FollowCamera(
        'follow_camera',
        new BABYLON.Vector3(-10, 70, -10),
        this.scene
      );
      camera.radius = 30;
      camera.heightOffset = 10;
      camera.rotationOffset = 0;
      camera.cameraAcceleration = 0.005;
      camera.maxCameraSpeed = 10;
      camera.lockedTarget = this.target;
    });
  }
}
