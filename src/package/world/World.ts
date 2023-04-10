import { AssetContainer, TransformNode } from '@babylonjs/core';
import { ControlTarget } from '../controller/Controlable';
import ModelStorage from '$/static/model/ModelStorage';
import RoadTree from './WorldTree';
import { Update, Updateable } from '$/global/Updateable';
import WorldRenderController from './WorldRenderController';
import UpdateLoop from '$/static/core/UpdateLoop';

export default class World extends ControlTarget<AssetContainer> {
  public roadTree: RoadTree;
  constructor() {
    super(ModelStorage.get('colaTheme'));
    this.roadTree = new RoadTree(1);
    const worldRenderController = new WorldRenderController(this.roadTree);
    this.addController(worldRenderController);
    UpdateLoop.get.append(() => worldRenderController.render());
  }
}
