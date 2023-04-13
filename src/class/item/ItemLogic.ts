import { Update } from '$/interface/Updateable';
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
  }
  public update(deltaTime: number): void {}
}
