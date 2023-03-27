import WorldManager from '$/class/world/worldManager';
import { Scene, Vector3 } from '@babylonjs/core';
import Random from './Random';
import RouteImpl, { RawRoute, RouteTree } from './Route';
import { rotation } from './Route';

export default class WorldEngine extends RouteImpl {
  private childDeps: number = 3;
  private scene: Scene;
  private manager: WorldManager;
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
  constructor(raw: RawRoute, scene: Scene) {
    super(raw);
    this.scene = scene;
  }
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
        child.children.push(WorldEngine.makeRouteTree(child, lengthL, 'l'));
        child.children.push(WorldEngine.makeRouteTree(child, lengthR, 'r'));
      } else {
        const length = Random.getRandom(this.lengthRand);
        child.children.push(WorldEngine.makeRouteTree(child, length, dir));
      }
      this.rerender(child.children);
    });
  }

  public setWorldManager(man: WorldManager) {
    this.manager = man;
  }

  private rerender(target: Array<RouteTree>) {
    const sp = this.scene.getNodeByName('SpawnPoint');
    target.forEach((t) => {
      const size = t.length / WorldEngine.LengthDelta;
      for (let i = 1; i <= size; i++) {
        const road = this.manager.random.clone();
        if (t.absoluteRot == 'l' || t.absoluteRot == 'r') {
          road.rotation = new Vector3(0, Math.PI / 2, 0);
        }
        road.position = t.absolutePos.add(
          WorldEngine.calcRotToDir(t.absoluteRot, 30 * (i - 1))
        );

        road.parent = sp;
      }
    });
  }

  public noChildNodes(raw: RouteTree): Array<RouteTree> {
    const res: Array<RouteTree> = new Array();
    if (raw.children.length == 0) {
      res.push(this.raw);
    } else {
      raw.children.forEach((child) => {
        res.push(...this.noChildNodes(child));
      });
    }
    return res;
  }
  private static LengthDelta = this.RouteLength / this.Advance_Distance;
  private static makeRouteTree(parent: RouteTree, len: number, dir: 'l' | 'r') {
    return {
      length: len * WorldEngine.LengthDelta,
      origin: dir,
      children: new Array(),
      parent,
      absolutePos: WorldEngine.calcAbsolutePos(
        parent.absoluteRot,
        parent.absolutePos,
        parent.length / WorldEngine.LengthDelta,
        WorldEngine.calcAbsoluteRot(parent.absoluteRot, dir)
      ),
      absoluteRot: WorldEngine.calcAbsoluteRot(parent.absoluteRot, dir),
    };
  }

  private static calcAbsoluteRot(parent: rotation, change: 'l' | 'r') {
    const rotArr: Array<rotation> = ['u', 'r', 'd', 'l'];
    let idx = rotArr.indexOf(parent) + (change == 'r' ? 1 : -1);
    if (idx == -1) {
      idx = 3;
    } else if (idx == 4) {
      idx = 0;
    }
    return rotArr[idx];
  }

  private static calcAbsolutePos(
    parent_rot: rotation,
    parent_pos: Vector3,
    parent_len: number,
    child_rot: rotation
  ) {
    const origin = parent_pos
      .clone()
      .add(
        WorldEngine.calcRotToDir(
          parent_rot,
          this.RouteLength / 2 -
            this.RouteWidth +
            RouteImpl.RouteLength * (parent_len - 1)
        )
      )
      .add(
        WorldEngine.calcRotToDir(
          child_rot,
          this.RouteLength / 2 + this.RouteWidth
        )
      );
    return origin;
  }

  private static calcRotToDir(rot: rotation, movement: number) {
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
