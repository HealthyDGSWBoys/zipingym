import Loader from '$/package/Loader';
import dummyMap from '$static/model/dummy.glb';
import beachMap from '$static/model/beach2.glb';
import * as BABYLON from 'babylonjs';
import { Mesh } from 'babylonjs';
import WorldTest from '../controller/WorldTest';

export default class DummyMap extends Loader {
  // 로딩해 올 맵 URL 지정
  protected url: [string, string] = ['./', dummyMap];

  protected onSet(): void {
    // 로딩됐을 때
    this.addEventHandler('_onLoad', ({ assets }) => {
      //모두 렌더링
      assets.addAllToScene();
      this.addChild(WorldTest).setTarget(
        assets.getNodes()[0] as BABYLON.TransformNode
      );
    });
    this.load();
  }
}
