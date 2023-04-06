import Core from '../core/Core';
import Config, { RawConfig } from '../config/Config';
import ModelStorage from '../model/ModelStorage';

export default class App {
  constructor(parent: HTMLElement, config: RawConfig) {
    Core.set(parent);
    Config.set(config);
    ModelStorage.set();
  }
}
