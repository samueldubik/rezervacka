import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActivityIndicator = () => {
  return (
    <FontAwesomeIcon
      className="xl:w-[15% mx-auto mt-24 flex h-[50%] w-[50%] flex-col justify-between text-form opacity-60 md:h-[35%] md:w-[35%] lg:h-[25%] lg:w-[25%] xl:h-[15%] xl:w-[15%]"
      icon={faCircleNotch}
      spin
    />
  );
};

export default ActivityIndicator;
