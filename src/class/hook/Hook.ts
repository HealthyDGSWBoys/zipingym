export default interface Hookable<T> {
  get: T;
  set(v: T): void;
  onChange(on: (v: T) => void): void;
}
