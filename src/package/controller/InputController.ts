import { TransformNode } from '@babylonjs/core';
import { Controller } from './Controller';
import { Inputable, onInputFunc } from '../input/Inputable';
import { InputMap } from '../input/InputMap';

export default class InputController extends Controller<TransformNode> {
  private input: Inputable;
  constructor(input: Inputable) {
    super();
    this.input = input;
    this.input.setOnInput(this.onInputEvent.bind(this));
  }

  private onInputEvent(res: InputMap) {
    console.log(res);
  }
}
