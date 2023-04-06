import { Update } from '$/global/Updateable';

export default class Command extends Update {
  constructor() {
    super();
  }
  public update(deltaTime: number): void {
    throw new Error('Method not implemented.');
  }
}
