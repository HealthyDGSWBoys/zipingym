import { itemListValue } from "$/data/WorldData/WorldData";
import { Customelement } from "$/interface/CustomElements";
import "./ItemElement.style.scss"

import ui from "./ui";


export default class ItemElement extends Customelement{

    public static readonly currentItem:string = "null";

    connectedCallback() {
        console.log("connnected")
        this.addInnerHtmlToThis(ui.addWrapper("null"))
    }

    static get observedAttributes(){
        return [this.currentItem];
    }
    attributeChangedCallback(name:string){
        if (name === ItemElement.currentItem){
            this.clearDom('.wrapper')
            this.addInnerHtmlToThis(ui.addWrapper(name))
        }
    }

}

customElements.define('custom-item-element',ItemElement)

declare global{
    interface HTMLElementTagNameMap{
        'custom-item-element' : ItemElement
    }
}