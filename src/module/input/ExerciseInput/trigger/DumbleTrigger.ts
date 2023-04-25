import { InputMap } from '../../InputMap';
import Trigger from './Trigger';

export default class DumbleTrigger extends Trigger {
  private deque: number[] = [];
  private turn: number = 0;

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
    if (this.deque.length > 5) {
      this.deque.shift();
    }
    this.deque.push(activity);
  };

  private getMove = (): number | null => {
    const nowPos = this.getLowestValue(this.deque);
    if (nowPos === 0 && this.turn !== 0) {
      const temp = this.turn;
      this.turn = 0;
      return temp;
    } else {
      this.turn = nowPos;
      return null;
    }
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
      if (temp != null) {
        return this.numberToInputMap(temp);
      }
    }
    return null;
  }

  private numberToInputMap(n: number): InputMap | null {
    switch (n) {
      case 1:
        return 'left';
      case 2:
        return 'right';
      case 3:
        return 'straight';
      default:
        return null;
    }
  }
}