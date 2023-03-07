import Loader from './Loader';
import character from '$static/model/character.glb';
import { TransformNode, Vector3 } from 'babylonjs';
import AnimateControl from '$/util/AnimateControl';

export default class Character extends Loader {
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets }) => {
      assets.addAllToScene();
      const scene = this.getScene();
      const character = assets.getNodes()[0] as TransformNode;
      // const animation = new AnimateControl<Vector3>(character.position);
      character.position = scene
        .getTransformNodeByName('SpawnPoint')!
        .position.clone();
      const animation = new AnimateControl<Vector3>(character.position);
      this.addEventHandler('keydown', (e) => {
        if (e.key == ' ') animation.addAnimate(new Vector3(0, 0, -2), 200);
      });
      this.addEventHandler('update', (e) => {
        animation.update(e.deltaTime);
      });
    });
    this.load();
  }
}
