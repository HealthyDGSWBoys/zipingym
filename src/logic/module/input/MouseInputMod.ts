import Module from '$/package/Module';
import BabyEvent from '$/event/BabyEvent';

export default class MouseInputMod extends Module {
  public onSet() {
    document.addEventListener('wheel', (e: WheelEvent) => {
      //@ts-ignore
      this.generateEvent(new BabyEvent('wheel', e));
    });
    this.share.engine
      .getRenderingCanvas()!
      .addEventListener('click', (e: MouseEvent) => {
        this.generateEvent(new BabyEvent('click', e));
      });
    this.share.engine
      .getRenderingCanvas()!
      .addEventListener('mousemove', (e: MouseEvent) => {
        this.generateEvent(new BabyEvent('mousemove', e));
      });
  }
}
