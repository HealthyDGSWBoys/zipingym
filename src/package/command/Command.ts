import { Update } from '$/global/Updateable';
import Config from '$/static/config/Config';
import User from '../character/User';
import World from '../world/World';

export default class Command extends Update {
  constructor() {
    super();
    const world = new World();
    const user = new User('animeCharacter', 'user', world.roadTree);
  }

  public update(deltaTime: number): void {}
}
