import Renderer from './Renderer';

export default abstract class Backend<T> {
  constructor(protected renderer: Renderer<T>) {}
  public rerender(args: T): void {
    this.renderer.rerender(args);
  }
}
