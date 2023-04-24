import Config from '$/global/config/Config';
import Data from '$/global/data/Data';
import InputFactory from '$/module/input/InputFactory';
import { InputMap } from '$/module/input/InputMap';
import { Inputable } from '$/module/input/Inputable';
import UserControl from './UserControl';

export default class UserLogic {
  private inputs: Array<Inputable> = new Array();
  private userControl: UserControl;
  constructor(private data: Data) {
    this.userControl = new UserControl(data.userData, data.worldData);
    Config.get.input.forEach((input) => {
      const inputMod = InputFactory.GetInput(input);
      this.inputs.push(inputMod);
      inputMod.setOnInput(this.userControl.input.bind(this.userControl));
    });
  }
}
