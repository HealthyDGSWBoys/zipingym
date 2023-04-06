import { InputMap } from './InputMap';
import { Input, onInputFunc } from './Inputable';

export default class KeyboardInput extends Input {
  public static KeyMap: Map<string, InputMap> = new Map([
    ['w', 'straight'],
    ['q', 'left'],
    ['e', 'right'],
  ]);

  constructor(onInput: onInputFunc) {
    super(onInput);
    document.addEventListener('keydown', (e) => {
      const key = KeyboardInput.KeyMap.get(e.key);
      if (key != undefined) {
        this.onInput(key);
      }
    });
  }
}
