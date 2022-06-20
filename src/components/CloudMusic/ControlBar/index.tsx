import { ReactNode } from "react";
import classes from "./index.module.scss";

const ControlBar = ({
  className,
  actions,
}: {
  className?: string;
  actions: {
    icon?: ReactNode;
    name: string | number;
    onClick: () => void;
  }[];
}) => {
  return (
    <div className={`${classes.controlBar} ${className}`}>
      {actions.map((action) => (
        <div
          key={action.name}
          className={classes.action}
          onClick={action.onClick}
        >
          {action.icon && <span className={classes.icon}>{action.icon}</span>}
          <span className={classes.name}>{action.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ControlBar;
