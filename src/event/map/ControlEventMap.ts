import EventMessage from './EventMessage';

export default interface ControlEventMap {
  update: UpdateEventMessage;
  setting: EventMessage;
}

interface UpdateEventMessage extends EventMessage {
  deltaTime: number;
}
