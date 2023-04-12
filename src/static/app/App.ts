import Core from '../core/Core';
import Config, { RawConfig } from '../config/Config';
import ModelStorage from '../model/ModelStorage';
import Command from '$/class/command/Command';

export default class App {
  private static instance: App;

  public static async set(parent: HTMLElement, config: RawConfig) {
    if (this.instance == null) {
      this.instance = new App();
      Config.set(config);
      Core.set(parent);
      await Core.get.init();
      await ModelStorage.set();
      new Command();
      Core.run();
      return;
    } else {
    }
  }
}
