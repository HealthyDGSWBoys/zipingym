import CustomAnimation from '$/@legacy/animation/CustomAnimation';
import AccelateAnimation from '$/module/animation/AccelateAnimation';
import KeyframeAnimation from '$/module/animation/KeyframeAnimation';
import {
  MeshBuilder,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';

export default class UserCore {
  private positionAnimation: CustomAnimation;
  private rotationAnimation: CustomAnimation;
  constructor(
    private scene: Scene,
    private root: TransformNode,
    private userMesh: TransformNode = MeshBuilder.CreateDisc('User')
  ) {
    userMesh.position = root.absolutePosition.clone();
    userMesh.rotation.set(0, Math.PI, 0);
    userMesh.parent = root;
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      scene
    );
    camera.parent = userMesh;
    camera.setTarget(userMesh.position);
    camera.position = camera.position.add(new Vector3(0, 0.5, 0));

    this.positionAnimation = new AccelateAnimation(userMesh, 'position');
    this.rotationAnimation = new KeyframeAnimation(userMesh, 'rotation');
  }

  public move(position: Vector3, duration: number = 300) {
    this.positionAnimation.animate('add', position, duration);
  }

  public rotate(rotation: 'l' | 'r', duration: number = 300) {
    this.rotationAnimation.animate(
      'add',
      new Vector3(0, rotation == 'l' ? -Math.PI / 2 : Math.PI / 2),
      duration
    );
  }
}
