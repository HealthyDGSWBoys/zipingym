import {
  MeshBuilder,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';

export default class UserCore {
  constructor(private scene: Scene, private root: TransformNode) {
    const user = MeshBuilder.CreateDisc('User');

    user.position = root.absolutePosition.clone();
    user.parent = root;
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      scene
    );
    camera.parent = user;
    camera.setTarget(user.position);
    camera.position = camera.position.add(new Vector3(0, 0.5, 0));
  }
}
