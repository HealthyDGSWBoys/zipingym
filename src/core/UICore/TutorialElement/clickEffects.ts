import ModalElement from "../ModalElement/ModalElement"
import TutorialElement from "./TutorialElement"

function clickEffects(tutorial:TutorialElement){ 
    return [
        {
        selector:null,
        FN:() => {
            tutorial.nextTutorial(tutorial.tutorials)
            tutorial.modal.changeModalAttribute({
                isOpen:true,
                isDark:true,
                outsideClickEffect:() => tutorial.nextTutorial(tutorial.tutorials)
            })
        }
    },
    ]
}

export default clickEffects