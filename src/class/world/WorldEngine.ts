import RoadTree from '../world/WorldTree';

export default class WorldEngine {
  public roadTree: RoadTree;

  constructor() {
    this.roadTree = new RoadTree(2);
  }
}
