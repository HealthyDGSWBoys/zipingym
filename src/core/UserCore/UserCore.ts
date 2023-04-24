import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core';

export default class UserCore {
  constructor(private scene: Scene) {
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      scene
    );
  }
}
