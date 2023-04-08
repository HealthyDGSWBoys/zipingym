import { AssetContainer, TransformNode } from '@babylonjs/core';
import { ControlTarget } from '../controller/Controlable';
import ModelStorage from '$/static/model/ModelStorage';
import RoadTree from './WorldTree';

export default class World extends ControlTarget<AssetContainer> {
  public roadTree: RoadTree;
  constructor() {
    super(ModelStorage.get('colaTheme'));
    this.roadTree = new RoadTree(2);
  }
}
