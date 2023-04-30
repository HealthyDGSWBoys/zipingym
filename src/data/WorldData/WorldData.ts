import WorldCore from '$/core/WorldCore/WorldCore';
import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core/Maths/math';
import BuildWorld from './BuildWorld';

export default class WorldData {
  private static roadLength: number = 30;
  constructor(private worldCore: WorldCore, private roadTree: Tree<RoadInfo>) {
    const builder = new BuildWorld(this.roadTree, 2);
    worldCore.drawRoad(roadTree.getRoot.val);
    builder.buildChildren().forEach((e) => {
      worldCore.drawRoad(e.val);
    });
  }
  public getNodeLength(node: TreeNode<RoadInfo> = this.roadTree.getRoot) {
    return node.val.length * WorldData.roadLength;
  }

  private deleteRoot?: RoadInfo;
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
      children.forEach((e) => {
        this.worldCore.drawRoad(e.val);
      });
      return children;
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
