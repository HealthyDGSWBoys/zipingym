import { TransformNode, Vector3 } from '@babylonjs/core';
import { ItemInfo } from './itemlist';
import ModelStorage from '$/static/model/ModelStorage';

export default class ItemFactory {
  private items: Array<TransformNode>;
  private id: number = 0;
  private model: TransformNode;

  constructor(private info: StrictItemInfo) {
    this.items = new Array();
    const model = ModelStorage.get('items')
      .getNodes()
      .find(({ name }) => name === this.info.model);
    this.model = model as TransformNode;
  }

  public deploy(parent: TransformNode, position: Vector3 = new Vector3()) {
    const newModel = this.model.clone(this.getName(), parent)!;
    this.id++;
    newModel.position = position;
    this.items.push(newModel);
    return this.id - 1;
  }

  public dispose(id: number) {
    this.items.find(({ name }) => this.getName(id));
  }

  private getName(id?: number) {
    return this.info.name + String(id ?? this.id);
  }
}

export interface StrictItemInfo extends ItemInfo {
  model: string;
}
