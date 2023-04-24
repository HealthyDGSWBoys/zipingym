import UserData from '$/data/CharacterData/UserData';
import WorldData from '$/data/WorldData/WorldData';
import { InputMap } from '$/module/input/InputMap';

export default class UserControl {
  public rowSpeed: number = 1.5;
  public rankSpeed: number = 3;

  constructor(protected userData: UserData, protected worldData: WorldData) {}

  public input(input: InputMap) {
    if (input == 'straight') {
      const currentRank = this.userData.currentRank;
      const roadLength = this.worldData.length();
      console.log(roadLength, currentRank);
      if (roadLength - currentRank > this.rankSpeed) {
        this.userData.move('rank', this.rankSpeed);
      } else this.userData.move('row', roadLength - currentRank);
    } else {
    }
  }
}
