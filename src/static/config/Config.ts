import { InputType } from '$/package/input/InputFactory';

export default class Config implements RawConfig {
  private static instance: Config;
  private config: RawConfig;
  private constructor(config: RawConfig) {
    this.config = config;
    if (Config.instance == null) {
      Config.instance = this;
    }
    return Config.instance;
  }

  get debugUI() {
    return this.production ? false : this.config.debugUI;
  }

  get production() {
    return this.config.production;
  }

  get input() {
    return this.config.input;
  }

  get baseURL() {
    return this.config.baseURL;
  }

  public static set(config: RawConfig) {
    if (this.instance == null) {
      this.instance = new Config(config);
    }
  }

  public static get get() {
    return this.instance;
  }
}

export interface RawConfig {
  baseURL: string;
  debugUI: boolean;
  production: boolean;
  input: Array<InputType>;
}
