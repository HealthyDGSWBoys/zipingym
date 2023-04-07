import { Update } from '$/global/Updateable';
import Config from '$/static/config/Config';
import User from '../character/User';
import InputController from '../controller/InputController';
import InputFactory, { InputType } from '../input/InputFactory';
import KeyboardInput from '../input/KeyboardInput';

export default class Command extends Update {
  constructor() {
    super();
    const user = new User('animeCharacter', 'user');
    Config.get.input.forEach((input: InputType) => {
      user.addController(new InputController(InputFactory.GetInput(input)));
    });
  }
  public update(deltaTime: number): void {
    // console.log(deltaTime);
  }
}
