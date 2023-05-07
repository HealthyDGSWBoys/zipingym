import { ClickAbleCustomElement } from "$/interface/CustomElements";
import "./ModalElement.style.scss"

/** @todo 싱글톤으로 하고싶었는데 일단 못 함 */
export default class ModalElement extends ClickAbleCustomElement{

    private serializer = new XMLSerializer();

    connectedCallback(){
        this.changeModalAttribute({
            isOpen:false,
            element:new HTMLElement(),
            outsideClickEffect:() => {},
            isDark:true
        })
    }


    changeModalAttribute({isOpen,element,outsideClickEffect,isDark}:{isOpen:boolean,element:HTMLElement,outsideClickEffect?:EventListenerOrEventListenerObject, isDark?:boolean}){
        if (isOpen){this.style.zIndex = "1"}
        else {this.style.zIndex = "0"}

        if (element){
            this.clearDom()
            console.log(this.serializer.serializeToString(element))
            this.addInnerHtmlToThis(this.serializer.serializeToString(element))
        } else {
            this.clearDom()
        }

        if(outsideClickEffect){
            this.useClickEffects([{
               selector:null,
               FN:outsideClickEffect 
            }])
        }

        if (isDark){this.style.backgroundColor="rgba($color: #000000, $alpha: 0.7)"}
        else {this.style.backgroundColor=""}

    }

}

customElements.define('custom-modal-element',ModalElement);

declare global {
    interface HTMLElementTagNameMap{
        'custom-modal-element':ModalElement
    }
}