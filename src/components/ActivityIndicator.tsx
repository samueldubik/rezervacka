import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ActivityIndicator = () => {
    return(
        <FontAwesomeIcon className=" w-[50%] h-[50%] mt-5 mx-auto flex flex-col justify-between" icon={faSpinner} spin/>
    )
}

export default ActivityIndicator