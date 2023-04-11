import { InputMap } from '../../InputMap';
import Trigger from './Trigger';

export default class DumbleTrigger extends Trigger {
  public call(res: Array<number>): InputMap | null {
    console.log(res);
    // return 'straight';
    return null;
  }
}
