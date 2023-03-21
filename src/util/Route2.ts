import { Vector3 } from 'babylonjs';

export interface Route2 {
  //현재 보고 있는 방향
  lookAt: rotation;

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

// left, right, up, down
declare type rotation = 'l' | 'r' | 'u' | 'd';

// left, front, right
declare type direction = 'l' | 'f' | 'r';

export interface RawRoute {
  //길의 길이
  length: number;
  //어떻게 돌아서 시작했는지
  origin: direction;
  //자식들
  children?: Array<RawRoute>;
}
