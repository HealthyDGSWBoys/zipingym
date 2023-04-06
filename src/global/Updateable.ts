import UpdateLoop from '$/static/core/UpdateLoop';

export interface Updateable {
  update(deltaTime: number): void;
}

export abstract class Update implements Updateable {
  constructor() {
    UpdateLoop.append(this);
  }

  public abstract update(deltaTime: number): void;
}
