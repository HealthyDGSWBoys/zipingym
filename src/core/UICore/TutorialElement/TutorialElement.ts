import { ClickAbleCustomElement } from "$/interface/CustomElements";
import ModalElement from "../ModalElement/ModalElement";
import "./TutorialElement.style.scss"
import clickEffects from "./clickEffects";
import ui from "./ui";

export default class TutorialElement extends ClickAbleCustomElement {
  step: number = 0;
  private prevEffect = () => {}

  public tutorials =[
    () => {
      /**@todo 그냥 element 에는 style이 없는데 어떡할까 */
      const timer = document.querySelector(".time-root") as HTMLElement
      // timer!.style.boxShadow = "rgba(0,0,0,0.5) 0px 0px 0px 9999px;"
      timer!.style.backgroundColor = "black";
      timer!.style.zIndex = "3"
      console.log(timer.style)
    },
    () => {
      this.clearClickEffect()
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
      this.modal.changeModalAttribute({isOpen:false})
    } else {
      this.tutorials[this.step - 1]()
    }
  }

  clearClickEffect(){
    console.log("clear")
  }
  
}

customElements.define('custom-tutorial-element', TutorialElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-tutorial-element': TutorialElement;
  }
}
