import AssetContainerLoader from '$/package/Loader/AssetContainerLoader';
import { TransformNode } from '@babylonjs/core';
import { itemList, itemListValue } from '$/data/WorldData/WorldData';
import { ItemMeshs } from './ItemCore';

export default class ItemImporter extends AssetContainerLoader {
  public async import(url: string): Promise<ItemMeshs> {
    const assets = await this.load(url);
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
