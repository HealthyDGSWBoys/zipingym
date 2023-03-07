export interface EventMessage {
  occurTime: number;
}

export class EventMessageImpl implements EventMessage {
  occurTime: number;
  constructor() {
    this.occurTime = performance.now();
  }
}
