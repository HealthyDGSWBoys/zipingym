import ModalElement from "../ModalElement/ModalElement"
import TutorialElement from "./TutorialElement"

function clickEffects(tutorial:TutorialElement){ 
    return [
        {
        selector:null,
        FN:() => {
            tutorial.nextTutorial(tutorial.tutorials)
        }
    },
    ]
}

export default clickEffects