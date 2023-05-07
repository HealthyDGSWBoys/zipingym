import { ClickAbleCustomElement } from "$/interface/CustomElements";
import "./ModalElement.style.scss"

/** @todo 싱글톤으로 하고싶었는데 일단 못 함 */
export default class ModalElement extends ClickAbleCustomElement{
    private static readonly isOpen:string = "0"
    private static readonly element:string
    private static readonly outsideClickEffect:string
    // public static instance:ModalElement = new ModalElement();
    // private constructor(){super()}
    connectedCallback(){
        

    }

    changeModalAttribute(isOpen:boolean,element:HTMLElement,outsideClickEffect:Function){

    }

}

customElements.define('custom-modal-element',ModalElement);

declare global {
    interface HTMLElementTagNameMap{
        'custom-modal-element':ModalElement
    }
}