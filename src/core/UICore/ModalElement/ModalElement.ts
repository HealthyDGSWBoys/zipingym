import { Customelement } from "$/interface/CustomElements";


export default class ModalElement extends Customelement{
    public static readonly isOpen:string = "0"
    public static readonly element:string
    public static readonly outsideClickEffect:string

    connectedCallback(){}
    static get observedAttributes(){
        return [this.isOpen,this.element,this.outsideClickEffect]
    }
    attributeChangeCallback(name:string, oldValue:string, newValue:string){
        console.log("name",name)
        console.log("oldValue",oldValue)
        console.log("newValue",newValue)
    }
}

customElements.define('custom-modal-element',ModalElement);

declare global {
    interface HTMLElementTagNameMap{
        'custom-modal-element':ModalElement
    }
}