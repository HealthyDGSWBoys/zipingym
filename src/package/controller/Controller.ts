import { Node } from '@babylonjs/core';

export abstract class Controller<T> {
  protected target: T | null = null;
  public setTarget(target: T) {
    this.target = target;
  }
}
