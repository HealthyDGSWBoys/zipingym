import Core from '../core/Core';
import Config, { RawConfig } from '../config/Config';
import ModelStorage from '../model/ModelStorage';

export default class App {
  private static instance: App;

  public static async set(parent: HTMLElement, config: RawConfig) {
    if (this.instance == null) {
      this.instance = new App();
      Core.set(parent);
      Config.set(config);
      await ModelStorage.set();
      return;
    } else {
      return;
    }
  }
}
