import Core from '$/static/core/Core';
import { ModelNameUnion } from '$/static/model/Models';
import Character from './Character';
import { FollowCamera, Mesh, Vector3 } from '@babylonjs/core';

export default class User extends Character {
  constructor(model: ModelNameUnion, name: string) {
    super(model, name);
    const camera = new FollowCamera(
      'user_camera',
      new Vector3(0, 0, 0),
      Core.get.scene,
      this.target as Mesh
    );
    camera.cameraAcceleration = 0.5;
    camera.rotationOffset = 180;
  }
}
