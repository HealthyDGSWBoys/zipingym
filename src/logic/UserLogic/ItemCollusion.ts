import Data from '$/data/Data';
import { itemList } from '$/data/WorldData/WorldData';
import { Sound, TransformNode, Vector3 } from '@babylonjs/core';

export default class ItemCollusion {
  private static itemSize = new Vector3(1.3, 1, 1.3);
  constructor(
    public onCollusion: Map<itemList, (node: TransformNode) => void>,
    private date:Data
  ) {}

  public update(items: Array<TransformNode>, userPosition: Vector3) {
    items
      .filter((item) => item.isDisposed() == false)
      .forEach((item) => {
        const deltaPosition = item.absolutePosition.subtract(userPosition);
        let flag: boolean = true;
        //@ts-expect-error
        ['x', 'y', 'z'].forEach((e: 'x' | 'y' | 'z') => {
          if (Math.abs(deltaPosition[e]) > ItemCollusion.itemSize[e])
            flag = false;
        });

        if (flag) {
          (
            this.onCollusion.get(item.name as itemList) ??
            ((node: TransformNode) => {
              node.dispose();
            })
          )(item);
          /** @todo item element 의 trigger */
            this.date.uiData.recordItem(item.name as itemList)
        }
      });
  }
}
