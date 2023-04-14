import Backend from '$/interface/Backend';
import ModelStorage from '$/static/model/ModelStorage';
import { TreeNode } from '$/util/Tree';
import Lava from './Lava';
import RoadTree, { RoadRenderNode } from './RoadTree';
import WorldRenderer from './WorldRenderer';

export default class WorldEngine extends Backend<WorldRenderInfo> {
  public roadTree: RoadTree;
  constructor() {
    super(new WorldRenderer(ModelStorage.get('colaTheme')));
    new Lava();
    this.roadTree = new RoadTree(1);

    this.setRoot();
  }

  public setRoot(root: TreeNode<RoadRenderNode> = this.roadTree.tree.getRoot) {
    const result = this.roadTree.setRoot(root);
    if (root === this.roadTree.tree.getRoot) {
      this.render({
        ...result,
        add: [...result.add, ...result.remove],
      });
    } else {
      this.render(result);
    }
    this.onBuildQueue.forEach((l) => l(result));
  }

  private onBuildQueue: Array<onBuildCallback> = new Array();

  public addCallbackOnbuild(callback: onBuildCallback) {
    this.onBuildQueue.push(callback);
  }
}

export type onBuildCallback = (info: WorldRenderInfo) => void;

export interface WorldRenderInfo {
  remove: Array<TreeNode<RoadRenderNode>>;
  add: Array<TreeNode<RoadRenderNode>>;
}
