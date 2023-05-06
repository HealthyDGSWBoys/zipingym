import Renderer from './Renderer';

export default abstract class Backend<T> {
  constructor(protected renderer: Renderer<T>) {}
  public render(args: T): void {
    this.renderer.render(args);
  }
}
