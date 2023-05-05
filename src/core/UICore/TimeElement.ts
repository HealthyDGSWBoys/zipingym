import './TimeElement.style.scss';

export default class TimeElement extends HTMLElement {
  private root: DocumentFragment;
  public isRendered: boolean;
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <div class=${'time-root'}>
          <div class=${'time-core'}>
            <h3>1000</h3>
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
    return [];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}
  adoptedCallback() {}
  getElementById() {
    return null;
  }
}

customElements.define('custom-time-element', TimeElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-time-element': TimeElement;
  }
}
