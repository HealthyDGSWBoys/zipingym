import { itemList } from '$/data/WorldData/WorldData';
import { Sound, TransformNode, Vector3 } from '@babylonjs/core';
import GoodItemSoundSrc from '$static/sound/gooditem.wav';
import BadItemSoundSrc from '$static/sound/baditem.wav';

export default class ItemCollusion {
  private static itemSize = new Vector3(1, 1, 1);
  private goodItemDisposeSound: Sound;
  private badItemDisposeSound: Sound;
  constructor(
    public onCollusion: Map<itemList, (node: TransformNode) => void>
  ) {
    this.goodItemDisposeSound = new Sound(
      'goodItemDisposeSound',
      GoodItemSoundSrc,
      null,
      null,
      {
        playbackRate: 0.5,
        volume: 0.5,
      }
    );
    this.badItemDisposeSound = new Sound(
      'badItemDisposeSound',
      BadItemSoundSrc,
      null,
      null,
      {
        playbackRate: 0,
        volume: 0.5,
      }
    );
  }

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
              this.goodItemDisposeSound.play();
            })
          )(item);
        }
      });
  }
}
