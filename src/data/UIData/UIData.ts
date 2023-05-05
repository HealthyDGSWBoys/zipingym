import UICore from '$/core/UICore/UICore';

export default class UIData {
  constructor(private core: UICore) {}

  private time: number = 0;
  public get getTime() {
    return this.time;
  }
  public addTime(time: number) {
    this.time += time;
    this.core.drawTime(this.getTime);
  }
}
