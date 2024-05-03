import { FC } from "react";

export type DrawerProps = {
  children: React.ReactNode;
  id: string;
  openButtonText: React.ReactNode;
};

const Drawer: FC<DrawerProps> = (props: DrawerProps) => {
  const { children, id, openButtonText } = props;

  return (
    <div className="drawer">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor={id} className="btn btn-accent btn-sm drawer-button">
          Menu {openButtonText}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={id}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 min-w-80 min-h-full bg-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
