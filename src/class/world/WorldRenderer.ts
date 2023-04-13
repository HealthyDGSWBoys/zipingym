import Renderer from '$/interface/Renderer';
import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';
import RoadTree from './RoadTree';
import Core from '$/static/core/Core';
import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';

export default class WorldRenderer extends Renderer<RoadTree> {
  private static findRoadNodeRegex = new RegExp('^\\$');
  private roadManager: RoadNodeManager = new RoadNodeManager();
  constructor(assets: AssetContainer) {
    super();
    this.roadManager.addMap(
      assets
        .getNodes()
        .filter(({ name }) =>
          WorldRenderer.findRoadNodeRegex.test(name)
        ) as Array<TransformNode>
    );
  }

  public rerender(roadTree: RoadTree): Promise<void> {
    return new Promise((resolve) => {
      roadTree.getNotRenderedNode().forEach((node) => {
        for (let i = 0; i < node.length; i++) {
          const road = this.roadManager.getRandom(`#Road${node.depth}`);
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
        const trash = node.depth - roadTree.depth - 2;
        Core.get.root
          .getChildTransformNodes()
          .filter(({ name }) => name == `#Road${trash}`)
          .forEach((n) => n.dispose());
      });
      resolve();
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
