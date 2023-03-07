import Module from '$/app/Module';
import BabyEvent from '$/event/BabyEvent';

export default class KeyboardInputMod extends Module {
  public onSet() {
    document.addEventListener('keydown', (e) => {
      this.generateEvent(new BabyEvent('keydown', e));
    });
    document.addEventListener('keyup', (e) => {
      this.generateEvent(new BabyEvent('keyup', e));
    });
  }
}
