import DummyMap from '../loader/DummyMap';
import Module from '$/package/Module';
import Character from '../loader/Character';

export default class DevMod extends Module {
  onSet() {
    this.addChild(DummyMap);
    this.addChild(Character);
  }
}
