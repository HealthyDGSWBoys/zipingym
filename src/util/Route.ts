import Tree from './Tree';

export default class Route extends Tree<RouteValue> {
  public current: number;
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
}

declare type direction = 'l' | 'f' | 'r';

export interface RouteValue {
  length: number;
  origin: direction;
}

export interface RawRoute extends RouteValue {
  children?: Array<RawRoute>;
}
