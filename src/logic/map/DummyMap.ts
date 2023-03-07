import Loader from '../Loader';
import dummyMap from '$static/model/dummy.glb';
import beachMap from '$static/model/beach2.glb';
import * as BABYLON from 'babylonjs';

export default class DummyMap extends Loader {
  protected url: [string, string] = ['./', dummyMap];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets: scene }) => {
      scene.addAllToScene();
    });
    this.load();
  }
}
