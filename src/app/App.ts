import { BabyRoot } from '@zipingym/babybabylon';
import DevMod from './DevMod';
import UserMod from './UserMod';

export default class App extends BabyRoot {
  protected onSet(): void {
    this.addChild(UserMod);
    this.addChild(DevMod);
  }
}
