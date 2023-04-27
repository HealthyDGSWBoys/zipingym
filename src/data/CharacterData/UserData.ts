import UserCore from '$/core/UserCore/UserCore';
import { Vector3 } from '@babylonjs/core';

export default class UserData {
  private _currentRow: number = 0;
  private _currentRank: number = 3;
  private _currentRoataion: number = 400000;

  constructor(private userCore: UserCore) {}

  public get currentRow() {
    return this._currentRow;
  }
  public get currentRank() {
    return this._currentRank;
  }

  public move(direction: 'row' | 'rank', speed: number) {
    this[direction == 'row' ? '_currentRow' : '_currentRank'] += speed;
    this.userCore.move(
      this.calcRotToDir(
        speed,
        this._currentRoataion + (direction == 'row' ? 1 : 0)
      )!,
      direction == 'row' ? 200 : 1000
    );
  }

  public rotate(direction: 'l' | 'r') {
    this._currentRank = (direction == 'l' ? -1 : 1) * this.currentRow;
    this._currentRow = 0;
    this._currentRoataion += direction == 'l' ? -1 : 1;
    this.userCore.rotate(direction, 300);
  }

  private calcRotToDir(movement: number, rotation = this._currentRoataion) {
    switch (rotation % 4) {
      case 0:
        return new Vector3(0, 0, -movement);
      case 1:
        return new Vector3(movement, 0, 0);
      case 2:
        return new Vector3(0, 0, movement);
      case 3:
        return new Vector3(-movement, 0, 0);
      default:
        return new Vector3();
    }
  }
}
