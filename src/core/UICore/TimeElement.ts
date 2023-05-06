import './TimeElement.style.scss';

export default class TimeElement extends HTMLElement {
  private root: DocumentFragment;
  public isRendered: boolean;
  public static readonly timeAttribute: string = 'time';
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <div class=${'time-root'}>
          <div class=${'time-core'}>
            <h3>00:00:000</h3>
          </div>
        </div>
    `;
    this.root = template.content;
    this.isRendered = false;
  }
  connectedCallback() {
    if (!this.isRendered) {
      this.isRendered = true;
      this.appendChild(this.root);
      this.root = this;
    }
  }
  disconnectedCallback() {}
  static get observedAttributes() {
    return [this.timeAttribute];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === TimeElement.timeAttribute) {
      this.getElementsByTagName('h3')[0].innerText = this.msToString(
        Number(newValue)
      );
    }
  }
  adoptedCallback() {}
  getElementById() {
    return null;
  }

  private msToString(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const mil = Math.floor(milliseconds % 1000)
      .toString()
      .padStart(3, '0');
    return `${minutes} : ${seconds} : ${mil}`;
  }
}

customElements.define('custom-time-element', TimeElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-time-element': TimeElement;
  }
}
