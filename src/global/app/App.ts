import Logic from '$/logic/Logic';
import Config, { RawConfig } from '../config/Config';
import Core from '../core/Core';
import Data from '../data/Data';

export default class App {
  private static isInitalized: boolean = false;

  private static config: Config;
  private static core: Core;
  private static data: Data;
  private static logic: Logic;

  public static async init(parent: HTMLElement, config: RawConfig) {
    if (this.isInitalized) {
      return;
    } else {
      this.config = await Config.set(config);
      this.core = await Core.set(parent);
      this.data = await Data.set(this.core);
      this.logic = await Logic.set(this.data);
    }
  }
}
