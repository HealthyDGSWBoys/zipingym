import Config from '$/global/config/Config';
import Data from '$/data/Data';
import InputFactory from '$/module/input/InputFactory';
import { Inputable } from '$/module/input/Inputable';
import UserControl from './UserControl';
import ItemCollusion from './ItemCollusion';

export default class UserLogic {
  private inputs: Array<Inputable> = new Array();
  private userControl: UserControl;
  private itemCollusion: ItemCollusion;
  constructor(private data: Data) {
    this.userControl = new UserControl(data.userData, data.worldData);
    this.itemCollusion = new ItemCollusion(new Map());
    Config.get.input.forEach((input) => {
      const inputMod = InputFactory.GetInput(input);
      this.inputs.push(inputMod);
      inputMod.setOnInput(this.userControl.input.bind(this.userControl));
    });
    setInterval(() => {
      this.itemCollusion.update(
        this.data.worldData.getItems,
        this.data.userData.absolutePosition
      );
    }, 30);
  }
}
