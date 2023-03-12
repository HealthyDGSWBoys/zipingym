import Loader from '$/package/Loader';
import character from '$static/model/character.glb';
import { TransformNode, Vector3 } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import AnimateControl from '$/util/AnimateControl';

export default class Character extends Loader {
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    this.addEventHandler('_onLoad', ({ assets }) => {
      assets.addAllToScene();
    });
    this.load();
  }
  

}
