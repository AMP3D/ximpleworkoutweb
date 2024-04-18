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
      <h3 className="font-bold">
        <span className="pr-1">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
        {props.title}
      </h3>
      <div className="text-start">{props.children}</div>
    </div>
  );
};

export default Alert;
