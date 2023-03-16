import character from '$static/model/character.glb';
import { Module, ModelLoadDecorator } from '@zipingym/babybabylon';
import { TransformNode } from 'babylonjs';

@ModelLoadDecorator('./', character)
export default class CharacterLoadMod extends Module {
  protected onSet(): void {
    // 로딩됐을 때
    this.addEventHandler('_onLoad', ({ assets }) => {
      //모두 렌더링
      assets.addAllToScene();
      const characterNode = assets.getNodes()[0] as TransformNode;
      // this.addChild(CharacterController).setTarget(characterNode);
    });
  }
}
