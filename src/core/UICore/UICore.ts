import './TimeElement';
import TimeElement from './TimeElement';

export default class UICore {
  private timeElement: TimeElement;
  constructor(private rootElement: HTMLElement) {
    this.timeElement = document.createElement('custom-time-element');
    this.rootElement.appendChild(this.timeElement);
  }

  public drawTime(time: number) {
    this.timeElement.setAttribute(TimeElement.timeAttribute, String(time));
  }
}
