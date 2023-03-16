import { Vector3 } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import { KeyBoardInputModule, Module } from '@zipingym/babybabylon';

export default class AddonMod extends Module {
  public onSet() {
    this.addChild(KeyBoardInputModule);
  }
}
