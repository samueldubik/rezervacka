import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActivityIndicator = () => {
  return (
    <FontAwesomeIcon
      className="mx-auto mt-5 flex h-[50%] w-[50%] flex-col justify-between"
      icon={faSpinner}
      spin
    />
  );
};

export default ActivityIndicator;
