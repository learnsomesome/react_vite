import { Left } from "@/assets/svg";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

const AppBar = ({
  title,
  actions,
  className,
}: {
  title: ReactNode;
  actions?: ReactNode[];
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <header className={`${classes.appBar} ${className}`}>
      <div className={classes.back} onClick={() => navigate(-1)}>
        <Left width={36} height={36} />
      </div>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.actions}>
        {actions?.map((action) => (
          <span>{action}</span>
        ))}
      </div>
    </header>
  );
};

export default AppBar;
