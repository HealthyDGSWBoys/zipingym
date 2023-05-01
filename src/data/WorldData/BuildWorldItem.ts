import Tree, { TreeNode } from '$/util/Tree';
import BuildItem from './BuildItem';
import BuildWorld from './BuildWorld';
import { RoadItemInfo } from './WorldData';

export default class BuildWorldItem {
  public static build(
    tree: Tree<RoadItemInfo>,
    depth?: number
  ): Array<TreeNode<RoadItemInfo>> {
    const worldBuilder = new BuildWorld(tree, depth);
    const roads = worldBuilder.buildChildren() as Array<TreeNode<RoadItemInfo>>;
    roads.forEach((_, idx) => {
      roads[idx].val.itemInfo = BuildItem.buildItems();
    });
    return roads;
  }
}
