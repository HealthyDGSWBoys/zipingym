import Core from './core';
import dummyCharacter from '$static/model/character.glb';
import { AssetContainer, Mesh, Vector3, FollowCamera } from '@babylonjs/core';
import { LoadAll } from '$/function/Load';
import CharacterControl from '$/class/control/CharacterControl';
import KeyboardInput from '$/class/control/KeyboardInput';
import ExerciseInput from '$/class/control/ExerciseInput/ExerciseInput';
import WebcamBuilder from '$/util/Webcam';

export default class User extends Core {
  private static CharacterModelFile: Map<string, string> = new Map([
    ['dummy', dummyCharacter],
  ]);
  private userModel: Map<string, AssetContainer>;
  private control: CharacterControl;
  private camera: HTMLVideoElement;
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      Promise.all([
        LoadAll(User.CharacterModelFile, this.scene),
        WebcamBuilder(),
      ]).then(([users, webcam]) => {
        this.userModel = users;
        const dummyCharacter = this.userModel.get('dummy');
        dummyCharacter.addAllToScene();
        this.camera = webcam;
        this.scene
          .getEngine()
          .getRenderingCanvas()
          .parentElement.appendChild(this.camera);
        this.camera.style.position = 'absolute';
        this.camera.style.width = '300px';
        this.camera.play();
        resolve();
      });
    });
  };

  public setsync = () => {
    const camera = new FollowCamera(
      'user_camera',
      new Vector3(0, 0, 0),
      this.scene
    );
    camera.cameraAcceleration = 0.5;
    const dummyCharacter = this.userModel.get('dummy');
    const character = dummyCharacter.getNodes()[0] as Mesh;
    camera.lockedTarget = character;
    const spawnpoint = (this.scene.getNodeByName('SpawnPoint') as Mesh)
      .position;
    character.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);
    character.rotation = new Vector3(0, Math.PI, 0);
    this.control = new CharacterControl(
      character,
      this.share.worldEngine,
      this.share.input == 'keyboard'
        ? new KeyboardInput()
        : new ExerciseInput(this.camera)
    );
  };
  public loop = (deltaTime: number) => {};
}
