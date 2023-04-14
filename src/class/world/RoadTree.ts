import Tree, { TreeNode } from '$/util/Tree';
import { Vector3 } from '@babylonjs/core';
import RoadCalculator, { direction, rotation } from './RoadCalculator';
import Random from '$/util/Random';
import Command from '$/static/command/Command';
import { ThinSprite } from '@babylonjs/core/Sprites/thinSprite';

export default class RoadEngine {
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
  }

  public setRoot(node: TreeNode<RoadRenderNode>) {
    const remove = this.tree.getRoot;
    this.tree.setRoot(node);
    const add = this.buildChildren();
    return {
      remove: [remove],
      add,
    };
  }

  private buildChildren() {
    const build: Array<TreeNode<RoadRenderNode>> = new Array();
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

  private buildChild(node: TreeNode<RoadRenderNode>) {
    const type = Random.getRandom(RoadEngine.DirectionRandomMap);
    const build: Array<TreeNode<RoadRenderNode>> = new Array();
    if (type == 'b') {
      build.push(this._buildChild(node, 'l'));
      build.push(this._buildChild(node, 'r'));
    } else {
      build.push(this._buildChild(node, type));
    }
    return build;
  }

  public getNotRenderedNode(): Array<RoadRenderNode> {
    const result: Array<RoadRenderNode> = new Array();
    this.tree.traverseBFS(({ val }) => {
      if (val.isRender == false) result.push(val);
    });
    return result;
  }

  private _buildChild(parent: TreeNode<RoadRenderNode>, origin: 'r' | 'l') {
    const length = Random.getRandom(RoadEngine.LengthRandomMap);
    const rotation = RoadCalculator.calcAbsoluteRot(
      parent.val.rotation,
      origin
    );
    const node = new TreeNode({
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
    });
    parent.addChild(node);

    return node;
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
