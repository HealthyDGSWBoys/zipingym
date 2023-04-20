import Core from '$/global/legacyCore/Core';
import { DirectionalLight, HemisphericLight, Vector3 } from '@babylonjs/core';
import ItemLogic from '../item/ItemLogic';

export default class Logic {
  constructor() {
    const sun = new DirectionalLight(
      'Sun',
      Core.get.root.position.add(new Vector3(0, -100, 0)),
      Core.get.scene
    );
    sun.intensity = 5;

    const point = new HemisphericLight(
      'Point',
      Core.get.root.position.add(new Vector3(0, -100, 0)),
      Core.get.scene
    );
    point.intensity = 0.2;

    new ItemLogic();
  }
}
