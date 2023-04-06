import { InputMap } from './InputMap';

export interface Inputable {
  onInput: onInputFunc;
}

export abstract class Input implements Inputable {
  constructor(onInput: onInputFunc) {
    this.onInput = onInput;
  }
  onInput: onInputFunc;
}

export type onInputFunc = (input: InputMap) => void;
