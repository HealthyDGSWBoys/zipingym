import Core from '$/global/core/Core';
import ModelStorage from '$/global/model/ModelStorage';
import { ModelNameUnion } from '$/global/model/Models';
import { ControlTarget } from '../controller/Controlable';
import { AnimationGroup, Node, TransformNode, Vector3 } from '@babylonjs/core';

export default class Character extends ControlTarget<TransformNode> {
  private static characterId: number = 0;
  protected animations: Array<AnimationGroup>;
  protected name: string;
  constructor(model?: ModelNameUnion, name?: string) {
    name = name ?? String(Character.characterId);
    Character.characterId++;
    const character = (
      ModelStorage.get(model ?? 'dummyCharacter').getNodes()[0] as TransformNode
    ).clone(name, Core.get.root)!;
    super(character);
    this.animations = ModelStorage.get(
      model ?? 'dummyCharacter'
    ).animationGroups;
    character.scaling = new Vector3(1.6, 1.6, 1.6);
    character.rotation = new Vector3(0, Math.PI, 0);
    this.name = name;
  }

  public get worldPosition() {
    return this.target.absolutePosition;
  }
}
