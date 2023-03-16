import CharacterLoadMod from '$/module/CharacterLoadMod';
import DummyMapLoadMod from '$/module/DummyMapLoadMod';
import { Module } from '@zipingym/babybabylon';

export default class DevMod extends Module {
  public onSet() {
    this.addChild(DummyMapLoadMod);
    this.addChild(CharacterLoadMod);
  }
}
