import { NormalizedLandmarkList } from '@mediapipe/pose';
import PoseElement from './PoseElement/PoseElement';
import './PoseElement/PoseElement'
import TimeElement from './TimeElement/TimeElement';

export default class UICore {
  private timeElement: TimeElement;
  private poseElement: PoseElement;
  constructor(private rootElement: HTMLElement) {
    console.log(TimeElement)

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
