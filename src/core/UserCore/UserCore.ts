import CustomAnimation from '$/@legacy/animation/CustomAnimation';
import AccelateAnimation from '$/module/animation/AccelateAnimation';
import KeyframeAnimation from '$/module/animation/KeyframeAnimation';
import ImportMeshLoader, {
  ImportMeshResult,
} from '$/util/loader/ImportMeshLoader';
import {
  AssetContainer,
  Mesh,
  MeshBuilder,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';

export default class UserCore {
  private positionAnimation: CustomAnimation;
  private rotationAnimation: CustomAnimation;
  private userMesh: TransformNode;
  constructor(
    private scene: Scene,
    private root: TransformNode,
    private user: AssetContainer
  ) {
    this.userMesh = user.getNodes()[0];
    console.log(this.userMesh);
    this.userMesh.position = root.absolutePosition.clone();
    this.userMesh.rotation.set(0, Math.PI, 0);
    this.userMesh.parent = root;
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      scene
    );
    camera.parent = this.userMesh;
    camera.setTarget(this.userMesh.position);
    camera.position = camera.position.add(new Vector3(0, 0.5, 0));

    this.positionAnimation = new AccelateAnimation(this.userMesh, 'position');
    this.rotationAnimation = new KeyframeAnimation(this.userMesh, 'rotation');
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
