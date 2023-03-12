import Loader from '$/package/Loader';
import character from '$static/model/character.glb';
import { TransformNode } from 'babylonjs';
import UserController from '../controller/User';

export default class Character extends Loader {
  // 로딩해 올 URL 지정
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    // 모델이 렌더링 됐을 때 실행
    this.addEventHandler('_onLoad', ({ assets }) => {
      // 모델을 씬에 추가해서 직접 보이게 하는 코드
      assets.addAllToScene();
      this.addChild(UserController).setTarget(
        assets.getNodes().find((node) => node.name == 'Cone')
          ?.parent as TransformNode
      );
    });
    this.load();
  }
}
