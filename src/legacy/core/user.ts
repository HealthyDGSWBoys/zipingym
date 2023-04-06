import Core from './core';
import dummyCharacter from '$static/model/character.glb';
import animeCharacter from '$static/model/girl.glb';
import { AssetContainer } from '@babylonjs/core';
import { LoadAll } from '$/function/Load';
import WebcamBuilder from '$/util/Webcam';
import UserCharacter from '$/legacy/class/character/UserCharacter';

export default class User extends Core {
  private static CharacterModelFile: Map<string, string> = new Map([
    ['dummy', dummyCharacter],
    ['anime', animeCharacter],
  ]);
  private userModel: Map<string, AssetContainer>;
  private camera: HTMLVideoElement | null;
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      Promise.all([
        LoadAll(User.CharacterModelFile, this.scene),
        this.share.input == 'webcam' ? WebcamBuilder() : null,
      ]).then(([users, webcam]) => {
        this.userModel = users;
        this.camera = webcam;
        resolve();
      });
    });
  };

  public setsync = () => {
    const user = new UserCharacter(
      this.scene,
      this.userModel.get('anime'),
      this.share.worldEngine,
      this.camera
    );
  };
  public loop = (deltaTime: number) => {};
}
