import { ClickAbleCustomElement } from "$/interface/CustomElements";
import ModalElement from "../ModalElement/ModalElement";
import "./TutorialElement.style.scss"
import clickEffects from "./clickEffects";
import ui from "./ui";

import img1 from "$static/imgs/tutorial/img1.png"
import img2 from "$static/imgs/tutorial/img2.png"
import img3 from "$static/imgs/tutorial/img3.png"

export default class TutorialElement extends ClickAbleCustomElement {
  step: number = 0;
  private clearClickEffect = () => {}

  public tutorials =[
    () => {
      /**@todo 그냥 element 에는 style이 없는데 어떡할까 */
      const timer = document.querySelector("custom-time-element") as HTMLElement
      timer!.style.zIndex = "2"

      this.modal.changeModalAttribute({
        isOpen:true,
        isDark:true,
        element:`<div class="tutorial-1-wrapper" >
        <div>
            <div></div>
            <div></div>
        </div>
        <h3>운동량 / 칼로리 / 시간등을 확인할 수 있습니다</h3>
        </div>`,
        outsideClickEffect:() => this.nextTutorial(this.tutorials)
    })

      this.clearClickEffect = () => {
        timer!.style.zIndex = "0"
      }
    },
    () => {
      this.clearClickEffect()

      const camera = document.querySelector("custom-pose-element") as HTMLElement
      camera!.style.zIndex = "2"

      this.modal.changeModalAttribute({
        isOpen:true,
        element:`<div class="tutorial-2-wrapper" >
        <div>
            <div></div>
            <div></div>
        </div>
        <h3>현재 웹캠 및 분석 결과를 확인할 수 있습니다</h3>
        </div>`,
        keepPrevAttr:true
      })

      this.clearClickEffect = () => {
        camera!.style.zIndex = "0"
      }
    },
    () => {
      this.clearClickEffect()

      const item = document.querySelector("custom-item-element") as HTMLElement
      item!.style.zIndex = "2"

      this.modal.changeModalAttribute({
        isOpen:true,
        element:`<div class="tutorial-3-wrapper" >
        <h3>획득한 아이템을 확인할 수 있습니다</h3>
        <div>
            <div></div>
            <div></div>
        </div>
        </div>`,
        keepPrevAttr:true
      })

      this.clearClickEffect = () => {
        item!.style.zIndex = "0"
      }
    },
    () => {
      this.clearClickEffect()

      this.modal.changeModalAttribute({
        isOpen:true,
        element:`
          <div class="tutorial-4-wrapper" >
            <div class="item">
              <img src=${img1} />
              <div class="order" >1</div>
              <div class="explation">이 자세는 stand자세로, 기본자세가 됩니다.</div>
            </div>
            <div class="item">
              <img src=${img2} />
              <div class="order" >2</div>
              <div class="explation">두 팔을 모두 올리면 up 자세로, 앞으로 이동할 수 있습니다</div>
            </div>
            <div class="item">
              <img src=${img3} />
              <div class="order" >3</div>
              <div class="explation">한 쪽 팔만 올리면, 올린쪽으로 돌게됩니다. 길의 끝에서는 팔을 올린쪽으로 길을 선택하게 됩니다</div>
            </div>
          </div>
        `,
        keepPrevAttr:true
      })
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
