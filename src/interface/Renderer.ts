export default abstract class Renderer<T> {
  public abstract rerender(args: T): void;
}
