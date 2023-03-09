import DevMod from '$logic/module/DevMod';
import UserMod from '$logic/module/UserMod';
import InputMod from '$logic/module/input/InputMod';
import LogicMod from '$logic/module/LogicMod';
import AppRoot from './AppRoot';
import appConfig from './config';

export default class App extends AppRoot {
  constructor(root: HTMLElement, config: appConfig) {
    super(root, config);

    this.appendMember(UserMod);
    this.appendMember(LogicMod);
    this.appendMember(DevMod);
    this.appendMember(InputMod);
  }
}
