import { TransformNode, Vector3 } from '@babylonjs/core';
import { ItemInfo } from './itemlist';
import ModelStorage from '$/static/model/ModelStorage';
import Core from '$/static/core/Core';

export default class ItemFactory {
  private static range: number = 1;
  private items: Array<TransformNode>;
  private id: number = 0;
  private model: TransformNode;

  constructor(
    private info: StrictItemInfo,
    private onCollusion: (item: TransformNode) => void
  ) {
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

  public checkCollusion(target: Vector3) {
    const result: Array<TransformNode> = new Array();
    this.items.forEach(({ absolutePosition }, idx) => {
      const distance = target.subtract(absolutePosition);
      let isCollusion: boolean = true;
      //@ts-expect-error
      ['x', 'y', 'z'].forEach((pos: 'x' | 'y' | 'z') => {
        if (Math.abs(distance[pos]) > ItemFactory.range) {
          isCollusion = false;
        }
      });
      if (isCollusion) this.onCollusion(this.items[idx]);
    });
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].isDisposed()) {
        this.items.splice(i, 1);
        i--;
      }
    }
    return result;
  }
}

export interface StrictItemInfo extends ItemInfo {
  model: string;
}
