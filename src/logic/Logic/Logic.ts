import Data from '$/data/Data';
import DeltaClock from '$/util/DeltaClock';

export default class DefaultLogic {
  private performance: DeltaClock = new DeltaClock();
  constructor(private data: Data) {
    this.performance.play();
    this.data.scene.registerBeforeRender(() => {
      this.data.uiData.addTime(this.performance.getDeltaTime());
    });
  }
}
