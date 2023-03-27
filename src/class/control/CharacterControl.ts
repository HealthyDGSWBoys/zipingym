import WorldEngine from '$/util/WorldEngine';
import { Mesh, Vector3 } from '@babylonjs/core';
import AccelateAnimation from '../keyframe/AccelateAnimation';
import KeyframeAnimation from '../keyframe/KeyframeAnimation';
import CharacterInput from './CharacterInput';

export declare type direction = 'l' | 'f' | 'r';

export default class CharacterControl {
  private engine: WorldEngine;
  private target: Mesh;
  private posKeyframe: AccelateAnimation;
  private rotKeyframe: KeyframeAnimation;
  constructor(target: Mesh, engine: WorldEngine, input: CharacterInput) {
    this.target = target;
    this.posKeyframe = new AccelateAnimation(this.target, 'position');
    this.rotKeyframe = new KeyframeAnimation(this.target, 'rotation');

    input.setMove(this);
    this.engine = engine;
    this.engine.mapBuild();
  }

  public move(direction: direction) {
    const moveResult = this.engine.move(direction);
    if (direction == 'f') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.engine.lookDir('f'), 250);
      }
    } else if (direction == 'r') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.engine.lookDir('r'), 200);
      } else if (moveResult == -1) {
        this.engine.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, Math.PI / 2, 0), 500);
      }
    } else if (direction == 'l') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.engine.lookDir('l'), 200);
      } else if (moveResult == -1) {
        this.engine.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, -Math.PI / 2, 0), 500);
      }
    }
  }
}
