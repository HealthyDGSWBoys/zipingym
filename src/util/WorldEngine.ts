import Random from './Random';
import RouteImpl, { RawRoute } from './Route';

export default class WorldEngine extends RouteImpl {
  private childDeps: number = 3;
  private lengthRand: Map<number, number> = new Map([
    [1, 1],
    [2, 3],
    [3, 3],
    [4, 1],
  ]);
  private dirRand: Map<string, number> = new Map([
    ['l', 2],
    ['r', 2],
    ['b', 1],
  ]);
  public mapBuild() {
    const noChildren = this.noChildNodes(this.raw);
    noChildren.forEach((child) => {
      const dir: 'b' | 'r' | 'l' = Random.getRandom(this.dirRand) as
        | 'b'
        | 'r'
        | 'l';
      if (dir == 'b') {
        const lengthL = Random.getRandom(this.lengthRand);
        const lengthR = Random.getRandom(this.lengthRand);
        child.children.push({
          length: lengthL * 9,
          origin: 'l',
          children: [],
        });
        child.children.push({
          length: lengthR * 9,
          origin: 'r',
          children: [],
        });
      } else {
        const length = Random.getRandom(this.lengthRand);
        child.children.push({
          length: length * 9,
          origin: dir,
          children: [],
        });
      }
    });
  }

  private noChildNodes(raw: RawRoute) {
    const res: Array<RawRoute> = new Array();
    if (raw.children.length == 0) {
      res.push(this.raw);
    } else {
      raw.children.forEach((child) => {
        res.push(...this.noChildNodes(child));
      });
    }
    return res;
  }
}
