import Config, { RawConfig } from '../config/Config';
import Core from '../core/Core';

export default class App {
  private static instance: App;

  public static async init(parent: HTMLElement, config: RawConfig) {
    if (this.instance == null) {
      this.instance = new App();
      await Config.set(config);
      await Core.set(parent);
      return;
    }
  }
}
