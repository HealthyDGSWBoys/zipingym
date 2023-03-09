import EventMessage from '../EventMessage';

export default interface MouseEventMap {
  wheel: CustomWheelEvent;
  click: CustomMouseEvent;
  mousemove: CustomMouseEvent;
}
interface CustomMouseEvent extends EventMessage, MouseEvent {}
interface CustomWheelEvent extends EventMessage, WheelEvent {
  wheelDeltaY: number;
  wheelDeltaX: number;
  wheelDelta: number;
}
