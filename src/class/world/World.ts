import { AssetContainer, TransformNode } from '@babylonjs/core';
import { ControlTarget } from '../controller/Controlable';
import ModelStorage from '$/static/model/ModelStorage';
import RoadTree from './WorldTree';
import WorldRenderController from './WorldRenderController';
import UpdateLoop from '$/static/core/UpdateLoop';
import LavaController from './LavaController';

export default class World extends ControlTarget<AssetContainer> {
  public roadTree: RoadTree;
  constructor() {
    super(ModelStorage.get('colaTheme'));
    this.addController(new LavaController());
    this.roadTree = new RoadTree(1);
    const worldRenderController = new WorldRenderController(this.roadTree);
    this.addController(worldRenderController);
    UpdateLoop.get.append(() => worldRenderController.render());
  }
}
