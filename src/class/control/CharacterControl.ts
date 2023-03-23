import Route2Impl, { RawRoute, Route2 } from '$/util/Route2';
import { Mesh, Vector2, Vector3 } from 'babylonjs';
import KeyframeAnimation from '../keyframe/KeyframeAnimation';
import CharacterInput from './CharacterInput';

export declare type direction = 'l' | 'f' | 'r';

export default class CharacterControl {
  private route: Route2;
  private target: Mesh;
  private posKeyframe: KeyframeAnimation;
  private rotKeyframe: KeyframeAnimation;
  constructor(target: Mesh, rawRoute: RawRoute, input: CharacterInput) {
    this.target = target;
    this.route = new Route2Impl(rawRoute);
    this.posKeyframe = new KeyframeAnimation(this.target, 'position');
    this.rotKeyframe = new KeyframeAnimation(this.target, 'rotation');

    input.setMove(this);
  }

  public move(direction: direction) {
    const moveResult = this.route.move(direction);
    if (direction == 'f') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('f'), 100);
      }
    } else if (direction == 'r') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('r'), 100);
      } else if (moveResult == -1) {
        this.rotKeyframe.animate('add', new Vector3(0, Math.PI / 2, 0), 500);
      }
    } else if (direction == 'l') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.route.lookDir('l'), 100);
      } else if (moveResult == -1) {
        this.rotKeyframe.animate('add', new Vector3(0, -Math.PI / 2, 0), 500);
      }
    }
  }
}
