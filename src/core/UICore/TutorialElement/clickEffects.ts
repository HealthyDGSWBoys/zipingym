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
                element:"<div >운동량 / 칼로리 / 시간등을 확인할 수 있다</div>",
                outsideClickEffect:() => tutorial.nextTutorial(tutorial.tutorials)
            })
        }
    },
    ]
}

export default clickEffects