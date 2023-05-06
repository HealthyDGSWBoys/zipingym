import UserCore from '$/core/UserCore/UserCore';
import { Vector3 } from '@babylonjs/core';

export default class UserData {
  private _currentRow: number = 0;
  private _currentRank: number = 3;
  private _currentRoataion: number = 400000;
  private _score: number = 0;
  private _rootPosition: Vector3;

  constructor(private userCore: UserCore) {
    this._rootPosition = userCore.currentPosition.subtract(
      new Vector3(0, 0, -3)
    );
  }

  public get currentRow() {
    return this._currentRow;
  }
  public get currentRank() {
    return this._currentRank;
  }

  public get currentProgress() {
    return (
      Math.round(
        Math.abs(
          this.userCore.currentPosition[this.sightDirection] -
            this._rootPosition[this.sightDirection]
        ) * 1000
      ) / 1000
    );
  }

  public get absolutePosition() {
    return this.userCore.worldPosition;
  }

  public get score() {
    return this._score;
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

  public rotate(direction: 'l' | 'r', length: number) {
    this._rootPosition = this._rootPosition.add(this.calcRotToDir(length));
    this._currentRank = (direction == 'l' ? -1 : 1) * this.currentRow;
    this._currentRow = 0;
    this._currentRoataion += direction == 'l' ? -1 : 1;
    this.userCore.rotate(direction, 300);
  }

  public setScore(score: number) {
    this._score = score;
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

  private get sightDirection(): 'x' | 'z' {
    return this._currentRoataion % 2 ? 'x' : 'z';
  }
}
