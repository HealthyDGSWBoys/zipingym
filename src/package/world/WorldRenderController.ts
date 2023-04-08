import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import Core from '$/static/core/Core';
import Random from '$/util/Random';
import RoadTree from './WorldTree';
import RoadCalculator from './RoadCalculator';

export default class WorldRenderController extends Controller<AssetContainer> {
  private static findRoadNodeRegex = new RegExp('^\\$');
  private roadManager: RoadNodeManager = new RoadNodeManager();
  constructor(private roadTree: RoadTree) {
    super();
  }

  public init() {
    this.roadManager.addMap(
      this.target
        .getNodes()
        .filter(({ name }) =>
          WorldRenderController.findRoadNodeRegex.test(name)
        ) as Array<TransformNode>
    );
  }

  public render() {
    this.roadTree.getNotRenderedNode().forEach((node) => {
      for (let i = 0; i < node.length; i++) {
        const road = this.roadManager.getRandom(String(node.depth));
        road.position = node.position
          .clone()
          .add(
            RoadCalculator.calcRotToDir(
              node.rotation,
              RoadCalculator.RoadLength * i
            )
          );
        if (node.rotation == 'l' || node.rotation == 'r') {
          road.rotation = new Vector3(0, Math.PI / 2, 0);
        }
      }
      node.isRender = true;
    });
  }
}

class RoadNodeManager {
  private randomMap: Map<TransformNode, number> = new Map();

  public addMap(nodes: Array<TransformNode>) {
    nodes.forEach((node) => {
      this.randomMap.set(node, 1);
    });
  }
  public getRandom(name: string, parent: TransformNode = Core.get.root) {
    return Random.getRandom(this.randomMap).clone(name, parent)!;
  }
}
