import Loader from '$/package/Loader';
import character from '$static/model/character.glb';
import { TransformNode } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import CharacterController from '../controller/CharacterController';

export default class Character extends Loader {
  // 로딩해 올 URL 지정
  protected url: [string, string] = ['./', character];

  protected onSet(): void {
    // 모델이 렌더링 됐을 때 실행
    this.addEventHandler('_onLoad', ({ assets }) => {
      // 모델을 씬에 추가해서 직접 보이게 하는 코드
      assets.addAllToScene();

      //캐릭터 그룹 선택
      const characterNode = assets.getNodes()[0] as BABYLON.TransformNode;
      this.addChild(CharacterController).setTarget(characterNode);
    });
    this.load();
  }
}
