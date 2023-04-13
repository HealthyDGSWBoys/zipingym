import { TransformNode, Vector3 } from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import { Inputable } from '../input/Inputable';
import { InputMap } from '../input/InputMap';
import RoadTree from '../world/RoadTree';
import RoadCalculator from '../world/RoadCalculator';
import AccelateAnimation from '../animation/AccelateAnimation';
import MovementValidation from './MovementValidation';
import KeyframeAnimation from '../animation/KeyframeAnimation';

export default class InputController extends Controller<TransformNode> {
  private positionAnimation: AccelateAnimation | undefined;
  private rotationAnimation: KeyframeAnimation | undefined;
  private moveValid: MovementValidation;
  constructor(private input: Inputable, private roadTree: RoadTree) {
    super();
    this.moveValid = new MovementValidation(this.roadTree);
    this.input.setOnInput(this.onInputEvent.bind(this));
  }

  public init(): void {
    this.positionAnimation = new AccelateAnimation(this.target, 'position');
    this.rotationAnimation = new KeyframeAnimation(this.target, 'rotation');
  }

  private onInputEvent(res: InputMap) {
    const val = this.moveValid.validate(res);
    if (val == -1) {
      this.positionAnimation?.animate(
        'add',
        RoadCalculator.calcRotToDir(
          RoadCalculator.calcAbsoluteRot(
            this.roadTree.tree.root.val.rotation,
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
        RoadCalculator.calcRotToDir(this.roadTree.tree.root.val.rotation, val),
        200
      );
    }
  }
}
