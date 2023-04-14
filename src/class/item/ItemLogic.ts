import { Update } from '$/interface/Updateable';
import Command from '$/static/command/Command';
import Random from '$/util/Random';
import { TransformNode, Vector3 } from '@babylonjs/core';
import Item from './Item';
import ItemFactory from './ItemFactory';
import Itemlist from './itemlist';
import { rotation } from '../world/RoadCalculator';

export default class ItemLogic extends Update {
  private itemFactorys: Map<ItemFactory, number>;
  private itemCounts: Map<number, number> = new Map([
    [0, 4],
    [1, 2],
    [2, 1],
  ]);
  private itemRowPosition: Map<number, number> = new Map([
    [-1, 1],
    [0, 1],
    [1, 1],
  ]);
  private itemRankPosition: Map<number, number> = new Map([
    [5, 1],
    [0, 1],
    [-5, 1],
  ]);
  constructor() {
    super();
    this.itemFactorys = new Map();
    Itemlist.forEach((info) => {
      this.itemFactorys.set(
        new ItemFactory({
          ...info,
          model: info.model ?? info.name,
        }),
        1
      );
    });

    Command.get.world.addCallbackOnbuild(({ add }) => {
      add.forEach(({ val }) => {
        val.nodes.forEach((node) => {
          this.makeRandomItem(node, val.rotation);
        });
      });
    });
  }
  private makeRandomItem(parent: TransformNode, rotation: rotation): number {
    const count = Random.getRandom(this.itemCounts);
    const ranks = Random.getRandoms(this.itemRankPosition, count);
    ranks.forEach((rank) => {
      const row = Random.getRandom(this.itemRowPosition);
      Random.getRandom(this.itemFactorys).deploy(
        parent,
        rotation == 'u' || rotation == 'd'
          ? new Vector3(row, 0, rank)
          : new Vector3(rank, 0, row)
      );
    });
    return count;
  }
  public update(deltaTime: number): void {}
}
