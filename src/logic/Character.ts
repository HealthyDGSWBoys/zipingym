import Loader from './Loader';
import character from '$static/model/character.glb';
import { TransformNode } from 'babylonjs';

export default class Character extends Loader {
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets }) => {
      assets.addAllToScene();
      const scene = this.getScene();
      const character = assets.getNodes()[0] as TransformNode;
      character.position = scene
        .getTransformNodeByName('SpawnPoint')!
        .position.clone();
      this.addEventHandler('keydown', (e) => {
        if (e.key == ' ') character.position.z -= 1;
      });
    });
    this.load();
  }
}
