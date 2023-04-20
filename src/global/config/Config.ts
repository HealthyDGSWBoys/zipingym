import { InputType } from '$/class/input/InputFactory';
import { WebGPUEngine } from '@babylonjs/core';

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
  public static async set(config: RawConfig) {
    if (this.instance == null) {
      if (config.engine == undefined) {
        config.engine = (await WebGPUEngine.IsSupportedAsync)
          ? 'webgpu'
          : 'webgl';
      }
      this.instance = new Config(config);
    }
  }
  public static get get() {
    return this.instance;
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

  get engine() {
    return this.config.engine;
  }
}

export interface RawConfig {
  baseURL: string;
  debugUI: boolean;
  production: boolean;
  input: Array<InputType>;
  engine?: 'webgl' | 'webgpu';
}
