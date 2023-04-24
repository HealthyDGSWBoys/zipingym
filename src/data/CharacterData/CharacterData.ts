import { direction } from '../WorldData/WorldData';

export default class CharacterData {
  protected rowSpeed: number = 1.5;
  protected rankSpeed: number = 3;

  private rowPosition: number = 0;
  private rankPosition: number = 0;

  constructor() {}

  public move(dir: direction, roadLength: number) {
    switch (dir) {
      case 'f':
        return this.moveFront(roadLength);
      case 'l':
        return this.moveLeft(roadLength);
      case 'r':
        return this.moveRight(roadLength);
    }
  }

  private moveFront(roadLength: number) {
    if (roadLength <= this.rankPosition) {
      return 0;
    } else {
      if (roadLength - this.rankPosition < this.rankSpeed) {
        const movement = roadLength - this.rankPosition;
        this.rankPosition += movement;
        return movement;
      } else {
        this.rankPosition += this.rankSpeed;
        return this.rankSpeed;
      }
    }
  }
  private moveLeft(roadLength: number) {}
  private moveRight(roadLength: number) {}
}
