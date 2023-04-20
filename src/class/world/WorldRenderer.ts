import Renderer from '$/interface/Renderer';
import { AssetContainer, TransformNode, Vector3 } from '@babylonjs/core';
import RoadTree from './RoadTree';
import Core from '$/global/core/Core';
import RoadCalculator from './RoadCalculator';
import Random from '$/util/Random';
import { WorldRenderInfo } from './World';

export default class WorldRenderer extends Renderer<WorldRenderInfo> {
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

  public render(roadTree: WorldRenderInfo): Promise<void> {
    return new Promise((resolve) => {
      roadTree.remove.forEach(({ val }) => {
        Core.get.root
          .getChildTransformNodes()
          .filter(
            ({ name }) => name == WorldRenderer.makeRoadName(val.depth - 1)
          )
          .forEach((n) => n.dispose());
      });
      roadTree.add.forEach(({ val }) => {
        for (let i = 0; i < val.length; i++) {
          const road = this.roadManager.getRandom(
            WorldRenderer.makeRoadName(val.depth)
          );
          road.position = val.position
            .clone()
            .add(
              RoadCalculator.calcRotToDir(
                val.rotation,
                RoadCalculator.RoadLength * i
              )
            );
          if (val.rotation == 'l' || val.rotation == 'r') {
            road.rotation = new Vector3(0, Math.PI / 2, 0);
          }
          val.nodes.push(road);
        }
      });
      resolve();
    });
  }

  public static makeRoadName(depth: number): string {
    return `#Road${depth}`;
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
