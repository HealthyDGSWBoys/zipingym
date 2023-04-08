import { Update } from '$/global/Updateable';
import Config from '$/static/config/Config';
import User from '../character/User';
import InputController from '../character/InputController';
import InputFactory, { InputType } from '../input/InputFactory';
import World from '../world/World';
import WorldRenderController from '../world/WorldRenderController';

export default class Command extends Update {
  private render: WorldRenderController;
  constructor() {
    super();
    const world = new World();
    this.render = new WorldRenderController(world.roadTree);
    world.addController(this.render);
    const user = new User('animeCharacter', 'user');
    Config.get.input.forEach((input: InputType) => {
      user.addController(
        new InputController(InputFactory.GetInput(input), world.roadTree)
      );
    });
  }
  public update(deltaTime: number): void {
    this.render.render();
  }
}
