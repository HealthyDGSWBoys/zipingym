export default class Random {
  public static getRandom<T>(map: Map<T, number>): T {
    let max: number = 0;
    map.forEach((value: number, key: T) => {
      max += value;
    });
    const num = Random.rand(max);
    let ret: T;
    let stop = false;
    map.forEach((value: number, key: T) => {
      max -= value;
      if (max < num && !stop) {
        ret = key;
        stop = true;
      }
    });
    //@ts-ignore
    return ret;
  }
  public static getRandoms<T>(map: Map<T, number>, count: number): Array<T> {
    const result: Array<T> = new Array();
    for (let i = 0; i < count; i++) {
      const get = this.getRandom(map);
      if (result.includes(get)) {
        i--;
      } else {
        result.push(get);
      }
    }
    return result;
  }
  private static rand(max: number) {
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
