import { Node } from '@babylonjs/core';

export abstract class Controller<T extends Node> {
  protected asset: T;
  constructor(asset: T) {
    this.asset = asset;
  }
}
