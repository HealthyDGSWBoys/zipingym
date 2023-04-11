import { InputMap } from '../../InputMap';

export default abstract class Trigger {
  public abstract call(res: Array<number>): InputMap | null;
}
