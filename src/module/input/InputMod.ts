import Module from '$/app/Module';
import KeyboardInputMod from './KeyboardInputMod';

export default class InputMod extends Module {
  public onSet() {
    this.addChild(KeyboardInputMod);
  }
}
