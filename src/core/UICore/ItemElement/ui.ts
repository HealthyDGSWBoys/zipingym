import { itemListValue } from "$/data/WorldData/WorldData"
import { Image } from "@babylonjs/gui/2D/controls/image"
import banana from "static/imgs/itemBar/banana.png"
import coke from "static/imgs/itemBar/coke.png"


export default {
    addWrapper:(item:string) => {
        const {img, text} = itemsMapper[item] ?? {}

        return `
            <div class="wrapper">
            ${
                (img && text) && `
                    <img src=${img} />
                    <p>${text}</p>
                ` || ""
            }
            </div>
        `
    }
}

const itemsMapper:{[key:string]:{img:string,text:string}} = {
    banana:{
        img:banana,
        text:"banana"
    },
    cola:{
        img:coke,
        text:"cola"
    },
}