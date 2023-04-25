import Logic from '$/logic/Logic';
import Config, { RawConfig } from '../global/config/Config';
import Data from '../data/Data';
import LoadCore from '$/core/LoadCore';

export default class App {
  private static isInitalized: boolean = false;

  private static config: Config;
  private static core: LoadCore;
  private static data: Data;
  private static logic: Logic;

  public static async init(parent: HTMLElement, config: RawConfig) {
    if (this.isInitalized) {
      return;
    } else {
      try {
        this.config = await Config.set(config);
        this.core = await LoadCore.set(parent);
        this.data = await Data.set(this.core);
        this.logic = await Logic.set(this.data);
        this.core.threeCore.run();
      } catch (e) {
        console.log(e);
        console.error('Error Occur While initalizing App');
      }
    }
  }
}
