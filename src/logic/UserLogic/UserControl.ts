import UserData from '$/data/UserData/UserData';
import RoadCalculator from '$/data/WorldData/RoadCalculator';
import WorldData from '$/data/WorldData/WorldData';
import { InputMap } from '$/module/input/InputMap';

export default class UserControl {
  public rowSpeed: number = 1.5;
  public rankSpeed: number = 30;

  constructor(protected userData: UserData, protected worldData: WorldData) {}

  public input(input: InputMap) {
    if (input == 'left') input = 'right';
    else if (input == 'right') input = 'left';
    if (input == 'straight') {
      const currentRank = this.userData.currentRank;
      const roadLength = this.worldData.getNodeLength();
      const moveDistance =
        Math.abs(roadLength - currentRank) > this.rankSpeed
          ? this.rankSpeed
          : roadLength - currentRank;
      const remainDistance =
        roadLength - this.userData.currentRank - moveDistance;
      this.userData.move(
        'rank',
        remainDistance > 2 ? moveDistance : moveDistance + remainDistance
      );
    } else {
      if (
        this.worldData.rootNode.val.length * RoadCalculator.RoadLength -
          this.userData.currentProgress <
        7
      ) {
        const rotateDirection = input == 'left' ? 'l' : 'r';
        try {
          const rootNode = this.worldData.rootNode;
          this.worldData.rotate(rotateDirection);
          this.userData.rotate(
            rotateDirection,
            rootNode.val.length * RoadCalculator.RoadLength
          );
        } catch (e) {}
      } else {
        const speed = this.rowSpeed * (input == 'left' ? -1 : 1);
        if (speed != this.userData.currentRow) {
          this.userData.move('row', speed);
        }
      }
    }
  }
}
