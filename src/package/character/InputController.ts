import { TransformNode } from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import { Inputable, onInputFunc } from '../input/Inputable';
import { InputMap } from '../input/InputMap';
import RoadTree from '../world/WorldTree';
import RoadCalculator from '../world/RoadCalculator';
import AccelateAnimation from '../animation/AccelateAnimation';
import MovementValidation from './MovementValidation';

export default class InputController extends Controller<TransformNode> {
  private positionAnimation: AccelateAnimation | undefined;
  private moveValid: MovementValidation;
  constructor(private input: Inputable, private roadTree: RoadTree) {
    super();
    this.moveValid = new MovementValidation(this.roadTree.tree);
    this.input.setOnInput(this.onInputEvent.bind(this));
  }

  public init(): void {
    this.positionAnimation = new AccelateAnimation(this.target, 'position');
  }

  private onInputEvent(res: InputMap) {
    const val = this.moveValid.validate(res);
    this.positionAnimation?.animate(
      'add',
      RoadCalculator.calcRotToDir(this.roadTree.tree.root.val.rotation, val),
      200
    );
    // console.log(this.roadTree.tree.root);
  }
}
