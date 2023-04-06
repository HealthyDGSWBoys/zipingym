import CharacterControl, { direction } from './CharacterControl';
import CharacterInput from './CharacterInput';

export default class KeyboardInput implements CharacterInput {
  private keyMap: Map<string, direction>;
  private move: CharacterControl;
  constructor(keyMap?: Map<string, direction>) {
    this.keyMap =
      keyMap ??
      new Map([
        ['w', 'f'],
        ['q', 'l'],
        ['e', 'r'],
      ]);
    document.addEventListener('keydown', (e) => {
      const keyget = this.keyMap.get(e.key);
      if (keyget != undefined) {
        this.move.move(keyget);
      }
    });
  }
  setMove = (move: CharacterControl) => {
    this.move = move;
  };
}
