import { Update } from '$/global/Updateable';
import User from '../character/User';

export default class Command extends Update {
  constructor() {
    super();
    const user = new User('animeCharacter', 'user');
  }
  public update(deltaTime: number): void {
    // console.log(deltaTime);
  }
}
