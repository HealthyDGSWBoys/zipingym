import WorldData, { RoadInfo } from './WorldData';
import Tree, { TreeNode } from '$/util/Tree';
import WorldCore from '$/core/WorldCore/WorldCore';
import BuildWorld from './BuildWorld';
import BuildItem from './BuildItem';

export default class WorldItemData extends WorldData {
  constructor(worldCore: WorldCore, roadTree: Tree<RoadItemInfo>) {
    super(worldCore, roadTree);
  }

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

      const builder = new BuildWorld(this.roadTree, 2);
      const children = builder.buildChildren();
      this.roadTree.setRoot(targetNode);
      children.forEach((child) => {
        //@ts-expect-error
        child.val.roadInfo = BuildItem.buildItems();

        this.worldCore.drawRoad(child.val);
      });
    }
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
