import EventFall from '$/event/EventFall';
import * as BABYLON from 'babylonjs';
import ShareMemory from './ShareMemory';

export default abstract class Module extends EventFall {
  protected share: ShareMemory;
  constructor(parent: EventFall, share: ShareMemory) {
    super(parent);
    this.share = share;
    this.addEventHandler('setting', this.onSet.bind(this));
  }
  protected abstract onSet(): void;
  protected addChild(
    maker: new (parent: Module, scene: ShareMemory) => Module
  ) {
    this.children.push(new maker(this, this.share));
  }
}
