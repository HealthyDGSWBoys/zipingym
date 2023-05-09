import { itemListValue } from "$/data/WorldData/WorldData"
import { Image } from "@babylonjs/gui/2D/controls/image"
import banana from "static/imgs/itemBar/banana.png"
import coke from "static/imgs/itemBar/coke.png"
import proteinBar from "static/imgs/itemBar/proteinBar.png"
import proteinContainer from "static/imgs/itemBar/proteinContainer.png"
import soju from "static/imgs/itemBar/soju.png"
import steroid from "static/imgs/itemBar/steroid.png"


export default {
    addWrapper:(item:string) => {
        console.log(item)
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
    NRGbar:{
        img:proteinBar,
        text:"energy Bar"
    },
    proteinPowder:{
        img:proteinContainer,
        text:"protein"
    },
    soju:{
        img:soju,
        text:"alcohol"
    },
    injector:{
        img:steroid,
        text:"steroid"
    }

}