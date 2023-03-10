import Loader from '$/package/Loader';
import character from '$static/model/character.glb';
import { TransformNode } from 'babylonjs';
import UserController from '../controller/User';

export default class Character extends Loader {
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    this.addEventHandler('_onLoad', ({ assets }) => {
      assets.addAllToScene();
      this.addChild(UserController).setTarget(
        assets.getNodes().find((node) => node.name == 'Cone')
          ?.parent as TransformNode
      );
    });
    this.load();
  }
}
