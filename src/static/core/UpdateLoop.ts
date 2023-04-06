import { Updateable } from '$/global/Updateable';
import DeltaClock from '$/util/DeltaClock';
import Core from './Core';

export default class UpdateLoop implements Updateable {
  private static instance: UpdateLoop;

  private updateQueue: Array<Updateable>;
  private deltaClock: DeltaClock;
  private constructor() {
    this.updateQueue = new Array();
    this.deltaClock = new DeltaClock();
  }
  update(): void {
    const deltaTime = this.deltaClock.getDeltaTime();
    this.updateQueue.forEach((updateMember) => {
      updateMember.update(deltaTime);
    });
    Core.get.scene.render();
  }

  public static set() {
    if (this.instance == null) {
      this.instance = new UpdateLoop();
    }
  }
  public static get get() {
    return this.instance;
  }
  public static append(updateMember: Updateable) {
    this.instance.updateQueue.push(updateMember);
  }
}
