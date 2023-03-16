import dummyMap from '$static/model/dummy.glb';
import { Module, Loader } from '@zipingym/babybabylon';

@Loader('./', dummyMap)
export default class DummyMapLoadMod extends Module {
  protected onSet(): void {
    // 로딩됐을 때
    this.addEventHandler('_onLoad', ({ assets }) => {
      //모두 렌더링
      assets.addAllToScene();
    });
  }
}
