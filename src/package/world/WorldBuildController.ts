import { AssetContainer, TransformNode } from '@babylonjs/core';
import { Controller } from '../controller/Controller';

export default class WorldBuildController extends Controller<AssetContainer> {
  public progress: number = 0;
  //   private roadContainer =
  constructor(public deps: number = 3) {
    super();
  }

  public setTarget(target: AssetContainer): void {
    super.setTarget(target);
    this.target!.addAllToScene();
  }
}
