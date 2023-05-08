import UICore from '$/core/UICore/UICore';
import { NormalizedLandmarkList } from '@mediapipe/pose';
import { itemList } from '../WorldData/WorldData';

export default class UIData {
  constructor(private core: UICore) {}

  private time: number = 0;
  private score: number = 0;
  public get getTime() {
    return this.time;
  }
  public addTime(time: number) {
    this.time += time;
    this.core.drawTime(this.getTime);
  }
  public addScore(score: number) {
    this.score += score;
    if (this.score < 0) this.score = 0;
    this.core.drawScore(this.score);
  }
  public setLandmarks(
    landmarks: NormalizedLandmarkList,
    info: { name: string; color: string }
  ) {
    this.core.drawSkeleton(landmarks, info);
  }
  public recordItem(item: itemList) {
    this.core.recordItem(item);
  }
}
