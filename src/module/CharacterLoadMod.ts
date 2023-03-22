import CharacterController from '$/controller/character/CharacterCon';
import character from '$static/model/character.glb';
import { Module, Loader } from '@zipingym/babybabylon';
import { Mesh, TransformNode } from 'babylonjs';

@Loader('./', character)
export default class CharacterLoadMod extends Module {
  protected onSet(): void {
    // 로딩됐을 때
    this.addEventHandler('_onLoad', ({ assets }) => {
      //모두 렌더링
      assets.addAllToScene();
      const characterNode = assets.getNodes()[0] as Mesh;
      this.addChild(CharacterController).setTarget(characterNode);
    });
  }
}
