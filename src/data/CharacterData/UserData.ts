export default class UserData {
  private _currentRow: number = 0;
  private _currentRank: number = 0;

  constructor() {}

  public get currentRow() {
    return this._currentRow;
  }
  public get currentRank() {
    return this._currentRank;
  }

  public move(direction: 'row' | 'rank', speed: number) {
    this[direction == 'row' ? '_currentRow' : '_currentRank'] += speed;
  }

  public rotate(direction: 'l' | 'r') {
    this._currentRank = (direction == 'l' ? -1 : 1) * this.currentRow;
    this._currentRow = 0;
  }
}
