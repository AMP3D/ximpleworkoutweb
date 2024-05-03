import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

export type AddButtonProps = {
  onAddClick: () => void;
  backgroundClassName?: string;
  buttonText: string;
};

const AddButton: FC<AddButtonProps> = (props) => {
  const { backgroundClassName, buttonText } = props;
  const backgroundClass = backgroundClassName
    ? backgroundClassName
    : "bg-primary";

  return (
    <div className="my-5 align-center text-center">
      <button
        className={`btn btn-wide btn-md text-white ${backgroundClass}`}
        onClick={props.onAddClick}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
        {buttonText ? buttonText : "Add"}
      </button>
    </div>
  );
};

export default AddButton;
