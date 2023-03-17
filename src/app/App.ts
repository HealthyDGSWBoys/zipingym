import { BabyRoot } from '@zipingym/babybabylon';
import AddonMod from './AddonMod';
import DevMod from './DevMod';
import LogicMod from './LogicMod';

export default class App extends BabyRoot {
  protected onSet(): void {
    this.addChild(DevMod);
    this.addChild(AddonMod);
    this.addChild(LogicMod);
  }
}
