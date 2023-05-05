import './TimeElement';

export default class UICore {
  constructor(private rootElement: HTMLElement) {
    const timeElement = document.createElement('custom-time-element');
    this.rootElement.appendChild(timeElement);
  }
}
