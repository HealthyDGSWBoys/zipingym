import { ClickAbleCustomElement } from "$/interface/CustomElements";
import "./TutorialElement.style.scss"
import clickEffects from "./clickEffects";
import ui from "./ui";

export default class TutorialElement extends ClickAbleCustomElement{
    connectedCallback(arg:string){
        this.addInnerHtmlToThis(ui.addWrapper())
        this.useClickEffects(clickEffects)
    }
}

customElements.define('custom-tutorial-element', TutorialElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-tutorial-element': TutorialElement;
  }
}
