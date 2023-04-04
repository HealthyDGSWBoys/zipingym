import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';
import Item from './item';

export const itemEnum = {
  banana: 'banana',
  cola: 'cola',
};
export type itemUnion = (typeof itemEnum)[keyof typeof itemEnum];

export default class ItemManager {
  private items: Array<{
    name: itemUnion;
    onTouch: () => void;
  }> = [
    {
      name: itemEnum.banana,
      onTouch: () => console.log,
    },
    {
      name: itemEnum.banana,
      onTouch: () => console.log,
    },
  ];
  private itemModelMap: Map<itemUnion, Item> = new Map();
  constructor(itemsContainer: AssetContainer) {
    this.items.forEach(({ name, onTouch }) => {
      this.itemModelMap.set(
        name,
        new Item(
          name,
          onTouch,
          itemsContainer.transformNodes.find((e) => (e.name = name as string))
        )
      );
    });
  }

  public get(item: itemUnion) {
    return this.itemModelMap.get(item);
  }
}
