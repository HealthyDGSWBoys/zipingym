export default class UserData {
  private _currentRow: number = 0;
  private _currentRank: number = 0;

  public get currentRow() {
    return this._currentRow;
  }
  public get currentRank() {
    return this._currentRank;
  }

  constructor() {}

  public move(direction: 'row' | 'rank', speed: number) {
    this[direction == 'row' ? '_currentRow' : '_currentRank'] += speed;
  }
}
