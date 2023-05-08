import WorldCore from '$/core/WorldCore/WorldCore';
import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core/Maths/math';
import RoadCalculator from './RoadCalculator';
import BuildWorldItem from './BuildWorldItem';

export default class WorldData {
  private roadTree: Tree<RoadItemInfo> = new Tree({
    length: 3,
    origin: 'f',
    position: new Vector3(0, 0, -15),
    rotation: 'u',
    itemInfo: [[], [], []],
  });
  constructor(protected worldCore: WorldCore) {
    this.build();
    this.roadTree.traverseBFS((node) => worldCore.drawRoad(node.val));
  }

  private build() {
    return BuildWorldItem.build(this.roadTree, 2);
  }
  public getNodeLength(node: TreeNode<RoadInfo> = this.roadTree.getRoot) {
    return node.val.length * RoadCalculator.RoadLength;
  }
  public get getItems() {
    return this.worldCore.getItems();
  }
  public get rootNode() {
    return this.roadTree.getRoot;
  }
  protected deleteRoot?: RoadItemInfo;
  public rotate(direction: 'l' | 'r') {
    const targetNode = this.roadTree.root
      .getChildren()
      .find((child) => child.val.origin === direction);

    if (targetNode === undefined) {
      throw new Error('Invalid Road');
    } else {
      if (this.deleteRoot != undefined)
        this.worldCore.disposeRoad(this.deleteRoot);
      this.deleteRoot = this.roadTree.root.val;

      const reverseRoad = this.roadTree.root
        .getChildren()
        .find((child) => child.val.origin === (direction == 'l' ? 'r' : 'l'));
      if (reverseRoad != undefined)
        this.roadTree.traverseBFS(({ val }) => {
          this.worldCore.disposeRoad(val);
        }, reverseRoad);

      this.roadTree.setRoot(targetNode);
      const children = this.build();
      children.forEach((e) => {
        this.worldCore.drawRoad(e.val);
      });
    }
  }
}

export type direction = 'l' | 'f' | 'r';
export type rotation = 'l' | 'r' | 'u' | 'd';

export interface RoadInfo {
  length: number;
  origin: direction;
  position: Vector3;
  rotation: rotation;
}

export interface RoadItemInfo extends RoadInfo {
  itemInfo: Array<Array<ItemInfo>>;
}

export interface ItemInfo {
  rank: number;
  row: number;
  name: itemList;
}

export const itemListValue = [
  'banana',
  'cola',
  'soju',
  'NRGbar',
  'proteinPowder',
  'injector',
] as const;

export type itemList = (typeof itemListValue)[number];
