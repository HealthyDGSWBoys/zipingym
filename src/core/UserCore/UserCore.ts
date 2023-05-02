import CustomAnimation from '$/@legacy/animation/CustomAnimation';
import AccelateAnimation from '$/module/animation/AccelateAnimation';
import KeyframeAnimation from '$/module/animation/KeyframeAnimation';
import SkeletonAnimation from '$/module/animation/SkeletonAnimation';
import { ImportMeshResult } from '$/util/loader/ImportMeshLoader';
import {
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core';

export default class UserCore {
  private positionAnimation: CustomAnimation;
  private rotationAnimation: CustomAnimation;
  private skeletonAnimation: SkeletonAnimation;
  private userMesh: TransformNode;
  constructor(
    private scene: Scene,
    private root: TransformNode,
    private user: ImportMeshResult
  ) {
    this.userMesh = user.meshes[1];
    this.userMesh.position = root.absolutePosition.clone();
    this.userMesh.rotation = new Vector3(0, Math.PI, 0);
    this.userMesh.parent = root;
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      scene
    );
    camera.parent = this.userMesh;
    camera.setTarget(this.userMesh.position);
    camera.position = camera.position.add(new Vector3(0, 1.5, 0));

    this.positionAnimation = new AccelateAnimation(this.userMesh, 'position');
    this.rotationAnimation = new KeyframeAnimation(this.userMesh, 'rotation');
    this.skeletonAnimation = new SkeletonAnimation(
      this.scene,
      this.user.skeletons[0]
    );
    setInterval(this.animationCommander.bind(this), 1000 / 30);
    this.currentCheck = this.currentPosition;
  }
  private currentCheck: Vector3;
  private isIdle: boolean = false;
  private animationCommander() {
    const { x, z } = this.currentCheck.subtract(this.currentPosition);

    const differance = Math.abs(x) + Math.abs(z);
    if (differance > 0.01 && this.isIdle) {
      this.isIdle = false;
      this.skeletonAnimation.play(this.skeletonAnimation.animations[2]);
    } else if (differance == 0 && !this.isIdle) {
      this.isIdle = true;
      this.skeletonAnimation.play(this.skeletonAnimation.animations[0]);
    }

    this.currentCheck = this.currentPosition;
  }

  public move(position: Vector3, duration: number = 300) {
    this.positionAnimation.animate('add', position, duration);
  }

  public rotate(rotation: 'l' | 'r', duration: number = 300) {
    this.rotationAnimation.animate(
      'add',
      new Vector3(0, rotation == 'l' ? Math.PI / 2 : -Math.PI / 2),
      duration
    );
  }

  public get worldPosition() {
    return this.userMesh.absolutePosition;
  }
  public get currentPosition() {
    return this.userMesh.position;
  }
}
