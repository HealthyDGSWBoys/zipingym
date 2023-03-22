export default class Progress {
  public max: number;
  public current: number;
  constructor(max: number) {
    this.max = max;
    this.current = 0;
  }
  set currentSet(current: number) {
    this.current = current;
  }
  get progress() {
    return this.current / this.max;
  }
}
