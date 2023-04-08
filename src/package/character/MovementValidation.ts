import Tree from '$/util/Tree';
import { InputMap } from '../input/InputMap';
import RoadCalculator from '../world/RoadCalculator';
import { RoadInfoNode } from '../world/WorldTree';

export default class MovementValidation {
  public static sideMovement: number = 1.5;
  public static straightMovement: number = 6;
  public currentPos: number = 0;
  public currentSide: -1 | 0 | 1 = 0;
  constructor(private roadTree: Tree<RoadInfoNode>) {}

  public validate(input: InputMap): number {
    if (input == 'straight') {
      const length = this.roadTree.root.val.length * RoadCalculator.RoadLength;
      if (length - this.currentPos > MovementValidation.straightMovement) {
        this.currentPos += MovementValidation.straightMovement;
        return MovementValidation.straightMovement;
      } else {
        this.currentPos += length - this.currentPos;
        return length - this.currentPos;
      }
    } else {
      return 0;
    }
  }
}
