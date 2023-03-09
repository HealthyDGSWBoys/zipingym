import Module from '$/package/Module';
import BabyEvent from '$/event/BabyEvent';

export default class HoverMod extends Module {
  public onSet() {
    this.addEventHandler('mousemove', (e) => {
      console.log(e.offsetX, e.offsetY);
    });
  }
}
