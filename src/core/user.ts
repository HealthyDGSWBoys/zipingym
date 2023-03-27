import Core from './core';
import dummyCharacter from '$static/model/character.glb';
import { AssetContainer, Mesh, Vector3 } from 'babylonjs';
import { LoadAll } from '$/function/Load';
import * as BABYLON from 'babylonjs';
import CharacterControl from '$/class/control/CharacterControl';
import rawMap from '$static/def/dummy.json';
import KeyboardInput from '$/class/control/KeyboardInput';

export default class User extends Core {
  private static CharacterModelFile: Map<string, string> = new Map([
    ['dummy', dummyCharacter],
  ]);
  private userModel: Map<string, AssetContainer>;
  private control: CharacterControl;
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      //캐릭터 모델 비동기 로드
      LoadAll(User.CharacterModelFile, this.scene)
        .then((users) => {
          this.userModel = users;
          const dummyCharacter = this.userModel.get('dummy');
          if (dummyCharacter != undefined) {
            dummyCharacter.addAllToScene();
            resolve();
          } else {
            reject('NO MAP EXIST');
          }
        })
        .catch(reject);
    });
  };

  public setsync = () => {
    const camera = new BABYLON.FollowCamera(
      'user_camera',
      new BABYLON.Vector3(0, 0, 0),
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
      new KeyboardInput()
    );
  };
  public loop = (deltaTime: number) => {};
}
