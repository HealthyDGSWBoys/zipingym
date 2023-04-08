import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import Core from '$/static/core/Core';
import Random from '$/util/Random';
import Tree, { TreeNode } from '$util/Tree';

export default class WorldBuildController extends Controller<AssetContainer> {
  private static findRoadNodeRegex = new RegExp('^\\$');
  public progress: number = 0;
  private roadManager: RoadNodeManager = new RoadNodeManager();
  private roadTreeBuilder: RoadTreeBuilder = new RoadTreeBuilder(3);
  constructor(public deps: number = 3) {
    super();
  }

  public init() {
    this.roadManager.addMap(
      this.target
        .getNodes()
        .filter(({ name }) =>
          WorldBuildController.findRoadNodeRegex.test(name)
        ) as Array<TransformNode>
    );
  }

  public render() {}
}

class RoadNodeManager {
  private randomMap: Map<TransformNode, number> = new Map();

  public addMap(nodes: Array<TransformNode>) {
    nodes.forEach((node) => {
      this.randomMap.set(node, 1);
    });
  }
  public getRandom(name: string, parent: TransformNode = Core.get.root) {
    Random.getRandom(this.randomMap).clone(name, parent);
  }
}

class RoadTreeBuilder {
  private tree: Tree<RoadInfoNode>;
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
      length: 2,
      origin: 'f',
      position: new Vector3(0, 0, -15),
      rotation: 'u',
    });
    this.buildChildren();
  }

  public buildChildren() {
    while (true) {
      const depth = this.tree.getMaxDepth() - 1;
      this.tree.findChildrenAtDepth(depth).forEach((node) => {
        this.buildChild(node);
      });
      if (this.depth < depth) break;
    }
  }

  public buildChild(node: TreeNode<RoadInfoNode>) {
    const type = Random.getRandom(RoadTreeBuilder.DirectionRandomMap);
    if (type == 'b') {
      this._buildChild(node, 'l');
      this._buildChild(node, 'r');
    } else {
      this._buildChild(node, type);
    }
  }
  private _buildChild(parent: TreeNode<RoadInfoNode>, origin: 'r' | 'l') {
    const length = Random.getRandom(RoadTreeBuilder.LengthRandomMap);
    const rotation = RoadCalculator.calcAbsoluteRot(
      parent.val.rotation,
      origin
    );
    parent.addChild(
      new TreeNode({
        length,
        origin,
        position: RoadCalculator.calcAbsolutePos(
          parent.val.rotation,
          parent.val.position,
          15,
          rotation
        ),
        rotation,
      })
    );
  }
}

class RoadCalculator {
  public static RoadLength = 30;
  public static RoadWidth = 3;
  private static rotArr: Array<rotation> = ['u', 'r', 'd', 'l'];
  public static calcAbsoluteRot(parent: rotation, change: 'l' | 'r') {
    let idx = this.rotArr.indexOf(parent) + (change == 'r' ? 1 : -1);
    if (idx == -1) {
      idx = 3;
    } else if (idx == 4) {
      idx = 0;
    }
    return this.rotArr[idx];
  }

  public static calcAbsolutePos(
    parent_rot: rotation,
    parent_pos: Vector3,
    parent_len: number,
    child_rot: rotation
  ) {
    const origin = parent_pos
      .clone()
      .add(
        RoadCalculator.calcRotToDir(
          parent_rot,
          this.RoadLength / 2 -
            this.RoadWidth +
            this.RoadLength * (parent_len - 1)
        )
      )
      .add(
        RoadCalculator.calcRotToDir(
          child_rot,
          this.RoadLength / 2 + this.RoadWidth
        )
      );
    return origin;
  }

  public static calcRotToDir(rot: rotation, movement: number) {
    switch (rot) {
      case 'u':
        return new Vector3(0, 0, -movement);
      case 'd':
        return new Vector3(0, 0, movement);
      case 'r':
        return new Vector3(movement, 0, 0);
      case 'l':
        return new Vector3(-movement, 0, 0);
    }
  }
}

export type direction = 'l' | 'f' | 'r';
export type rotation = 'l' | 'r' | 'u' | 'd';
interface RoadInfoNode {
  length: number;
  origin: direction;
  position: Vector3;
  rotation: rotation;
}
