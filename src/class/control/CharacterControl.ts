import RouteImpl, { RawRoute, Route } from '$/util/Route';
import WorldEngine from '$/util/WorldEngine';
import { Mesh, Vector3 } from 'babylonjs';
import AccelateAnimation from '../keyframe/AccelateAnimation';
import KeyframeAnimation from '../keyframe/KeyframeAnimation';
import CharacterInput from './CharacterInput';

export declare type direction = 'l' | 'f' | 'r';

export default class CharacterControl {
  private route: WorldEngine;
  private target: Mesh;
  private posKeyframe: AccelateAnimation;
  private rotKeyframe: KeyframeAnimation;
  constructor(target: Mesh, rawRoute: RawRoute, input: CharacterInput) {
    this.target = target;
    this.route = new WorldEngine(rawRoute);
    this.posKeyframe = new AccelateAnimation(this.target, 'position');
    this.rotKeyframe = new KeyframeAnimation(this.target, 'rotation');

    input.setMove(this);
    this.route.mapBuild();
  }

  public move(direction: direction) {
    console.log(this.route.raw);
    const moveResult = this.route.move(direction);
    if (direction == 'f') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('f'), 250);
      }
    } else if (direction == 'r') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('r'), 200);
      } else if (moveResult == -1) {
        this.route.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, Math.PI / 2, 0), 500);
      }
    } else if (direction == 'l') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('l'), 200);
      } else if (moveResult == -1) {
        this.route.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, -Math.PI / 2, 0), 500);
      }
    }
  }
}
