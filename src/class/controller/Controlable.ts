import { Controller } from './Controller';

export class ControlTarget<T> {
  protected controllers: Array<Controller<T>> = new Array();

  constructor(protected target: T) {}

  public addController(controller: Controller<T>) {
    controller.setTarget(this.target);
    controller.init();
    this.controllers.push(controller);
  }
}
