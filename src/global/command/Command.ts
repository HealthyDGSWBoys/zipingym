import Logic from '$/@legacy/logic/Logic';
import { Update } from '$/interface/Updateable';
import User from '../../@legacy/character/User';
import World from '$/@legacy/world/World';

export default class Command extends Update {
  private static instance: Command;

  public world: World;
  public user: User;
  public logic: Logic;

  private constructor() {
    super();
    Command.instance = this;
    this.world = new World();
    this.user = new User('animeCharacter', 'user');
    this.logic = new Logic();
  }

  public static set() {
    if (this.instance == null) {
      this.instance = new Command();
    }
    return this.instance;
  }

  public static get get() {
    return this.instance;
  }

  public update(deltaTime: number): void {}
}
