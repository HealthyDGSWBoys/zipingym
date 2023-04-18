import { InputMap } from '../../InputMap';
import Trigger from './Trigger';

export default class DumbleTrigger extends Trigger {
  public call(res: Array<number>): InputMap | null {
    if (res[0] > 0) {
      console.log('DOWN');
    } else if (Math.abs(res[1] - res[2]) == 0 && (res[1] > 0 || res[2] > 0)) {
      console.log('UP');
    } else {
      console.log(res[1] > res[2] ? 'left' : 'right');
    }
    return null;
  }
}
