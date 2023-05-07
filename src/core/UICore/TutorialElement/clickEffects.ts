import ModalElement from "../ModalElement/ModalElement"
import TutorialElement from "./TutorialElement"

function clickEffects(modal:ModalElement){ 
    return [
        {
        selector:null,
        FN:() => {
            modal.changeModalAttribute({
                isOpen:true,
            })
            console.log("실행")
        }
    },
    ]
}

export default clickEffects