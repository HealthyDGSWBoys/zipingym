import './ScoreElement.style.scss';

export default class ScoreElement extends HTMLElement {
  private root: DocumentFragment;
  public isRendered: boolean;
  public static readonly scoreAttribute: string = 'score';
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <div class=${'score-root'}>
          <div class=${'score-core'}>
            <h3>000000</h3>
          </div>
        </div>
    `;
    this.root = template.content;
    this.isRendered = false;
  }
  connectedCallback() {
    if (!this.isRendered) {
    }
    this.isRendered = true;
    this.appendChild(this.root);
    this.root = this;
  }
  disconnectedCallback() {}
  static get observedAttributes() {
    return [this.scoreAttribute];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === ScoreElement.scoreAttribute) {
      this.getElementsByTagName('h3')[0].innerText = newValue.padStart(6, '0');
    }
  }
  adoptedCallback() {}
  getElementById() {
    return null;
  }
}

customElements.define('custom-score-element', ScoreElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-score-element': ScoreElement;
  }
}
