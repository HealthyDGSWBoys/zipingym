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
  constructor(
    target: Mesh,
    engine: WorldEngine,
    input: CharacterInput,
    moveReport: (report: Vector3) => void
  ) {
    this.target = target;
    this.posKeyframe = new AccelateAnimation(this.target, 'position');
    this.posKeyframe.report = moveReport;
    this.rotKeyframe = new KeyframeAnimation(this.target, 'rotation');
    this.engine = engine;
    this.engine.mapBuild();
    input.setMove(this);
  }

  public move(direction: direction) {
    const moveResult = this.engine.move(direction);

    if (direction == 'f') {
      if (moveResult > 0) {
        this.posKeyframe.animate(
          'add',
          this.engine.lookDir('f').multiply(new Vector3().setAll(moveResult)),
          350
        );
      }
    } else if (direction == 'r') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.engine.lookDir('r'), 300);
      } else if (moveResult == -1) {
        this.engine.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, Math.PI / 2, 0), 400);
      }
    } else if (direction == 'l') {
      if (moveResult == 1) {
        this.posKeyframe.animate('add', this.engine.lookDir('l'), 300);
      } else if (moveResult == -1) {
        this.engine.mapBuild();
        this.rotKeyframe.animate('add', new Vector3(0, -Math.PI / 2, 0), 400);
      }
    }
  }
}
