import { ItemInfo, itemList, itemListValue } from '$/data/WorldData/WorldData';
import AssetContainerLoader from '$/util/loader/AssetContainerLoader';
import { Scene, TransformNode } from '@babylonjs/core';

export default class ItemCore {
  constructor(private items: ItemMeshs) {}
  public draw(parent: TransformNode, info: Array<ItemInfo>) {
    const meshs: Array<TransformNode> = new Array();
    info.forEach((e) => {
      const get = this.items.get(e.name);
      if (get === undefined) throw new Error("Can't find item mesh");
      else {
        const item = get.clone(e.name, parent);
        item!.position.set(e.row, 0, e.rank);
        meshs.push(item!);
      }
    });
    return meshs;
  }

  public static async load(url: string, scene: Scene) {
    const assets = await AssetContainerLoader.load(url, scene);
    const result: Map<itemList, TransformNode> = new Map();
    itemListValue.forEach((itemName: itemList) => {
      const item = assets.getNodes().find(({ name }) => name === itemName);
      if (item === undefined) {
        throw new Error("Can't find Item Mesh");
      } else {
        result.set(itemName, item as TransformNode);
      }
    });
    return result;
  }
}

export type ItemMeshs = Map<itemList, TransformNode>;
