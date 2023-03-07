import EventMessage from '../EventMessage';

export default interface KeyboardEventMap {
  keydown: CustomKeyboardEvent;
  keyup: CustomKeyboardEvent;
}

interface CustomKeyboardEvent extends EventMessage, KeyboardEvent {}
