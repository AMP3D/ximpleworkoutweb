import { FC } from "react";

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

  return (
    <div className={"collapse mb-2 collapse-plus " + classNames}>
      <input type="checkbox" />

      <div className={"collapse-title text-l font-medium " + headerClassNames}>
        <span>{primaryHeaderText}&nbsp;</span>
        {secondaryHeaderText && (
          <span className="text-accent">{secondaryHeaderText}</span>
        )}
        <div>{headerButtonsRow}</div>
      </div>

      <div className={"collapse-content " + contentClassNames}>{children}</div>
    </div>
  );
};

export default Collapse;
