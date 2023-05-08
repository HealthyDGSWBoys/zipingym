import { ClickAbleCustomElement } from "$/interface/CustomElements";
import "./ModalElement.style.scss"

/** @todo 싱글톤으로 하고싶었는데 일단 못 함 */
export default class ModalElement extends ClickAbleCustomElement{

    private serializer = new XMLSerializer();

    connectedCallback(){
        this.changeModalAttribute({
            isOpen:false,
            outsideClickEffect:() => {},
            isDark:false
        })
    }


    public changeModalAttribute({isOpen,element,outsideClickEffect,isDark,keepPrevAttr=false}:{isOpen:boolean,element?:HTMLElement | string,outsideClickEffect?:EventListenerOrEventListenerObject, isDark?:boolean, keepPrevAttr?:boolean}){
        console.log(element)

        if (isOpen){this.style.zIndex = "1"}
        else if(!keepPrevAttr) {this.style.zIndex = "0"}

        if (element instanceof HTMLElement){
            this.clearDom()
            this.addInnerHtmlToThis(this.serializer.serializeToString(element))
        } else if(typeof element === "string"){
            this.clearDom()
            this.addInnerHtmlToThis(element)
        } else if(!keepPrevAttr) {
            this.clearDom()
        }

        if(outsideClickEffect){
            this.useClickEffects([{
               selector:null,
               FN:outsideClickEffect 
            }])
        } else if (!keepPrevAttr){
            this.useClickEffects([{
                selector:null,
                FN:() => {}
            }])
        }

        if (isDark){this.style.backgroundColor="rgba(0,0,0,0.7)"}
        else if(!keepPrevAttr) {this.style.backgroundColor="rgba(0,0,0,0)"}

    }

}

customElements.define('custom-modal-element',ModalElement);

declare global {
    interface HTMLElementTagNameMap{
        'custom-modal-element':ModalElement
    }
}