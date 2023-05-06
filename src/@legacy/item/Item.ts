import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';

export default abstract class Item {
  private static items: Array<Item> = new Array();
  //   private static abstract model: TransformNode;
  private constructor() {
    Item.items.push(this);
  }

  public dispose() {}
  private collusion(): boolean {
    return false;
  }
  public static collusion(): Array<Item> {
    const result = new Array();
    Item.items.forEach((item) => {
      if (item.collusion()) {
        result.push(item);
      }
    });
    return result;
  }
}
