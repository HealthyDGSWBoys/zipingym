import { Vector3 } from 'babylonjs';
import { direction } from '$/class/control/CharacterControl';

export interface Route2 {
  // 현재 보고 있는 방향 ( l, r, u, d )
  lookAt: rotation;

  // 현재 길에서 위치한 방향 ( l, c, r )
  position: position;

  // 현재 길의 진행도 ( Number )
  progress: Number;

  /**
   * @param dir 이동 방향(앞, 왼쪽 오른쪽)
   * @returns 해야 하는 동직(-1 일 경우 해당 방향으로 돌기, 1 일 경우 해당 방향으로 이동, 0일 경우 아무 동자도 하지 않기
   */
  move: (dir: direction) => -1 | 0 | 1;

  /**
   *
   * @param dir 이동 방향(앞, 왼쪽 오른쪽)
   * @returns 이동 해야 하는 XYZ 좌푯값
   */
  lookDir: (dir: direction) => Vector3;
}

export default class Route2Impl implements Route2 {
  constructor(raw: RawRoute) {
    this.raw = raw;
  }
  move_distance: number = 1;
  raw: RawRoute;
  position: position = 'c';
  lookAt: rotation = 'u';
  progress: number = 0;
  public move(dir: direction): -1 | 0 | 1 {
    if (dir === 'f') {
      // Going forward
      if (this.progress < this.raw.length - 1) {
        // When it don't arrive at the end yet
        this.progress++;
        return 1; // Keep moving
      } else {
        // When it arrived at the end
        return 0; // Do not anything
      }
    } else {
      // Rotating direction || Moving sideways
      if (this.progress < this.raw.length - 1) {
        // When it don't arrive at the end yet
        if (dir === this.position) {
          // If it can no longer move sideways
          return 0;
        } else {
          // If it can move sideways
          this.position = ['l', 'c', 'r'][
            { l: 0, c: 1, r: 2 }[this.position] + { l: -1, r: 1 }[dir]
          ] as position; // Change my position
          return 1; // Moving sideways
        }
      } else {
        // When it arrive at the end
        for (let i of this.raw.children) {
          // Search child nodes
          if (i.origin === dir) {
            // If the direction is included in the child nodes
            this.progress = 0; // Refresh progress
            this.raw = i; // Change current path to child node
            this.spin(dir);
            return -1; // Rotating direction
          }
        }
        return 0; // Do not anything
      }
    }
  }
  public lookDir(dir: direction): Vector3 {
    let movement = this.move_distance;
    if (dir == 'f') {
      switch (this.lookAt) {
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
      switch (this.lookAt) {
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

  private spin(dir: 'r' | 'l') {
    if (dir == 'r') {
      if (this.lookAt == 'u') this.lookAt = 'r';
      else if (this.lookAt == 'r') this.lookAt = 'd';
      else if (this.lookAt == 'd') this.lookAt = 'l';
      else this.lookAt = 'u';
    } else if (dir == 'l') {
      if (this.lookAt == 'u') this.lookAt = 'l';
      else if (this.lookAt == 'l') this.lookAt = 'd';
      else if (this.lookAt == 'd') this.lookAt = 'r';
      else this.lookAt = 'u';
    }
  }
}

// left, right, up, down
declare type rotation = 'l' | 'r' | 'u' | 'd';

// left, center, right
declare type position = 'l' | 'c' | 'r';

export interface RawRoute {
  //길의 길이
  length: number;
  //어떻게 돌아서 시작했는지
  origin: direction;
  //자식들
  children: Array<RawRoute>;
}
