import BabyEvent from '$/event/BabyEvent';
import EventFall from '$/event/EventFall';
import * as BABYLON from 'babylonjs';
import ShareMemory from '../app/ShareMemory';

export default abstract class Module extends EventFall {
  protected share: ShareMemory;
  constructor(parent: EventFall, share: ShareMemory) {
    super(parent);
    this.share = share;
    this.addEventHandler('setting', this.onSet.bind(this));
  }
  protected abstract onSet(): void;
  protected addChild<T extends Module>(
    maker: new (parent: Module, scene: ShareMemory) => T
  ) {
    const child = new maker(this, this.share);
    this.children.push(child);
    child.__trigger__(new BabyEvent('setting', {}));
    return child;
  }
  protected getScene(): BABYLON.Scene {
    return this.share.scene;
  }
}
