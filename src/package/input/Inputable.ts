import { InputMap } from './InputMap';

export interface Inputable {
  setOnInput(onInput: onInputFunc): void;
}

export abstract class Input implements Inputable {
  constructor() {}
  setOnInput(onInput: onInputFunc): void {
    this.onInput = onInput;
  }
  protected onInput: onInputFunc = () => {};
}

export type onInputFunc = (input: InputMap) => void;
