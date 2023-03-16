import Tree from './Tree';

export default class Route extends Tree<RouteValue> {
  public current: number;

  public LookAt: 'r' | 'l' | 'ur' | 'ul' = 'r';

  //왼쪽일 떄 0 중간일 때 1 오른쪽일 떄 2
  public pos: 0 | 1 | 2 = 1;

  constructor(raw: RawRoute, parent?: Route) {
    super(
      {
        length: raw.length,
        origin: raw.origin,
      },
      parent
    );

    if (raw.children != undefined) {
      raw.children.forEach((child) => {
        this.appendChild(new Route(child, this));
      });
    }

    this.current = this.isRootNode() ? 0 : -1;
  }

  public move(direction: 'f' | 'l' | 'r'): number {
    console.log(
      'pos :' + this.pos,
      'current :' + this.current,
      'Length :' + this.value.length
    );

    if (direction == 'f') {
      if (this.current < this.value.length) {
        this.current++;
        return 1;
      } else {
        return 0;
      }
    } else if (direction == 'l') {
      if (this.pos != 0) {
        this.pos--;
        return 1;
      } else {
        return 0;
      }
    } else if (direction == 'r') {
      const RchildNode = this.childNode.find(
        (Element) => Element.value.origin == 'r'
      );
      if (this.pos != 2) {
        this.pos++;
        return 1;
      } else if (
        RchildNode != undefined &&
        this.current >= this.value.length &&
        this.pos == 2
      ) {
        this.current = 0;
        this.value = RchildNode.value;
        this.childNode = RchildNode.childNode;
        this.parentNode = RchildNode.parentNode;
        console.log(this.childNode.find);
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}

declare type direction = 'l' | 'f' | 'r';

export interface RouteValue {
  length: number;
  origin: direction;
}

export interface RawRoute extends RouteValue {
  children?: Array<RawRoute>;
}
