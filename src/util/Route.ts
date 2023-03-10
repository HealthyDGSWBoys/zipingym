import Tree from './Tree';

export default class Route extends Tree<number> {
  public current: number;
  constructor(raw: RawRoute, parent?: Route) {
    super(raw.length, parent);

    if (raw.children != undefined) {
      raw.children.forEach((child) => {
        this.appendChild(new Route(child, this));
      });
    }

    this.current = this.isRootNode() ? 0 : -1;
  }

  // public move(direction: 'l' | 'f' | 'r'): boolean {
  //   if (direction == 'f') {
  //     if (this.current >= this.value) {
  //       return false;
  //     } else {
  //       this.current++;
  //       return true;
  //     }
  //   } else {
  //     this;
  //   }
  // }
}

export declare type RawRoute = {
  length: number;
  origin: 'l' | 'f' | 'r' | 'o';
  children?: Array<RawRoute>;
};
