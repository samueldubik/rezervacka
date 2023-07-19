import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type Props = {
    label: string,
    icon: IconDefinition,
}

const Button = ({label, icon} : Props) => {
    return (
        <div className=" mt-5 h-[7vh] mx-5 flex flex-row justify-start items-center cursor-pointer shadow-lg border-8 border-stone-200">
            <FontAwesomeIcon icon={icon} className=" h-4/5 w-[20%] text-stone-200" />
            <h2 className=" w-[60%] text-center text-stone-200 font-fira-sans font-extrabold text-xl">{label}</h2>
        </div>
    )
}

export default Button