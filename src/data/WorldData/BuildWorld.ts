import Tree, { TreeNode } from '$/util/Tree';
import { RoadInfo } from './WorldData';
import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';

export default class BuildWorld {
  private static TreeDirection: Map<'b' | 'r' | 'l', number> = new Map([
    ['b', 2],
    ['l', 3],
    ['r', 3],
  ]);

  private static TreeLength: Map<number, number> = new Map([
    [1, 1],
    [2, 2],
    [3, 4],
    [4, 2],
  ]);
  constructor(private tree: Tree<RoadInfo>, public depth: number = 3) {}

  public buildChildren() {
    const build: Array<TreeNode<RoadInfo>> = new Array();
    while (true) {
      const depth = this.tree.getMaxDepth();
      this.tree.findChildrenAtDepth(depth - 1).forEach((node) => {
        this.buildChild(node).forEach((res) => {
          build.push(res);
        });
      });
      if (this.depth <= depth) break;
    }
    return build;
  }

  private buildChild(node: TreeNode<RoadInfo>) {
    const type = Random.getRandom(BuildWorld.TreeDirection);
    const build: Array<TreeNode<RoadInfo>> = new Array();
    if (type == 'b') {
      build.push(this._buildChild(node, 'l'));
      build.push(this._buildChild(node, 'r'));
    } else {
      build.push(this._buildChild(node, type));
    }
    return build;
  }
  private _buildChild(parent: TreeNode<RoadInfo>, origin: 'r' | 'l') {
    const length = Random.getRandom(BuildWorld.TreeLength);
    const rotation = RoadCalculator.calcAbsoluteRot(
      parent.val.rotation,
      origin
    );
    const node = new TreeNode({
      isRender: false,
      length,
      origin,
      position: RoadCalculator.calcAbsolutePos(
        parent.val.rotation,
        parent.val.position,
        parent.val.length,
        rotation
      ),
      rotation,
    });
    parent.addChild(node);
    return node;
  }
}
