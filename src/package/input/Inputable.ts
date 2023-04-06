import { InputMap } from './InputMap';

export interface Inputable<T extends InputMap> {
  onInput: onInputFunc;
}

export abstract class Input<T extends InputMap> implements Inputable<T> {
  constructor(onInput: onInputFunc) {
    this.onInput = onInput;
  }
  onInput: onInputFunc;
}

export type onInputFunc = (input: InputMap) => void;
