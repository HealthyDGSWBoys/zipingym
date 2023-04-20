import Core from '../core/Core';
import Config, { RawConfig } from '../config/Config';
import ModelStorage from '../model/ModelStorage';
import Command from '$/global/command/Command';
import UI from '../ui/UI';

export default class App {
  private static instance: App;

  public static async set(parent: HTMLElement, config: RawConfig) {
    if (this.instance == null) {
      this.instance = new App();
      await Config.set(config);
      Core.set(parent);
      await Core.get.init();
      await ModelStorage.set();
      Command.set();
      UI.set();
      Core.run();
      return;
    } else {
    }
  }
}
