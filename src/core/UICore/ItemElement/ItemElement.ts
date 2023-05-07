
import { itemList } from "$/data/WorldData/WorldData";
import { Customelement } from "$/interface/CustomElements";
import "./ItemElement.style.scss"

import ui from "./ui";

export type ItemListOrNull = itemList | "null";

export default class ItemElement extends Customelement{

    public static readonly currentItem:ItemListOrNull = "null";

    connectedCallback() {
        this.addInnerHtmlToThis(ui.addWrapper("null"))
    }

    static get observedAttributes(){
        return [this.currentItem];
    }
    attributeChangedCallback(name:string,oldValue:string,newValue:string){
        console.log(name)
        if (name === ItemElement.currentItem){
            console.log(newValue)
            this.clearDom() 
            this.addInnerHtmlToThis(ui.addWrapper(newValue))
        }
    }

}

customElements.define('custom-item-element',ItemElement)

declare global{
    interface HTMLElementTagNameMap{
        'custom-item-element' : ItemElement
    }
}