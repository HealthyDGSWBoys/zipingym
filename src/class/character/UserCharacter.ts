import WorldEngine from '$/util/WorldEngine';
import {
  Scene,
  Mesh,
  Vector3,
  FollowCamera,
  AssetContainer,
} from '@babylonjs/core';
import CharacterControl from '../control/CharacterControl';
import ExerciseInput from '../control/ExerciseInput/ExerciseInput';
import KeyboardInput from '../control/KeyboardInput';

export default class UserCharacter {
  private scene: Scene;
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
    this.mesh = (assets.getNodes()[0] as Mesh).clone();
    (assets.getNodes()[0] as Mesh).dispose();
    this.assetContainer.animationGroups.forEach((anime) => {
      anime.pause();
    });
    this.mesh.scaling = new Vector3(1.6, 1.6, 1.6);
    this.mesh.rotation = new Vector3(0, Math.PI, 0);
    this.controller = new CharacterControl(
      this.mesh,
      engine,
      webcam == null ? new KeyboardInput() : new ExerciseInput(webcam)
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
}
