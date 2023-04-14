import { Update } from '$/interface/Updateable';
import Command from '$/static/command/Command';
import ItemFactory from './ItemFactory';
import Itemlist from './itemlist';

export default class ItemLogic extends Update {
  private itemFactorys: Array<ItemFactory>;
  constructor() {
    super();
    this.itemFactorys = new Array();
    Itemlist.forEach((info) => {
      this.itemFactorys.push(
        new ItemFactory({
          ...info,
          model: info.model ?? info.name,
        })
      );
    });

    Command.get.world.addCallbackOnbuild(() => {});
  }
  public update(deltaTime: number): void {}
}
