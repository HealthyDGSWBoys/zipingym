import Hookable from './Hook';

export default class Hook<T> implements Hookable<T> {
  private _onChange: (v: T) => void = () => {};
  constructor(private value: T) {}

  public get get() {
    return this.value;
  }

  public set(v: T) {
    this.value = v;
    this._onChange(v);
  }

  public onChange(on: (v: T) => void) {
    this._onChange = on;
  }
}
