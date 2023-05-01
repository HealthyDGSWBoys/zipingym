import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';
import { ItemInfo, itemList, itemListValue } from './WorldData';

export default class BuildItem {
  private static ItemRank: Map<number, number> = new Map([
    [-RoadCalculator.RoadLength / 3, 1],
    [0, 1],
    [RoadCalculator.RoadLength / 3, 1],
  ]);

  private static ItemRow: Map<number, number> = new Map([
    [-RoadCalculator.RoadWidth / 2, 1],
    [0, 1],
    [RoadCalculator.RoadWidth / 2, 1],
  ]);

  private static ItemCount: Map<number, number> = new Map([
    [0, 1],
    [1, 2],
    [2, 1],
  ]);

  public static buildItems(length: number): Array<Array<ItemInfo>> {
    const itemNameMap = new Map(itemListValue.map((name) => [name, 1]));
    const result: Array<Array<ItemInfo>> = new Array();
    for (let i = 0; i < length; i++) {
      const itemCount = Random.getRandom(this.ItemCount);
      const positions = Random.getRandoms(this.ItemRank, itemCount);
      const one: Array<ItemInfo> = new Array();
      positions.forEach((rank: number) => {
        one.push({
          rank,
          row: Random.getRandom(this.ItemRow),
          name: Random.getRandom(itemNameMap),
        });
      });
      result.push(one);
    }

    return result;
  }
}
