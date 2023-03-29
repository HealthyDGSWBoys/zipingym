import WorldEngine from '$/util/WorldEngine';
import {
  Scene,
  Mesh,
  Vector3,
  FollowCamera,
  AssetContainer,
  AnimationGroup,
} from '@babylonjs/core';
import CharacterControl from '../control/CharacterControl';
import ExerciseInput from '../control/ExerciseInput/ExerciseInput';
import KeyboardInput from '../control/KeyboardInput';

export default class UserCharacter {
  private scene: Scene;
  private animations: Array<AnimationGroup>;
  private assetContainer: AssetContainer;
  private mesh: Mesh;
  private controller: CharacterControl;
  constructor(
    scene: Scene,
    assets: AssetContainer,
    engine: WorldEngine,
    webcam: HTMLVideoElement | null
  ) {
    this.scene = scene;
    this.assetContainer = assets;
    this.assetContainer.addAllToScene();
    this.animations = this.assetContainer.animationGroups;
    this.mesh = (assets.getNodes()[0] as Mesh).clone();
    (assets.getNodes()[0] as Mesh).dispose();
    this.assetContainer.animationGroups.forEach((anime) => {
      anime.pause();
      anime.loopAnimation = true;
      // anime.onAnimationGroupLoopObservable = true;
      // anime.
      anime.children.forEach((child) => {
        child.animation.enableBlending = true;
        child.animation.blendingSpeed = 0.05;
        child.animation.loopMode = 1;
      });
    });
    this.mesh.scaling = new Vector3(1.6, 1.6, 1.6);
    this.mesh.rotation = new Vector3(0, Math.PI, 0);
    this.controller = new CharacterControl(
      this.mesh,
      engine,
      webcam == null ? new KeyboardInput() : new ExerciseInput(webcam),
      this.onMove.bind(this)
    );
    const camera = new FollowCamera(
      'user_camera',
      new Vector3(0, 0, 0),
      this.scene
    );
    camera.cameraAcceleration = 0.5;
    camera.rotationOffset = 180;
    camera.lockedTarget = this.mesh;
  }
  private befIdx: number = 0;
  private onMove(report: Vector3) {
    const movement = (Math.abs(report.x) + Math.abs(report.z)) * 100;
    let moveIdx: number = -1;
    if (movement == 0) {
      moveIdx = 3;
    } else if (movement <= 3) {
      moveIdx = 2;
    } else if (movement > 3) {
      moveIdx = 1;
    }
    if (this.befIdx != moveIdx) {
      // this.animations[this.befIdx].pause();
      this.animations[moveIdx].play();
      this.befIdx = moveIdx;
    } else if (!this.animations[this.befIdx].isPlaying) {
      this.animations[this.befIdx].play();
    }
  }
}
