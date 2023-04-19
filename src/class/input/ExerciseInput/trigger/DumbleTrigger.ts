import { InputMap } from '../../InputMap';
import Trigger from './Trigger';

export default class DumbleTrigger extends Trigger {
  public call({
    result,
    accuracy,
  }: {
    result: Array<number>;
    accuracy: Array<number>;
  }): InputMap | null {
    const res = result;
    let all = 0;
    accuracy.forEach((e) => {
      all += e;
    });
    if (all / accuracy.length > 0.5) {
      if (res[0] > -0.9) {
        console.log('DOWN');
      } else if (
        Math.abs(res[1] - res[2]) < 0.1 &&
        (res[1] > 0 || res[2] > 0)
      ) {
        console.log('UP');
      } else {
        console.log(res[1] > res[2] ? 'left' : 'right');
      }
    }

    return null;
  }
}
