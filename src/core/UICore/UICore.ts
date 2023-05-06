import { NormalizedLandmarkList } from '@mediapipe/pose';
import PoseElement from './PoseElement';
import './PoseElement';
import TimeElement from './TimeElement';
import './TimeElement';

export default class UICore {
  private timeElement: TimeElement;
  private poseElement: PoseElement;
  constructor(private rootElement: HTMLElement) {
    this.timeElement = document.createElement('custom-time-element');
    this.rootElement.appendChild(this.timeElement);

    this.poseElement = document.createElement('custom-pose-element');
    this.rootElement.appendChild(this.poseElement);
  }

  public drawTime(time: number) {
    this.timeElement.setAttribute(TimeElement.timeAttribute, String(time));
  }

  public drawSkeleton(
    landmarks: NormalizedLandmarkList,
    info: { name: string; color: string }
  ) {
    this.poseElement.draw(landmarks, info);
  }
}
