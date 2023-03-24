import { AssetContainer, Mesh } from 'babylonjs';

export default class WorldManager {
  private roads: Array<Mesh> = new Array();
  constructor(target: AssetContainer) {
    target.getNodes().forEach((node) => {
      if (node.name[0] == '$') {
        this.roads.push(node as Mesh);
      }
    });
  }
  get list() {
    return this.roads;
  }
}
