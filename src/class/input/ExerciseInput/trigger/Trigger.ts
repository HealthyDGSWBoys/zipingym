import { InputMap } from '../../InputMap';

export default abstract class Trigger {
  public abstract call(res: {
    result: Array<number>;
    accuracy: Array<number>;
  }): InputMap | null;
}
