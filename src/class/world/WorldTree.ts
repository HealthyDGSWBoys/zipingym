import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core';
import RoadCalculator, { direction, rotation } from './RoadCalculator';
import Random from '$/util/Random';

export default class RoadTree {
  public tree: Tree<RoadRenderNode>;
  public static DirectionRandomMap: Map<'l' | 'r' | 'b', number> = new Map([
    ['l', 1],
    ['r', 1],
    ['b', 1],
  ]);
  public static LengthRandomMap: Map<number, number> = new Map([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 1],
  ]);
  constructor(public depth: number) {
    this.tree = new Tree({
      isRender: false,
      depth: 0,
      length: 3,
      origin: 'f',
      position: new Vector3(0, 0, -15),
      rotation: 'u',
    });
    this.buildChildren();
  }

  public buildChildren() {
    while (true) {
      const depth = this.tree.getMaxDepth();
      this.tree.findChildrenAtDepth(depth - 1).forEach((node) => {
        this.buildChild(node);
      });
      if (this.depth <= depth) break;
    }
  }

  public buildChild(node: TreeNode<RoadRenderNode>) {
    const type = Random.getRandom(RoadTree.DirectionRandomMap);
    if (type == 'b') {
      this._buildChild(node, 'l');
      this._buildChild(node, 'r');
    } else {
      this._buildChild(node, type);
    }
  }

  public getNotRenderedNode(): Array<RoadRenderNode> {
    const result: Array<RoadRenderNode> = new Array();
    this.tree.traverseBFS(({ val }) => {
      if (val.isRender == false) result.push(val);
    });
    return result;
  }

  private _buildChild(parent: TreeNode<RoadRenderNode>, origin: 'r' | 'l') {
    const length = Random.getRandom(RoadTree.LengthRandomMap);
    const rotation = RoadCalculator.calcAbsoluteRot(
      parent.val.rotation,
      origin
    );
    parent.addChild(
      new TreeNode({
        isRender: false,
        depth: parent.val.depth + 1,
        length,
        origin,
        position: RoadCalculator.calcAbsolutePos(
          parent.val.rotation,
          parent.val.position,
          parent.val.length,
          rotation
        ),
        rotation,
      })
    );
  }
}

export interface RoadInfoNode {
  length: number;
  origin: direction;
  position: Vector3;
  rotation: rotation;
}

export interface RoadRenderNode extends RoadInfoNode {
  isRender: boolean;
  depth: number;
}
