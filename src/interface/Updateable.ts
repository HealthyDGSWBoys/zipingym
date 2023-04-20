import UpdateLoop from '$/global/legacyCore/UpdateLoop';

export interface Updateable {
  update(deltaTime: number): void;
}

export abstract class Update implements Updateable {
  constructor() {
    UpdateLoop.get.append(this);
  }

  public abstract update(deltaTime: number): void;
}

export class UpdateMaker implements Updateable {
  constructor(public update: (deltaTime: number) => void) {}
}
