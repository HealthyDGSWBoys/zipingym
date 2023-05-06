export default abstract class Renderer<T> {
  public abstract render(args: T): void;
}
