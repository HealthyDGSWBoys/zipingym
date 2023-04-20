import {
  AnimationGroup,
  AnimationPropertiesOverride,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import { Inputable } from '../input/Inputable';
import { InputMap } from '../input/InputMap';
import RoadCalculator from '../world/RoadCalculator';
import AccelateAnimation from '../animation/AccelateAnimation';
import MovementValidation from './MovementValidation';
import KeyframeAnimation from '../animation/KeyframeAnimation';

export default class InputController extends Controller<TransformNode> {
  private positionAnimation: AccelateAnimation | undefined;
  private rotationAnimation: KeyframeAnimation | undefined;
  constructor(
    private input: Inputable,
    private moveValid: MovementValidation,
    private animations: Array<AnimationGroup>
  ) {
    super();
    this.input.setOnInput(this.onInputEvent.bind(this));
  }

  public init(): void {
    this.positionAnimation = new AccelateAnimation(this.target, 'position');
    this.rotationAnimation = new KeyframeAnimation(this.target, 'rotation');
    this.animations.forEach((animation) => {});
    this.positionAnimation.report = (d) => {
      if (Math.abs(d.x) + Math.abs(d.z) != 0) {
        this.animations[1].play();
        this.animations[3].pause();
      } else {
        this.animations[3].play();
        this.animations[1].pause();
      }
    };
  }

  private onInputEvent(res: InputMap) {
    const val = this.moveValid.validate(res);
    if (val == -1) {
      this.positionAnimation?.animate(
        'add',
        RoadCalculator.calcRotToDir(
          RoadCalculator.calcAbsoluteRot(
            this.moveValid.roadTree.tree.root.val.rotation,
            res == 'right' ? 'l' : 'r'
          ),
          MovementValidation.sideMovement
        ),
        300
      );
    } else if (val == -2) {
      this.rotationAnimation?.animate(
        'add',
        new Vector3(0, (Math.PI / 2) * (res == 'left' ? -1 : 1), 0),
        400
      );
    } else {
      this.positionAnimation?.animate(
        'add',
        RoadCalculator.calcRotToDir(
          this.moveValid.roadTree.tree.root.val.rotation,
          val
        ),
        200
      );
    }
  }
}
