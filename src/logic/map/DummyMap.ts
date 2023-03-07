import Loader from '../Loader';
import dummyMap from '$static/model/dummy.glb';
import * as BABYLON from 'babylonjs';

export default class DummyMap extends Loader {
  protected url: [string, string] = ['./', dummyMap];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets: scene }) => {
      scene.addAllToScene();
    });
    this.addEventHandler('onProgress', (e) => {});
    this.addEventHandler('onError', (error) => {
      console.log(error.message);
    });
    this.load();
  }
}
