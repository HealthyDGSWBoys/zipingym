import Tree from '$/util/Tree';
import { InputMap } from '../input/InputMap';
import RoadCalculator from '../world/RoadCalculator';
import RoadTree, { RoadInfoNode } from '../world/RoadTree';

export default class MovementValidation {
  public static sideMovement: number = 1.5;
  public static straightMovement: number = 6;
  public currentPos: number = 3;
  public currentSide: -1 | 0 | 1 = 0;
  constructor(private roadTree: RoadTree) {}

  public validate(input: InputMap): number {
    if (input == 'straight') {
      const length = this.length;
      if (length - this.currentPos >= MovementValidation.straightMovement) {
        this.currentPos += MovementValidation.straightMovement;
        return MovementValidation.straightMovement;
      } else {
        const retVal = length - this.currentPos;
        this.currentPos += length - this.currentPos;
        return retVal;
      }
    } else {
      if (this.currentPos == this.length) {
        const find = this.root.children.find(
          (e) => e.val.origin == (input == 'left' ? 'r' : 'l')
        );
        if (find != undefined) {
          this.roadTree.tree.setRoot(find);
          this.roadTree.buildChildren();
          this.currentPos =
            (input == 'left' ? -1 : 1) *
            this.currentSide *
            MovementValidation.sideMovement;
          this.currentSide = 0;
          return -2;
        } else {
          return 0;
        }
      } else {
        const pos = input == 'left' ? -1 : 1;
        if (pos != this.currentSide) {
          this.currentSide += pos;
          return -1;
        } else {
          return 0;
        }
      }
    }
  }

  private get length() {
    return this.root.val.length * RoadCalculator.RoadLength;
  }

  private get root() {
    return this.roadTree.tree.root;
  }
}
