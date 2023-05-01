import Tree, { TreeNode } from '$/util/Tree';
import { RoadInfo } from './WorldData';
import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';
import { ItemInfo } from './WorldData';

export default class BuildItem {
  private static ItemRank: Map<number, number> = new Map([
    [RoadCalculator.RoadLength / 2, 1],
    [0, 1],
    [RoadCalculator.RoadLength / 2, 1],
  ]);

  private static ItemRow: Map<number, number> = new Map([
    [RoadCalculator.RoadWidth / 2, 1],
    [0, 1],
    [RoadCalculator.RoadWidth, 1],
  ]);

  private static ItemCount: Map<number, number> = new Map([
    [0, 1],
    [1, 1],
    [2, 3],
    [3, 2],
  ]);

  public static buildItems() {
    // const itemCount = Random.getRandom(this.ItemCount);
    // const positions = Random.getRandoms(this.ItemRank, itemCount);
    const result: Array<ItemInfo> = new Array();
    // positions.forEach((rank) => {
    //   result.push({
    //     rank,
    //     row: Random.getRandom(this.ItemRow),
    //     name: 'banana',
    //   });
    // });
    return result;
  }
}
