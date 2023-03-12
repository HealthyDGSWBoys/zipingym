import Tree from './Tree';

export default class Route extends Tree<number> {
  public current: number;
  public pos: 0 | 1 | 2 = 1;
  constructor(raw: RawRoute, parent?: Route) {
    super(raw.length, parent);

    if (raw.children != undefined) {
      raw.children.forEach((child) => {
        this.appendChild(new Route(child, this));
      });
    }

    this.current = this.isRootNode() ? 0 : -1;
  }

  public move(direction: 'l' | 'f' | 'r'): 1 | 0 | -1 {
    if (direction == 'f') {
      if (this.current >= this.value) {
        return 0;
      } else {
        this.current++;
        return 1;
      }
    } else {
      if (this.current >= this.value) {
        return -1;
      } else {
        if (direction == 'l') {
          if (this.pos != 0) {
            this.pos--;
            return 1;
          } else {
            return 0;
          }
        } else {
          if (this.pos != 2) {
            this.pos++;
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  }
}

export declare type RawRoute = {
  length: number;
  origin: 'l' | 'f' | 'r' | 'o';
  children?: Array<RawRoute>;
};
