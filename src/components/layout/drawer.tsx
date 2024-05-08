import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

interface IDrawerProps {
  children: ReactNode;
  actionBlock: ReactNode;
}
const Drawer: FC<IDrawerProps> = ({
  children,
  actionBlock,
}: IDrawerProps): React.JSX.Element => {
  return (
    <div className="drawer drawer-end relative z-[999999]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="btn-primary">
          {actionBlock}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
