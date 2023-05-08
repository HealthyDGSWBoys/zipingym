import { NormalizedLandmarkList } from '@mediapipe/pose';
import PoseElement from './PoseElement/PoseElement';
import './PoseElement/PoseElement';
import TimeElement from './TimeElement/TimeElement';
import './TimeElement/TimeElement';
import { itemList, itemListValue } from '$/data/WorldData/WorldData';
import ItemElement from './ItemElement/ItemElement';
import './ItemElement/ItemElement';
import TutorialElement from './TutorialElement/TutorialElement';
import './TutorialElement/TutorialElement';
import ModalElement from './ModalElement/ModalElement';
import './ModalElement/ModalElement';
import ScoreElement from './ScoreElement/ScoreElement';
import './ScoreElement/ScoreElement';

export default class UICore {
  private timeElement: TimeElement;
  private scoreELement: ScoreElement;
  private poseElement: PoseElement;
  private itemElement: ItemElement;
  private tutorialElement: TutorialElement;
  private modalElement: ModalElement;
  constructor(private rootElement: HTMLElement) {
    this.modalElement = document.createElement('custom-modal-element');
    this.rootElement.appendChild(this.modalElement);

    this.timeElement = document.createElement('custom-time-element');
    this.rootElement.appendChild(this.timeElement);

    this.scoreELement = document.createElement('custom-score-element');
    this.rootElement.appendChild(this.scoreELement);

    this.poseElement = document.createElement('custom-pose-element');
    this.rootElement.appendChild(this.poseElement);

    this.itemElement = document.createElement('custom-item-element');
    this.rootElement.appendChild(this.itemElement);

    // this.tutorialElement = document.createElement('custom-tutorial-element');
    this.tutorialElement = new TutorialElement(this.modalElement);
    this.rootElement.appendChild(this.tutorialElement);
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

  public recordItem(item: itemList) {
    console.log(item);
    this.itemElement.setAttribute(ItemElement.currentItem, item);
  }
}
