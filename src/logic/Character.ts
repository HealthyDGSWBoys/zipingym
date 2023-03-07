import Loader from './Loader';
import character from '$static/model/character.glb';
import * as BABYLON from 'babylonjs';
import { TransformNode } from 'babylonjs';

export default class Character extends Loader {
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets }) => {
      assets.addAllToScene();
      const scene = this.getScene();
      (assets.getNodes()[0] as TransformNode).position = scene
        .getTransformNodeByName('SpawnPoint')!
        .position.clone();
    });
    this.load();
  }
}
