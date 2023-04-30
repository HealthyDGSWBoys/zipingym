import WorldData, { RoadInfo } from './WorldData';
import Tree from '$/util/Tree';
import WorldCore from '$/core/WorldCore/WorldCore';

export default class WorldItemData extends WorldData {
  constructor(worldCore: WorldCore, roadTree: Tree<RoadItemInfo>) {
    super(worldCore, roadTree);
  }

  public rotate(direction: 'l' | 'r') {
    const children = super.rotate(direction);
    children.forEach((e) => {});
    return children;
  }
}

export interface RoadItemInfo extends RoadInfo {
  roadInfo: Array<ItemInfo>;
}

export interface ItemInfo {
  rank: number;
  row: number;
  name: itemList;
}

export type itemList = 'banana' | 'cola';
