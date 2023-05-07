import { ClickAbleCustomElement } from "$/interface/CustomElements";
import ModalElement from "../ModalElement/ModalElement";
import "./TutorialElement.style.scss"
import clickEffects from "./clickEffects";
import ui from "./ui";

export default class TutorialElement extends ClickAbleCustomElement {
  private step: number = 0;

  constructor(protected modal: ModalElement) {
    super()
  }
  connectedCallback() {
    this.addInnerHtmlToThis(ui.addWrapper())
    this.useClickEffects(clickEffects(this.modal))
    // this.modal.changeModalAttribute()
  }
}

customElements.define('custom-tutorial-element', TutorialElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-tutorial-element': TutorialElement;
  }
}
