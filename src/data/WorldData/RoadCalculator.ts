import { Vector3 } from '@babylonjs/core';
import { rotation } from './WorldData';

export default class RoadCalculator {
  public static RoadLength = 30;
  public static RoadWidth = 3;
  private static rotArr: Array<rotation> = ['u', 'r', 'd', 'l'];
  public static calcAbsoluteRot(parent: rotation, change: 'l' | 'r') {
    let idx = this.rotArr.indexOf(parent) + (change == 'r' ? -1 : 1);
    if (idx == -1) {
      idx = 3;
    } else if (idx == 4) {
      idx = 0;
    }
    return this.rotArr[idx];
  }

  public static calcAbsolutePos(
    parent_rot: rotation,
    parent_pos: Vector3,
    parent_len: number,
    child_rot: rotation
  ) {
    const origin = parent_pos
      .clone()
      .add(
        RoadCalculator.calcRotToDir(
          parent_rot,
          this.RoadLength / 2 -
            this.RoadWidth +
            this.RoadLength * (parent_len - 1)
        )
      )
      .add(
        RoadCalculator.calcRotToDir(
          child_rot,
          this.RoadLength / 2 + this.RoadWidth
        )
      );
    return origin;
  }

  public static calcRotToDir(rot: rotation, movement: number) {
    switch (rot) {
      case 'u':
        return new Vector3(0, 0, -movement);
      case 'd':
        return new Vector3(0, 0, movement);
      case 'r':
        return new Vector3(movement, 0, 0);
      case 'l':
        return new Vector3(-movement, 0, 0);
    }
  }
}
