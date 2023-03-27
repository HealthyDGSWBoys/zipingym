import Random from '$/util/Random';
import { AssetContainer, Mesh } from 'babylonjs';

export default class WorldManager {
  private roads: Array<Mesh> = new Array();
  private randomMap: Map<Mesh, number> = new Map();
  constructor(target: AssetContainer) {
    target.getNodes().forEach((node) => {
      if (node.name[0] == '$') {
        this.roads.push(node as Mesh);
        this.randomMap.set(node as Mesh, 1);
      }
    });
  }
  get list() {
    return this.roads;
  }

  get random() {
    return Random.getRandom(this.randomMap);
  }
}
