import { EventMessageImpl } from './EventMessage';

export default class UpdateEventMessage extends EventMessageImpl {
  public deltaTime: number;
  constructor(deltaTime: number) {
    super();
    this.deltaTime = deltaTime;
  }
}
