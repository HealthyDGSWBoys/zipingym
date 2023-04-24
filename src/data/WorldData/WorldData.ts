import WorldCore from '$/core/WorldCore/WorldCore';
import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core/Maths/math';

export default class WorldData {
  private static roadLength: number = 15;
  constructor(private roadTree: Tree<RoadInfo>) {}
  public length(node: TreeNode<RoadInfo> = this.roadTree.getRoot) {
    return node.val.length * WorldData.roadLength;
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
