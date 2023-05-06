import { Node } from '@babylonjs/core';

export abstract class Controller<T> {
  private _target: T | null = null;
  protected get target(): T {
    return this._target!;
  }
  public setTarget(target: T) {
    this._target = target;
  }
  public init() {}
}
