import EventFall from '$/lib/event/EventFall';
import * as BABYLON from 'babylonjs';
import ShareMemory from './ShareMemory';

export default abstract class Module extends EventFall {
  protected share: ShareMemory;
  constructor(parent: EventFall, share: ShareMemory) {
    super(parent);
    this.share = share;
    this.addEventHandler('setting', this.set.bind(this));
  }
  protected abstract set(): void;
  protected addChild(
    maker: new (parent: Module, scene: ShareMemory) => Module
  ) {
    this.children.push(new maker(this, this.share));
  }
}
