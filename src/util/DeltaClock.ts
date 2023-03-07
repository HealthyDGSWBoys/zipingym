export default class DeltaClock {
  private now: number = 0;
  private isFreeze: boolean = true;
  constructor() {}

  public pause() {
    this.isFreeze = true;
  }
  public play() {
    this.isFreeze = false;
    this.now = performance.now();
  }
  public getDeltaTime() {
    const now = performance.now();
    const res = now - this.now;
    this.now = now;
    return res;
  }
}
