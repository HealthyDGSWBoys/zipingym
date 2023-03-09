import Module from '$/package/Module';
import KeyboardInputMod from './KeyboardInputMod';
import MouseInputMod from './MouseInputMod';

export default class InputMod extends Module {
  public onSet() {
    this.addChild(KeyboardInputMod);
    this.addChild(MouseInputMod);
  }
}
