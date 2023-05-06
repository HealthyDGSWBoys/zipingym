import { NormalizedLandmarkList } from '@mediapipe/pose';
import PoseElement from './PoseElement/PoseElement';
import './PoseElement/PoseElement'
import TimeElement from './TimeElement/TimeElement';
/** @todo 왜 이럼? */
import "./TimeElement/TimeElement"
import { itemListValue } from '$/data/WorldData/WorldData';
import ItemElement from './ItemElement/ItemElement';
import "./ItemElement/ItemElement"

export default class UICore {
  private timeElement: TimeElement;
  private poseElement: PoseElement;
  private itemElement: ItemElement;
  constructor(private rootElement: HTMLElement) {

    this.timeElement = document.createElement('custom-time-element');
    this.rootElement.appendChild(this.timeElement);

    this.poseElement = document.createElement('custom-pose-element');
    this.rootElement.appendChild(this.poseElement);

    this.itemElement = document.createElement('custom-item-element');
    this.rootElement.appendChild(this.itemElement)
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

  public recordItem(item:string){
    this.poseElement.setAttribute(ItemElement.currentItem, item);
  }
}
