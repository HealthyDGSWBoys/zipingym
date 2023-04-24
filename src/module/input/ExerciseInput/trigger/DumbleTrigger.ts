import { InputMap } from '../../InputMap';
import Trigger from './Trigger';

export default class DumbleTrigger extends Trigger {
  private deque: number[] = [];

  private getLowestValue = (array: number[]) => {
    let map = new Map();
    if (array.length === 1) {
      return array[0];
    }
    for (let i = 0; i <= Math.max(...array); i++) {
      map.set(i, 0);
    }
    for (let i = 0; i < array.length; i++) {
      map.set(array[i], map.get(array[i]) + 1);
    }
    const arr = Array.from(map.values());
    const max = Math.max(...arr);

    return arr.indexOf(max);
  };

  private inserting = (activity: number) => {
    if (this.deque.length > 100) {
      this.deque.shift();
    }
    this.deque.push(activity);
  };

  private getMove = (): number | null => {
    if (this.getLowestValue(this.deque.slice(0, 50)) === 0) {
      const curActivity = this.getLowestValue(this.deque.slice(50, 100));
      if (curActivity !== 0) {
        return curActivity;
      }
    }
    return null;
  };

  public call({
    result,
    accuracy,
  }: {
    result: Array<number>;
    accuracy: Array<number>;
  }): InputMap | null {
    const res = result; // [stand, left, right]
    let all = 0;
    accuracy.forEach((e) => {
      all += e;
    });
    if (all / accuracy.length > 0.5) {
      // OK if the accuracy average of all points exceeds 0.5
      if (res[0] > -0.9) {
        // Down Case ( Stand Value > -0.9 )
        // console.log('DOWN');
        this.inserting(0);
      } else if (
        Math.abs(res[1] - res[2]) < 0.1 &&
        (res[1] > 0 || res[2] > 0)
      ) {
        // UP Case ( Difference of Left and Right Value is less than 0.1, left and right value must greater than 0)
        // console.log('UP');
        this.inserting(3);
      } else {
        // Left or right ( larger value )
        if (res[1] > res[2]) {
          //   console.log('LEFT');
          this.inserting(1);
        } else {
          //   console.log('RIGHT');
          this.inserting(2);
        }
      }
      const temp = this.getMove();
      if (temp !== null) {
        console.log(temp);
      }
    }
    return null;
  }
}
