import { Vector3 } from 'babylonjs';
import Tree from './Tree';

export default class Route extends Tree<RouteValue> {
  public current: number;
  public LookAt: 'r' | 'l' | 'u' | 'd' = 'u';
  //왼쪽일 떄 0 중간일 때 1 오른쪽일 떄 2
  public pos: 0 | 1 | 2 = 1;
  public isTarget: boolean;

  public targetNode(target?: Route): Route | undefined {
    target = target ?? this;
    if (target.isTarget) {
      return target;
    } else {
      if (target.childNode.length == 0) {
        return undefined;
      } else {
        for (let i = 0; i < target.childNode.length; i++) {
          const get = this.targetNode(target.childNode[i] as Route);
          if (get != undefined) {
            return get;
          }
        }
        return undefined;
      }
    }
  }

  public getMoveVector(dir: 'f' | 'r' | 'l') {
    let movement: number = 1;
    if (dir == 'f') {
      switch (this.targetNode()!.LookAt) {
        case 'u':
          return new Vector3(0, 0, -movement);
        case 'd':
          return new Vector3(0, 0, movement);
        case 'r':
          return new Vector3(-movement, 0, 0);
        case 'l':
          return new Vector3(movement, 0, 0);
      }
    } else {
      movement = dir === 'r' ? -movement : movement;
      switch (this.targetNode()!.LookAt) {
        case 'u':
          return new Vector3(movement, 0, 0);
        case 'd':
          return new Vector3(-movement, 0);
        case 'r':
          return new Vector3(0, 0, movement);
        case 'l':
          return new Vector3(0, 0, -movement);
      }
    }
  }

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
    this.isTarget = this.isRootNode() ? true : false;
  }

  public move(direction: 'f' | 'l' | 'r'): number {
    if (direction == 'f') {
      if (this.targetNode()!.current < this.targetNode()!.value.length) {
        this.targetNode()!.current++;
        return 1;
      } else {
        return 0;
      }
    } else if (direction == 'l') {
      if (this.targetNode()!.pos != 0) {
        this.targetNode()!.pos--;
        return 1;
      } else {
        return 0;
      }
    } else if (direction == 'r') {
      if (this.targetNode()!.current == this.targetNode()!.value.length) {
        const r = this.targetNode()!.childNode.find(
          (child) => child.value.origin === 'r'
        ) as Route;
        if (r != undefined) {
          this.targetNode()!.isTarget = false;
          r.isTarget = true;
          r.LookAt = 'r';
          return -1;
        } else {
          return 0;
        }
      } else if (this.targetNode()!.pos != 2) {
        this.targetNode()!.pos++;
        return 1;
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
