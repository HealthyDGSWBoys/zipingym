import UserMod from '$/module/UserMod';
import { Module } from '@zipingym/babybabylon';
import CharacterLoadMod from '$/module/CharacterLoadMod';
import DummyMapLoadMod from '$/module/DummyMapLoadMod';

export default class LogicMod extends Module {
  public onSet() {
    this.addChild(DummyMapLoadMod);
    this.addChild(UserMod);
    this.addChild(CharacterLoadMod);
  }
}
