import Random from '$/util/Random';
import { AssetContainer, Mesh, TransformNode } from '@babylonjs/core';

export default class WorldManager {
  private static manager: WorldManager = null;
  private roads: Array<TransformNode> = new Array();
  private randomMap: Map<TransformNode, number> = new Map();
  constructor(target: AssetContainer) {
    if (WorldManager.manager == null) {
      target.getNodes().forEach((node) => {
        if (node.name[0] == '$') {
          this.roads.push(node as TransformNode);
          this.randomMap.set(node as TransformNode, 1);
        }
      });
      WorldManager.manager = this;
    }
    return WorldManager.manager;
  }
  get list() {
    return this.roads;
  }

  get random() {
    return Random.getRandom(this.randomMap);
  }
}
