import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export type AlertProps = {
  children: React.ReactNode;
  title: string;
};

const Alert: FC<AlertProps> = (props) => {
  return (
    <div role="alert" className="alert alert-error justify-items-start">
      <h3 className="font-bold">{props.title}</h3>
      <div className="grid grid-cols-2">
        <div className="pr-1">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Alert;
