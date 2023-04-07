import ExerciseInput from './ExerciseInput';
import { Inputable } from './Inputable';
import KeyboardInput from './KeyboardInput';
import NetworkInput from './NetworkInput';

export default class InputFactory {
  public static GetInput(type: InputType): Inputable {
    switch (type) {
      case 'keyboard':
        return new KeyboardInput();
      case 'exercise':
        return new ExerciseInput();
      case 'network':
        return new NetworkInput();
    }
  }
}
export type InputType = 'keyboard' | 'exercise' | 'network';
