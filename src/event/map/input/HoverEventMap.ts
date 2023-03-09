import EventMessage from '../EventMessage';

export default interface KeyboardEventMap {
  keydown: HoverEvent;
  keyup: HoverEvent;
}

interface HoverEvent extends EventMessage, MouseEvent {}
