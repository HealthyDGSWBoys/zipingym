import Core from '$/static/core/Core';
import ModelStorage from '$/static/model/ModelStorage';
import { ModelNameUnion } from '$/static/model/Models';
import { Controller } from '../controller/Controller';
import { Node, TransformNode } from '@babylonjs/core';

export default class Character {
  private static characterId: number = 0;

  protected name: string;
  protected model: TransformNode;
  protected controllers: Array<Controller<Node>>;
  constructor(model?: ModelNameUnion, name?: string) {
    this.name = name ?? String(Character.characterId);
    Character.characterId++;
    this.controllers = new Array();
    this.model = (
      ModelStorage.get(model ?? 'dummyCharacter').getNodes()[0] as TransformNode
    ).clone(this.name, Core.get.root)!;
  }

  public addController(
    MakeController: new (asset: TransformNode) => Controller<TransformNode>
  ) {
    this.controllers.push(new MakeController(this.model));
  }
}
