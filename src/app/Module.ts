import EventFall from '$/lib/event/EventFall';
import * as BABYLON from 'babylonjs';

export default abstract class Module extends EventFall {
  protected scene: BABYLON.Scene;
  constructor(parent: EventFall, scene: BABYLON.Scene) {
    super(parent);
    this.scene = scene;
    this.addEventHandler('setting', this.set.bind(this));
  }
  protected abstract set(): void;
  protected addChild(
    maker: new (parent: Module, scene: BABYLON.Scene) => Module
  ) {
    this.children.push(new maker(this, this.scene));
  }
}
