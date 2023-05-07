import { ClickAbleCustomElement } from "$/interface/CustomElements";
import ModalElement from "../ModalElement/ModalElement";
import "./TutorialElement.style.scss"
import clickEffects from "./clickEffects";
import ui from "./ui";

export default class TutorialElement extends ClickAbleCustomElement {
  step: number = 0;
  private clearClickEffect = () => {}

  public tutorials =[
    () => {
      /**@todo 그냥 element 에는 style이 없는데 어떡할까 */
      const timer = document.querySelector("custom-time-element") as HTMLElement
      timer!.style.zIndex = "2"

      this.clearClickEffect = () => {
        timer!.style.zIndex = "0"
      }
    },
    () => {
      this.clearClickEffect()

      const camera = document.querySelector("custom-pose-element") as HTMLElement
      camera!.style.zIndex = "2"

      this.clearClickEffect = () => {
        camera!.style.zIndex = "0"
      }
    },
    () => {
      this.clearClickEffect()

      const item = document.querySelector("custom-item-element") as HTMLElement
      item!.style.zIndex = "2"

      this.clearClickEffect = () => {
        item!.style.zIndex = "0"
      }
    },
    () => {
      
    }
  ]

  constructor(public modal: ModalElement) {
    super()
  }
  connectedCallback() {
    this.addInnerHtmlToThis(ui.addWrapper())
    this.useClickEffects(clickEffects(this))
  }

  nextTutorial(tutorials:Function[]){
    this.step+=1
    // 만약 tutorial 보다 길어지면 끝내기
    console.log(tutorials)
    if (this.step > tutorials.length){
      this.step = 0
      this.clearClickEffect()
      this.modal.changeModalAttribute({isOpen:false})
    } else {
      this.tutorials[this.step - 1]()
    }
  }

  
}

customElements.define('custom-tutorial-element', TutorialElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-tutorial-element': TutorialElement;
  }
}
