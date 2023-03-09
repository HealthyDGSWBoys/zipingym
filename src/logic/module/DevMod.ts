import DummyMap from '../loader/DummyMap';
import Module from '$/package/Module';

export default class DevMod extends Module {
  onSet() {
    this.addChild(DummyMap);
  }
}
