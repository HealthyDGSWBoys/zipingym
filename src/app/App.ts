import CameraMod from '$module/CameraMod';
import DebugMod from '$module/DebugMod';
import InputMod from '$module/input/InputMod';
import LogicMod from '$module/LoadMod';
import AppRoot from './AppRoot';
import appConfig from './config';

export default class App extends AppRoot {
  constructor(root: HTMLElement, config: appConfig) {
    super(root, config);

    this.appendMember(CameraMod);
    this.appendMember(LogicMod);
    this.appendMember(InputMod);
    this.appendMember(DebugMod);
  }
}
