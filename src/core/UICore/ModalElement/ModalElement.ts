import { Customelement } from "$/interface/CustomElements";


export default class ModalElement extends Customelement{
    constructor(private element:HTMLElement){
        super()
    }
    
}

customElements.define('custom-modal-element',ModalElement);

declare global {
    interface HTMLElementTagNameMap{
        'custom-modal-element':ModalElement
    }
}