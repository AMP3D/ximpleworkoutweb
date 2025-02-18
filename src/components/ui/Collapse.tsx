import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useId } from "react";

export type CollapseProps = {
  classNames?: string;
  children: React.ReactNode;
  contentClassNames?: string;
  headerButtonsRow?: React.ReactNode;
  headerClassNames?: string;
  primaryHeaderText: React.ReactNode;
  secondaryHeaderText?: string;
};

const Collapse: FC<CollapseProps> = (props) => {
  const {
    classNames,
    children,
    contentClassNames,
    headerButtonsRow,
    headerClassNames,
    primaryHeaderText,
    secondaryHeaderText,
  } = props;

  const id = useId();

  return (
    <div className={"collapse mb-2 collapse-plus group " + classNames}>
      <input type="checkbox" id={id} className="peer" />

      <div className={"collapse-title text-l font-medium " + headerClassNames}>
        <span>{primaryHeaderText}&nbsp;</span>
        {secondaryHeaderText && (
          <span className="text-accent">{secondaryHeaderText}</span>
        )}
        <div>{headerButtonsRow}</div>
      </div>

      <div className={"collapse-content " + contentClassNames}>
        {children}
        <label
          htmlFor={id}
          className="group-[.collapse-open]:visible flex justify-end mt-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faMinus} className="w-4 h-4" size="2xs" />
        </label>
      </div>
    </div>
  );
};

export default Collapse;
