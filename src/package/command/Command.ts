import { Update } from '$/global/Updateable';
import Config from '$/static/config/Config';
import User from '../character/User';
import InputController from '../character/InputController';
import InputFactory, { InputType } from '../input/InputFactory';
import KeyboardInput from '../input/KeyboardInput';
import World from '../world/World';
import WorldBuildController from '../world/WorldBuildController';

export default class Command extends Update {
  constructor() {
    super();
    const world = new World();
    const worldController = new WorldBuildController();
    const user = new User('animeCharacter', 'user');
    Config.get.input.forEach((input: InputType) => {
      user.addController(new InputController(InputFactory.GetInput(input)));
    });
    world.addController(worldController);
    worldController.init();
  }
  public update(deltaTime: number): void {
    // console.log(deltaTime);
  }
}
