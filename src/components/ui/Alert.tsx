import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export type AlertProps = {
  alertType?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  showDismiss?: boolean;
  title?: string;
};

const Alert: FC<AlertProps> = (props) => {
  const {
    alertType = "error",
    children,
    onDismiss,
    showDismiss = false,
    title,
  } = props;
  const alertColor = useMemo(() => {
    switch (alertType) {
      case "info":
        return "bg-info";
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      default:
        return "bg-error";
    }
  }, [alertType]);

  return (
    <div
      role="alert"
      className={`p-2 rounded-xl alert-${alertType} ${alertColor}`}
    >
      <div className={(showDismiss && "grid grid-cols-2") || ""}>
        <div>
          <h3 className="font-bold text-white">
            <span className="pr-2">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
            {title}
          </h3>
        </div>

        {showDismiss && (
          <div className="text-end">
            <button
              className="btn btn-sm bg-error text-white border-white"
              onClick={onDismiss}
            >
              <FontAwesomeIcon icon={faClose} />
              Dismiss
            </button>
          </div>
        )}
      </div>

      {children && <div className="text-start">{children}</div>}
    </div>
  );
};

export default Alert;
