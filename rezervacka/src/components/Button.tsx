import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type Props = {
    label: string,
    icon: IconDefinition,
    action: () => void,
    black?: boolean
}

const Button = ({label, icon, action, black = false} : Props) => {
    return (
        <div 
        onClick={action}
        className= {!black ? " mt-5 h-[7vh] mx-5 flex flex-row justify-start items-center cursor-pointer shadow-lg border-8 border-stone-200" :
                            " mt-5 h-[7vh] mx-5 flex flex-row justify-start items-center cursor-pointer shadow-lg border-8 border-stone-800"
                    }
        >
            <FontAwesomeIcon icon={icon} className={black ? " h-4/5 w-[20%] text-stone-800" :" h-4/5 w-[20%] text-stone-200"} />
            <h2 className={black ? " w-[60%] text-center text-stone-800 font-fira-sans font-extrabold text-xl" : " w-[60%] text-center text-stone-200 font-fira-sans font-extrabold text-xl"}>{label}</h2>
        </div>
    )
}

export default Button