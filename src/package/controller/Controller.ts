import { Node } from '@babylonjs/core';

export abstract class Controller<T extends Node> {
  protected target: T | null = null;
  public setTarget(target: T) {
    this.target = target;
  }
}
