import { InputMap } from '../../InputMap';

export default abstract class Trigger {
  public abstract call(res: {
    result: Array<number>;
    accuracy: Array<number>;
    deltaTime: number;
  }): InputMap | null;
  public abstract arrayToCode(arr: Array<number>): number;
  public abstract getInfo(code: number): { name: string; color: string };
}
