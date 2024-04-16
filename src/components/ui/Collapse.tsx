import { FC } from "react";

export type CollapseProps = {
  classNames?: string;
  children: React.ReactNode;
  contentClassNames?: string;
  headerClassNames?: string;
  primaryHeaderText: string;
  secondaryHeaderText?: string;
};

const Collapse: FC<CollapseProps> = (props) => {
  return (
    <div className={"collapse mb-2 collapse-plus " + props.classNames}>
      <input type="checkbox" />

      <div
        className={
          "collapse-title text-xl font-medium " + props.headerClassNames
        }
      >
        <span>{props.primaryHeaderText}&nbsp;</span>
        {props.secondaryHeaderText && (
          <span className="text-accent">{props.secondaryHeaderText}</span>
        )}
      </div>

      <div className={"collapse-content " + props.contentClassNames}>
        {props.children}
      </div>
    </div>
  );
};

export default Collapse;
