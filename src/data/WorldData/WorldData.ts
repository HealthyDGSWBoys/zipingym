import WorldCore from '$/core/WorldCore/WorldCore';
import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core/Maths/math';
import BuildWorld from './BuildWorld';

export default class WorldData {
  private static roadLength: number = 15;
  constructor(private worldCore: WorldCore, private roadTree: Tree<RoadInfo>) {
    const builder = new BuildWorld(this.roadTree, 3);
    builder.buildChildren().forEach((e) => {
      worldCore.drawRoad(e.val);
    });
  }
  public getNodeLength(node: TreeNode<RoadInfo> = this.roadTree.getRoot) {
    return node.val.length * WorldData.roadLength;
  }

  public rotate(direction: 'l' | 'r') {
    const targetNode = this.roadTree.root
      .getChildren()
      .find((child) => child.val.origin === direction);
    if (targetNode === undefined) throw new Error('Invalid Road');
    else {
      this.roadTree.setRoot(targetNode);
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
