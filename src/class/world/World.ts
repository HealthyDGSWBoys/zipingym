import Backend from '$/interface/Backend';
import ModelStorage from '$/static/model/ModelStorage';
import RoadTree from './RoadTree';
import WorldRenderer from './WorldRenderer';

export default class WorldEngine extends Backend<RoadTree> {
  public roadTree: RoadTree;
  constructor() {
    super(new WorldRenderer(ModelStorage.get('colaTheme')));

    this.roadTree = new RoadTree(1);

    this.rerender();
  }

  public rerender(): void {
    super.rerender(this.roadTree);
  }

  public buildChildren() {
    this.roadTree.buildChildren();
    this.rerender();
  }
}
