import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BUTTONBORDER, BUTTONTYPE } from "../../Const"


type Props = {
    label: string,
    icon: IconDefinition,
    action: () => void,
    type?: BUTTONTYPE,
    border: BUTTONBORDER
}

const Button = ({label, icon, action, border, type=BUTTONTYPE.DEFAULT} : Props) => {

    const textColorsBlack = ['text-stone-800', 'text-[#edc949]', 'text-[#80ff4a]', 'text-[#e13941]']
    const textColorsWhite = ['text-stone-200', 'text-[#edc949]', 'text-[#80ff4a]', 'text-[#e13941]']

    const borderColor = ['border-stone-800', 'border-stone-200', 'border-red-600']

    return (
        <div 
        onClick={action}
        className= {` mt-5 h-[7vh] mx-5 flex flex-row justify-start items-center cursor-pointer shadow-lg border-8 ${borderColor[border]} hover:brightness-150`}
        >
            <FontAwesomeIcon icon={icon} className={!border ? ` h-4/5 w-[20%] ${textColorsBlack[type]}` :` h-4/5 w-[20%] ${textColorsWhite[type]}`} />
            <h2 className={!border ? ` w-[60%] text-center ${textColorsBlack[type]} font-fira-sans font-extrabold text-xl` : ` w-[60%] text-center ${textColorsWhite[type]} font-fira-sans font-extrabold text-xl`}>{label}</h2>
        </div>
    )
}

export default Button