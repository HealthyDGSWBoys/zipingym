import { AssetContainer, TransformNode } from '@babylonjs/core';
import { ControlTarget } from '../controller/Controlable';
import ModelStorage from '$/static/model/ModelStorage';
import Core from '$/static/core/Core';

export default class World extends ControlTarget<AssetContainer> {
  constructor() {
    super(ModelStorage.get('colaTheme'));
  }
}
