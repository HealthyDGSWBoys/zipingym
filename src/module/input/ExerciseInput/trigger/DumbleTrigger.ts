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
      const code = this.arrayToCode(res);
      this.inserting(code);
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

  public arrayToCode(arr: number[]): number {
    const line = 0.5;
    if (Math.abs(arr[0] - arr[1]) > 1.5) {
      return arr[0] > arr[1] ? 1 : 2;
    } else if (arr[0] > line && arr[1] > line) {
      return 3;
    } else {
      return 0;
    }
  }

  public getInfo(code: number): { name: string; color: string } {
    switch (code) {
      case 0:
        return {
          name: 'stand',
          color: 'rgba(200, 0, 0, 0.5)',
        };
      case 1:
        return {
          name: 'left',
          color: 'rgba(0, 200, 0, 0.5)',
        };
      case 2:
        return {
          name: 'right',
          color: 'rgba(0, 0, 200, 0.5)',
        };
      case 3:
        return {
          name: 'up',
          color: 'rgba(0, 200, 200, 0.5)',
        };
      default:
        return {
          name: 'undefined',
          color: 'rgb(200, 200, 200)',
        };
    }
  }
}
