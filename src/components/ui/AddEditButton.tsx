import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

export type AddEditButtonProps = {
  onAddEditClick: () => void;
  backgroundClassName?: string;
  buttonText: string;
  isEdit: boolean;
};

const AddEditButton: FC<AddEditButtonProps> = (props) => {
  const { backgroundClassName, buttonText, isEdit } = props;
  const backgroundClass = backgroundClassName
    ? backgroundClassName
    : "bg-primary";
  const defaultButtonText = isEdit ? "Edit" : "Add";

  return (
    <div className="my-5 align-center text-center">
      <button
        className={`btn btn-wide btn-md text-white ${backgroundClass}`}
        onClick={props.onAddEditClick}
      >
        <FontAwesomeIcon icon={isEdit ? faPenToSquare : faAdd} />
        {buttonText ? buttonText : defaultButtonText}
      </button>
    </div>
  );
};

export default AddEditButton;
