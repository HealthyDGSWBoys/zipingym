
type PositionType = "before" | "after" | undefined
type ClickEffectsType = {selector:string | null; FN:EventListenerOrEventListenerObject}[]


export abstract class Customelement extends HTMLElement{

    addInnerHtmlToThis(html:string, querySelectValue?:string, position:PositionType="before") {
    
        function exec(target:Element,html:string,position:PositionType){
          const temp = position === "after" ? `
            ${html}
            ${target.innerHTML}
          ` : `
            ${target.innerHTML}
            ${html}
          `
          target.innerHTML = temp
        }
    
        if (querySelectValue) {
          let targetDom = this.querySelector(querySelectValue);
          if (targetDom instanceof Element){
              exec(targetDom,html,position)
          } else {
              console.error("addInnerHtmlToThis에 들어온 쿼리로 요소를 찾을 수 없습니다")
          }
        } else {
          exec(this,html,position)
        }
      }

      clearDom(querySelectValue?:string){
        if (querySelectValue){
          const dom = this.querySelector(querySelectValue)
          console.log("query 함",dom)
          if (dom instanceof HTMLElement){
              dom.innerHTML = ""
          }
        } else {
          this.innerHTML = ""
        }
      }
    
}

export abstract class ClickAbleCustomElement extends Customelement{
  addEventToDOM({ eventKind, selector, FN }:{eventKind:string; selector:string; FN:EventListenerOrEventListenerObject}) {
    console.log("이벤트 추가함",eventKind,selector,FN)
    let dom = this
    if (selector){
      dom = this.querySelector(selector) ?? this;
    }

    if (dom instanceof HTMLElement){
      dom.addEventListener(eventKind, FN);
    }

  }

  useClickEffects(clickEffects:ClickEffectsType){
    clickEffects.forEach((clickEffect) => {
      this.addEventToDOM({
        eventKind:'click',
        selector:clickEffect.selector ?? "",
        FN:clickEffect.FN
      });
    });
  }
}